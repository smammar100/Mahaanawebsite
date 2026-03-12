/**
 * Import Investor Education from bundle zip by category.
 * Reads CSV (from zip or external path), maps Category to Articles / News / Videos & Podcasts,
 * creates documents in the three new Sanity schemas, and attaches thumbnails from the zip.
 *
 * Prerequisites: .env.local with NEXT_PUBLIC_SANITY_PROJECT_ID,
 * NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN.
 *
 * Run from project root:
 *   npx tsx scripts/import-investor-education-from-bundle-zip.ts "<path-to-bundle.zip>" [path-to.csv]
 *
 * If CSV path is omitted, the script looks for the first .csv file inside the zip.
 */

import { createClient } from "@sanity/client";
import AdmZip from "adm-zip";
import { readFileSync } from "fs";
import { resolve } from "path";
import { parse } from "csv-parse/sync";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN ?? process.env.SANITY_API_READ_TOKEN;

if (!projectId) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local");
  process.exit(1);
}
if (!token) {
  console.error("Missing SANITY_API_WRITE_TOKEN (or SANITY_API_READ_TOKEN with write scope) in .env.local");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: false,
  token,
});

type CsvRow = {
  Title?: string;
  Slug?: string;
  "Item ID"?: string;
  Category?: string;
  TLDR?: string;
  Link?: string;
  "Blog Body Text"?: string;
  "Reading Time"?: string;
  "Author Name"?: string;
  "Published On"?: string;
  [key: string]: string | undefined;
};

type NewType =
  | "investorEducationArticle"
  | "investorEducationNews"
  | "investorEducationVideoPodcast";

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".gif"] as const;
const CONTENT_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function htmlToPortableTextBlock(html: string): unknown[] | undefined {
  const text = stripHtml(html);
  if (!text) return undefined;
  return [
    {
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [{ _type: "span", text }],
    },
  ];
}

/** Map CSV Category to Sanity _type. */
function categoryToType(category: string | null | undefined): NewType {
  const c = category?.trim().toLowerCase() ?? "";
  if (c === "video" || c.includes("videos & podcasts") || c.includes("videos and podcasts")) {
    return "investorEducationVideoPodcast";
  }
  if (c === "news") return "investorEducationNews";
  return "investorEducationArticle";
}

/** Sanity _id must match [a-zA-Z0-9_-]+. */
function sanitizeId(id: string): string {
  return id.replace(/[^a-zA-Z0-9_-]/g, "-").replace(/-+/g, "-").slice(0, 150) || "doc";
}

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
      // skip
    }
  }
  return map;
}

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

/** Parse Published On to ISO string if possible. */
function parsePublishedOn(value: string | undefined): string | undefined {
  const v = value?.trim();
  if (!v) return undefined;
  const d = new Date(v);
  return isNaN(d.getTime()) ? undefined : d.toISOString();
}

async function main() {
  const zipPath = process.argv[2];
  const csvPathArg = process.argv[3];

  if (!zipPath) {
    console.error("Usage: npx tsx scripts/import-investor-education-from-bundle-zip.ts <path-to-bundle.zip> [path-to.csv]");
    process.exit(1);
  }

  const resolvedZip = resolve(zipPath);
  console.log("Zip path:", resolvedZip);

  const zip = new AdmZip(resolvedZip);

  let csvRaw: string;
  if (csvPathArg) {
    console.log("CSV path (external):", resolve(csvPathArg));
    csvRaw = readFileSync(resolve(csvPathArg), "utf-8");
  } else {
    const entries = zip.getEntries();
    const csvEntry = entries.find((e: { isDirectory: boolean; entryName: string }) => !e.isDirectory && e.entryName.toLowerCase().endsWith(".csv"));
    if (!csvEntry) {
      console.error("No .csv file found inside the zip. Provide a CSV path as second argument, or add a CSV to the zip.");
      process.exit(1);
    }
    console.log("CSV from zip:", csvEntry.entryName);
    csvRaw = csvEntry.getData().toString("utf-8");
  }

  const rows = parse(csvRaw, {
    columns: true,
    skip_empty_lines: true,
    relax_column_count: true,
    trim: true,
  }) as CsvRow[];

  console.log("Rows in CSV:", rows.length);
  if (rows.length === 0) {
    console.log("No rows to import.");
    return;
  }

  const thumbnailMap = buildThumbnailMap(zip);
  console.log("Thumbnail files in zip:", thumbnailMap.size);

  const counts: Record<NewType, number> = {
    investorEducationArticle: 0,
    investorEducationNews: 0,
    investorEducationVideoPodcast: 0,
  };
  let errors = 0;
  const created: { _id: string; title: string }[] = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const title = row.Title?.trim();
    const slug = row.Slug?.trim();
    const itemId = row["Item ID"]?.trim();

    if (!title || !slug) {
      console.warn(`Row ${i + 1}: missing title or slug; skipping.`);
      errors++;
      continue;
    }

    const _type = categoryToType(row.Category);
    const _id = itemId ? sanitizeId(itemId) : `ie-${slugify(slug)}`;

    const publishedAt = parsePublishedOn(row["Published On"]);
    const excerpt = row.TLDR?.trim() || undefined;
    const externalLink = row.Link?.trim() || undefined;
    const author = row["Author Name"]?.trim() || undefined;
    const readingTime = row["Reading Time"]?.trim() || undefined;
    const bodyHtml = htmlToPortableTextBlock(row["Blog Body Text"] ?? "");

    const doc: Record<string, unknown> = {
      _id,
      _type,
      title,
      slug: { _type: "slug", current: slug },
      publishedAt,
      excerpt,
      externalLink,
      author,
      readingTime,
      bodyHtml,
    };

    const cleaned: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(doc)) {
      if (v !== undefined && v !== null) cleaned[k] = v;
    }

    try {
      await client.createOrReplace(cleaned as { _id: string; _type: string } & Record<string, unknown>);
      counts[_type]++;
      created.push({ _id, title });
      if ((counts.investorEducationArticle + counts.investorEducationNews + counts.investorEducationVideoPodcast + errors) % 10 === 0) {
        console.log(`  Created ${counts.investorEducationArticle + counts.investorEducationNews + counts.investorEducationVideoPodcast}/${rows.length}`);
      }
    } catch (e) {
      console.error(`Row ${i + 1} (_id: ${_id}, ${title}):`, e);
      errors++;
    }
  }

  console.log("\nDocuments created:");
  console.log("  Articles:", counts.investorEducationArticle);
  console.log("  News:", counts.investorEducationNews);
  console.log("  Videos & Podcasts:", counts.investorEducationVideoPodcast);
  if (errors > 0) console.log("  Errors:", errors);

  // Attach thumbnails from zip
  let thumbnailsAttached = 0;
  let thumbErr = 0;
  for (const { _id, title } of created) {
    const keys = titleCandidateKeys(title);
    let found: ThumbnailEntry | null = null;
    for (const k of keys) {
      const entry = thumbnailMap.get(k);
      if (entry) {
        found = entry;
        break;
      }
    }
    if (!found) continue;
    try {
      const contentType = getContentType(found.entryName);
      const asset = await client.assets.upload("image", found.buffer, {
        filename: found.entryName,
        contentType,
      });
      if (!asset?._id) {
        thumbErr++;
        continue;
      }
      await client
        .patch(_id)
        .set({
          thumbnail: {
            _type: "image",
            asset: { _type: "reference", _ref: asset._id },
          },
        })
        .commit();
      thumbnailsAttached++;
      if (thumbnailsAttached % 5 === 0) console.log("  Thumbnails attached:", thumbnailsAttached);
    } catch (e) {
      console.error("Thumbnail error for", _id, title, ":", e);
      thumbErr++;
    }
  }

  console.log("\nThumbnails attached:", thumbnailsAttached);
  if (thumbErr > 0) console.log("  Thumbnail errors:", thumbErr);
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
