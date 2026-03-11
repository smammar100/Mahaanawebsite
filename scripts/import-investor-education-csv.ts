/**
 * One-off script to import Investor Education data from CSV into Sanity.
 *
 * Prerequisites:
 * - .env.local with NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET,
 *   and SANITY_API_WRITE_TOKEN (or a token with write access from sanity.io/manage).
 *
 * Run from project root:
 *   npx tsx scripts/import-investor-education-csv.ts [path-to-csv]
 *
 * Default CSV path: e:\Downloads\Mahaana - Investor Educations - 6874ba576b8252615dd31fbe.csv
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve } from "path";
import { parse } from "csv-parse/sync";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const CSV_PATH =
  process.argv[2] ??
  "e:\\Downloads\\Mahaana - Investor Educations - 6874ba576b8252615dd31fbe.csv";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token =
  process.env.SANITY_API_WRITE_TOKEN ?? process.env.SANITY_API_READ_TOKEN;

if (!projectId) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local");
  process.exit(1);
}
if (!token) {
  console.error(
    "Missing SANITY_API_WRITE_TOKEN (or SANITY_API_READ_TOKEN with write scope) in .env.local"
  );
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
  Title: string;
  Slug: string;
  "Collection ID": string;
  "Item ID": string;
  Archived: string;
  Draft: string;
  "Created On": string;
  "Updated On": string;
  "Published On": string;
  Priority: string;
  Category: string;
  "Thumbnail Image": string;
  TLDR: string;
  CTA: string;
  Link: string;
  "Blog Body Text": string;
  "Reading Time": string;
  "Author Name": string;
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

function normalizeCategory(
  category: string
): "Video" | "Article" | "News" | "Article" {
  const c = category?.trim();
  if (c === "Video" || c === "Article" || c === "News") return c;
  return "Article";
}

async function main() {
  const resolved = resolve(CSV_PATH);
  console.log("Reading CSV from:", resolved);
  const raw = readFileSync(resolved, "utf-8");

  const rows = parse(raw, {
    columns: true,
    skip_empty_lines: true,
    relax_column_count: true,
    trim: true,
  }) as CsvRow[];

  console.log(`Found ${rows.length} rows. Importing...`);

  let ok = 0;
  let err = 0;

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const itemId = row["Item ID"]?.trim();
    const title = row.Title?.trim();
    const slug = row.Slug?.trim();

    if (!itemId || !title || !slug) {
      console.warn(`Row ${i + 1}: missing _id, title or slug; skipping.`);
      err++;
      continue;
    }

    const priority = parseInt(row.Priority ?? "0", 10) || 0;
    const category = normalizeCategory(row.Category);
    const doc = {
      _id: itemId,
      _type: "investorEducation",
      title,
      slug: { _type: "slug", current: slug },
      priority,
      category,
      thumbnailImageUrl: row["Thumbnail Image"]?.trim() || undefined,
      tldr: row.TLDR?.trim() || "",
      cta: row.CTA?.trim() || "Read more",
      link: row.Link?.trim() || "",
      blogBodyText: htmlToPortableTextBlock(row["Blog Body Text"] ?? ""),
      readingTime: row["Reading Time"]?.trim() || undefined,
      authorName: row["Author Name"]?.trim() || undefined,
    };

    try {
      await client.createOrReplace(doc);
      ok++;
      if ((ok + err) % 10 === 0) console.log(`  ${ok + err}/${rows.length}`);
    } catch (e) {
      console.error(`Row ${i + 1} (_id: ${itemId}):`, e);
      err++;
    }
  }

  console.log(`Done. Created/updated: ${ok}, errors: ${err}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
