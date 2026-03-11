/**
 * One-off script to import MIIETF Fund Manager Reports from CSV into Sanity.
 *
 * Prerequisites:
 * - .env.local with NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET,
 *   and SANITY_API_WRITE_TOKEN.
 *
 * Run from project root:
 *   npx tsx scripts/import-miietf-fmr-csv.ts [path-to-csv]
 *
 * Default CSV path: e:\Downloads\miietf_fmr_reports_chronological (1).csv
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve } from "path";
import { parse } from "csv-parse/sync";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const CSV_PATH =
  process.argv[2] ??
  "e:\\Downloads\\miietf_fmr_reports_chronological (1).csv";

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

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: false,
  token,
});

type CsvRow = {
  Title: string;
  "Date (YYYY-MM)": string;
  Download_URL: string;
  Local_File_Path: string;
  Status: string;
};

function toPublishDate(yyyyMm: string): string {
  const trimmed = yyyyMm?.trim();
  if (!trimmed || !/^\d{4}-\d{2}$/.test(trimmed)) return "";
  return `${trimmed}-01`;
}

function toDocId(yyyyMm: string): string {
  const trimmed = yyyyMm?.trim();
  if (!trimmed) return "";
  return `miietf-fmr-${trimmed}`;
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
    const title = row.Title?.trim();
    const dateYyyyMm = row["Date (YYYY-MM)"]?.trim();
    const downloadUrl = row.Download_URL?.trim();
    const status = row.Status?.trim();

    if (!title || !dateYyyyMm) {
      console.warn(`Row ${i + 1}: missing title or date; skipping.`);
      err++;
      continue;
    }

    if (status && status !== "Success") {
      console.warn(`Row ${i + 1}: status is not Success; skipping.`);
      err++;
      continue;
    }

    const _id = toDocId(dateYyyyMm);
    const publishDate = toPublishDate(dateYyyyMm);

    const doc = {
      _id,
      _type: "fundDocument",
      title,
      fund: "miietf",
      category: "fund-manager-reports",
      publishDate: publishDate || undefined,
    };

    try {
      await client.createOrReplace(doc);
      ok++;
      if ((ok + err) % 5 === 0) console.log(`  ${ok + err}/${rows.length}`);
    } catch (e) {
      console.error(`Row ${i + 1} (_id: ${_id}):`, e);
      err++;
    }
  }

  console.log(`Done. Created/updated: ${ok}, errors: ${err}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
