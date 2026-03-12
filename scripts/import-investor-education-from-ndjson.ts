/**
 * Import Investor Education from NDJSON + thumbnails folder.
 * Maps each record's category/subcategory to Articles, News, or Videos & Podcasts,
 * creates documents in the three Sanity schemas, and attaches thumbnails from the folder.
 *
 * Prerequisites: .env.local with NEXT_PUBLIC_SANITY_PROJECT_ID,
 * NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN.
 *
 * Run from project root:
 *   npx tsx scripts/import-investor-education-from-ndjson.ts "<path-to.ndjson>" "<path-to-thumbnails-folder>"
 *
 * Example:
 *   npx tsx scripts/import-investor-education-from-ndjson.ts "c:\Users\AMD\OneDrive\Desktop\Mahaana_Investor_Education_Bundle (2)\investor_education_import.ndjson" "c:\Users\AMD\OneDrive\Desktop\Mahaana_Investor_Education_Bundle (2)\thumbnails"
 */

import { createClient } from "@sanity/client";
import { readFileSync, readdirSync, existsSync } from "fs";
import { resolve, join, basename } from "path";
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
  console.error("Missing SANITY_API_WRITE_TOKEN in .env.local");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: false,
  token,
});

type NewType =
  | "investorEducationArticle"
  | "investorEducationNews"
  | "investorEducationVideoPodcast";

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
const CONTENT_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

function normalizeKey(name: string): string {
  const base = name.replace(/\.[^.]+$/, "").trim();
  return base
    .toLowerCase()
    .replace(/[\s_\-]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 200) || "";
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 200) || "doc";
}

function getContentType(filename: string): string {
  const ext = filename.replace(/^.*\./, ".").toLowerCase();
  return CONTENT_TYPES[ext] ?? "image/jpeg";
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

/** Map category/subcategory string to Sanity _type. */
function categoryToType(category: string | null | undefined): NewType {
  const c = String(category ?? "")
    .trim()
    .toLowerCase();
  if (c === "video" || c === "videos & podcasts" || c === "videos and podcasts" || c === "videos and podcast") {
    return "investorEducationVideoPodcast";
  }
  if (c === "news") return "investorEducationNews";
  if (c === "article" || c === "articles") return "investorEducationArticle";
  return "investorEducationArticle";
}

function sanitizeId(id: string): string {
  const cleaned = id.replace(/[^a-zA-Z0-9_-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "") || "doc";
  return cleaned.slice(0, 128);
}

/** Ensure body is portable text array (block). */
function toBodyHtml(value: unknown): unknown[] | undefined {
  if (value == null) return undefined;
  if (Array.isArray(value)) return value;
  if (typeof value === "string") {
    const text = value.trim();
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
  return undefined;
}

/** Build map: normalized key -> { path, buffer } from a directory. */
function buildThumbnailMapFromFolder(dir: string): Map<string, { path: string; buffer: Buffer; filename: string }> {
  const map = new Map<string, { path: string; buffer: Buffer; filename: string }>();
  if (!existsSync(dir)) return map;
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    if (!ent.isFile()) continue;
    const ext = (ent.name.replace(/^.*\./, ".") || "").toLowerCase();
    if (!IMAGE_EXTENSIONS.includes(ext)) continue;
    const fullPath = join(dir, ent.name);
    try {
      const buffer = readFileSync(fullPath);
      if (buffer.length > 0) {
        const key = normalizeKey(ent.name);
        if (key) map.set(key, { path: fullPath, buffer, filename: ent.name });
      }
    } catch {
      // skip
    }
  }
  return map;
}

async function main() {
  const ndjsonPath = process.argv[2];
  const thumbnailsDir = process.argv[3];

  if (!ndjsonPath) {
    console.error("Usage: npx tsx scripts/import-investor-education-from-ndjson.ts <path-to.ndjson> <path-to-thumbnails-folder>");
    process.exit(1);
  }

  const resolvedNdjson = resolve(ndjsonPath);
  if (!existsSync(resolvedNdjson)) {
    console.error("NDJSON file not found:", resolvedNdjson);
    process.exit(1);
  }

  console.log("NDJSON:", resolvedNdjson);
  console.log("Thumbnails folder:", thumbnailsDir ? resolve(thumbnailsDir) : "(none)");

  const raw = readFileSync(resolvedNdjson, "utf-8");
  const lines = raw.split(/\r?\n/).filter((line) => line.trim());

  const thumbnailMap = thumbnailsDir && existsSync(resolve(thumbnailsDir))
    ? buildThumbnailMapFromFolder(resolve(thumbnailsDir))
    : new Map<string, { path: string; buffer: Buffer; filename: string }>();
  console.log("Thumbnail files found:", thumbnailMap.size);

  const counts: Record<NewType, number> = {
    investorEducationArticle: 0,
    investorEducationNews: 0,
    investorEducationVideoPodcast: 0,
  };
  let errors = 0;
  const created: { _id: string; title: string }[] = [];
  const usedIds = new Set<string>();

  for (let i = 0; i < lines.length; i++) {
    let row: Record<string, unknown>;
    try {
      row = JSON.parse(lines[i]) as Record<string, unknown>;
    } catch {
      console.warn(`Line ${i + 1}: invalid JSON, skipping.`);
      errors++;
      continue;
    }

    const title = (row.title as string)?.trim();
    const slugRaw = row.slug;
    const slug = typeof slugRaw === "string"
      ? slugRaw.trim()
      : (slugRaw && typeof slugRaw === "object" && "current" in slugRaw && typeof (slugRaw as { current?: string }).current === "string")
        ? (slugRaw as { current: string }).current.trim()
        : slugify(title || "");
    const category = (
      row["category"] ?? row["Category"] ??
      row["subCategory"] ?? row["subcategory"] ?? row["Sub Category"] ?? row["sub category"] ??
      row["type"] ?? row["Type"]
    ) as string | undefined;
    const _type = categoryToType(category);

    if (!title) {
      console.warn(`Line ${i + 1}: missing title, skipping.`);
      errors++;
      continue;
    }

    let _id = (row._id as string)?.trim();
    if (!_id || /[^a-zA-Z0-9_-]/.test(_id)) {
      const base = `ie-${slugify(slug)}`;
      _id = sanitizeId(base);
      let n = 0;
      while (usedIds.has(_id)) {
        n++;
        _id = sanitizeId(`ie-${slugify(slug)}-${n}`);
      }
    } else {
      _id = sanitizeId(_id);
      if (usedIds.has(_id)) {
        let n = 0;
        const orig = _id;
        while (usedIds.has(_id)) {
          n++;
          _id = sanitizeId(`${orig}-${n}`);
        }
      }
    }
    usedIds.add(_id);

    const publishedAt = (row.publishedAt ?? row.publishedOn ?? row.publishDate ?? row.date) as string | undefined;
    const excerpt = (row.excerpt ?? row.tldr ?? row.summary) as string | undefined;
    const externalLink = (row.externalLink ?? row.link ?? row.url) as string | undefined;
    const author = (row.author ?? row.authorName) as string | undefined;
    const readingTime = (row.readingTime ?? row.readTime) as string | undefined;
    const bodyHtml = toBodyHtml(row.bodyHtml ?? row.body ?? row.content ?? row.blogBodyText);

    const doc: Record<string, unknown> = {
      _id,
      _type,
      title,
      slug: { _type: "slug", current: slug },
      publishedAt: publishedAt?.trim() || undefined,
      excerpt: excerpt?.trim() || undefined,
      externalLink: externalLink?.trim() || undefined,
      author: author?.trim() || undefined,
      readingTime: readingTime?.trim() || undefined,
      bodyHtml: bodyHtml ?? undefined,
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
        console.log(`  Created ${counts.investorEducationArticle + counts.investorEducationNews + counts.investorEducationVideoPodcast}/${lines.length}`);
      }
    } catch (e) {
      console.error(`Line ${i + 1} (_id: ${_id}):`, e);
      errors++;
    }
  }

  console.log("\nDocuments created:");
  console.log("  Articles:", counts.investorEducationArticle);
  console.log("  News:", counts.investorEducationNews);
  console.log("  Videos & Podcasts:", counts.investorEducationVideoPodcast);
  if (errors > 0) console.log("  Errors:", errors);

  let thumbnailsAttached = 0;
  for (const { _id, title } of created) {
    const keys = titleCandidateKeys(title);
    let found: { path: string; buffer: Buffer; filename: string } | null = null;
    for (const k of keys) {
      const entry = thumbnailMap.get(k);
      if (entry) {
        found = entry;
        break;
      }
    }
    if (!found) continue;
    try {
      const contentType = getContentType(found.filename);
      const asset = await client.assets.upload("image", found.buffer, {
        filename: found.filename,
        contentType,
      });
      if (!asset?._id) continue;
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
      console.error("Thumbnail error for", _id, ":", e);
    }
  }

  console.log("\nThumbnails attached:", thumbnailsAttached);
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
