/**
 * Import Investor Education thumbnails from Mahaana_Investor_Education_Bundle.zip.
 * Reads the Thumbnail folder, matches images to existing investorEducation documents by title,
 * uploads each image to Sanity assets, and patches the document's thumbnail field.
 *
 * Prerequisites: .env.local with NEXT_PUBLIC_SANITY_PROJECT_ID,
 * NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN.
 *
 * Run: npx tsx scripts/import-investor-education-thumbnails-from-zip.ts
 *   or npx tsx scripts/import-investor-education-thumbnails-from-zip.ts "e:\Downloads\Mahaana_Investor_Education_Bundle.zip"
 */

import { createClient } from "@sanity/client";
import AdmZip from "adm-zip";
import dotenv from "dotenv";
import { resolve } from "path";

dotenv.config({ path: ".env.local" });

const DEFAULT_ZIP =
  process.platform === "win32"
    ? "e:\\Downloads\\Mahaana_Investor_Education_Bundle.zip"
    : "e:/Downloads/Mahaana_Investor_Education_Bundle.zip";

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".gif"] as const;

const CONTENT_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

/** Normalize for lookup: lowercase, trim, collapse spaces/dashes/underscores to single dash, no extension. */
function normalizeKey(name: string): string {
  const base = name.replace(/\.[^.]+$/, "").trim();
  return base
    .toLowerCase()
    .replace(/[\s_\-]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 200) || "";
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 200) || "";
}

function getContentType(entryName: string): string {
  const ext = entryName.replace(/^.*\./, ".").toLowerCase();
  return CONTENT_TYPES[ext] ?? "image/jpeg";
}

type ThumbnailEntry = { buffer: Buffer; entryName: string };

/** Build map: normalized key -> ThumbnailEntry from zip entries under Thumbnail/ or Thumbnails/ */
function buildThumbnailMap(zip: InstanceType<typeof AdmZip>): Map<string, ThumbnailEntry> {
  const map = new Map<string, ThumbnailEntry>();
  const entries = zip.getEntries();
  const thumbnailFolderNames = ["thumbnail", "thumbnails"];

  for (const entry of entries) {
    if (entry.isDirectory) continue;
    const raw = entry.entryName.replace(/\\/g, "/");
    const parts = raw.split("/");
    const idx = parts.findIndex((p: string) => thumbnailFolderNames.includes(p.toLowerCase()));
    if (idx === -1) continue;
    const underThumbnail = parts.slice(idx + 1).join("/");
    const name = underThumbnail.replace(/^.*\//, "");
    if (!name) continue;
    const ext = name.replace(/^.*\./, ".").toLowerCase();
    if (!IMAGE_EXTENSIONS.includes(ext as (typeof IMAGE_EXTENSIONS)[number])) continue;

    const key = normalizeKey(name);
    if (!key) continue;
    try {
      const buffer = entry.getData();
      if (buffer && buffer.length > 0) {
        map.set(key, { buffer: Buffer.from(buffer), entryName: name });
      }
    } catch {
      // skip corrupted entry
    }
  }
  return map;
}

/** Log first N zip entry paths (for debugging when no thumbnails found). */
function logZipEntryNames(zip: InstanceType<typeof AdmZip>, limit: number): void {
  const entries = zip.getEntries();
  const names: string[] = [];
  for (let i = 0; i < Math.min(entries.length, limit); i++) {
    names.push(entries[i].entryName);
  }
  console.log("First", limit, "zip entry paths:", names);
  if (entries.length > limit) console.log("... and", entries.length - limit, "more");
}

/** Candidate keys for a document title (order: exact, dashes, underscores, slugified). */
function titleCandidateKeys(title: string): string[] {
  const t = title.trim();
  if (!t) return [];
  const keys: string[] = [];
  const n1 = normalizeKey(t);
  if (n1) keys.push(n1);
  const dashed = t.replace(/\s+/g, "-");
  const n2 = normalizeKey(dashed);
  if (n2 && !keys.includes(n2)) keys.push(n2);
  const underscored = t.replace(/\s+/g, "_");
  const n3 = normalizeKey(underscored);
  if (n3 && !keys.includes(n3)) keys.push(n3);
  const slug = slugify(t);
  if (slug && !keys.includes(slug)) keys.push(slug);
  return keys;
}

async function main() {
  const zipPath = process.argv[2] ? resolve(process.argv[2]) : resolve(DEFAULT_ZIP);
  console.log("Zip path:", zipPath);

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
  const token = process.env.SANITY_API_WRITE_TOKEN;

  if (!projectId) {
    console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local");
    process.exit(1);
  }
  if (!token) {
    console.error("Missing SANITY_API_WRITE_TOKEN in .env.local");
    process.exit(1);
  }

  const zip = new AdmZip(zipPath);
  const thumbnailMap = buildThumbnailMap(zip);
  console.log("Thumbnail files in zip:", thumbnailMap.size);
  if (thumbnailMap.size === 0) {
    logZipEntryNames(zip, 40);
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion: "2024-01-01",
    useCdn: false,
    token,
  });

  const docs = await client.fetch<{ _id: string; title: string | null; slug: string | null }[]>(
    `*[_type == "investorEducation"] { _id, title, "slug": slug.current }`
  );

  if (!Array.isArray(docs) || docs.length === 0) {
    console.log("No investorEducation documents found in the dataset.");
    return;
  }
  console.log("Investor Education documents:", docs.length);

  let patched = 0;
  let uploaded = 0;
  let noMatch = 0;
  let errCount = 0;

  for (const doc of docs) {
    const title = doc.title?.trim();
    if (!title) {
      noMatch++;
      continue;
    }

    const keys = titleCandidateKeys(title);
    let found: ThumbnailEntry | null = null;
    for (const k of keys) {
      const entry = thumbnailMap.get(k);
      if (entry) {
        found = entry;
        break;
      }
    }

    if (!found) {
      noMatch++;
      continue;
    }

    try {
      const contentType = getContentType(found.entryName);
      const asset = await client.assets.upload("image", found.buffer, {
        filename: found.entryName,
        contentType,
      });
      if (!asset?._id) {
        errCount++;
        continue;
      }
      uploaded++;

      await client
        .patch(doc._id)
        .set({
          thumbnail: {
            _type: "image",
            asset: { _type: "reference", _ref: asset._id },
          },
        })
        .commit();
      patched++;
      if (patched % 5 === 0) console.log("  Patched", patched, "/", docs.length);
    } catch (e) {
      console.error("Error for document", doc._id, title, ":", e);
      errCount++;
    }
  }

  console.log("\nDone.");
  console.log("  Documents patched:", patched);
  console.log("  Thumbnails uploaded:", uploaded);
  console.log("  No matching file:", noMatch);
  console.log("  Errors:", errCount);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
