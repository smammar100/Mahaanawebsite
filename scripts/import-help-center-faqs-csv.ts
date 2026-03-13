/**
 * Import Help Center FAQs from CSV into Sanity (faq document type).
 *
 * Prerequisites:
 * - .env.local with NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET,
 *   and SANITY_API_WRITE_TOKEN (or a token with write access from sanity.io/manage).
 *
 * Run from project root:
 *   npx tsx scripts/import-help-center-faqs-csv.ts [path-to-csv]
 *
 * Default CSV path: e:\Downloads\Mahaana - Need Help FAQs - 68f061fe307d928da1912dc3.csv
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { parse } from "csv-parse/sync";
import { resolve } from "path";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const CSV_PATH =
  process.argv[2] ??
  "e:\\Downloads\\Mahaana - Need Help FAQs - 68f061fe307d928da1912dc3.csv";

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
  Question: string;
  Slug: string;
  "Collection ID": string;
  "Item ID": string;
  Archived: string;
  Draft: string;
  "Created On": string;
  "Updated On": string;
  "Published On": string;
  Answer: string;
  Category: string;
  isTrending: string;
  categoryIcon: string;
  categoryOrder: string;
};

/** Strip HTML tags and normalize whitespace for Sanity text field. */
function stripHtml(html: string): string {
  if (!html || typeof html !== "string") return "";
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .trim();
}

/** Sanity faq category values we accept (must match schema list). */
const ALLOWED_CATEGORIES = new Set([
  "Getting Started & Account Setup",
  "Mahaana Save+",
  "Mahaana ETF (MIIETF)",
  "Mahaana Retirement",
  "Returns & Performance",
  "Withdrawals & Deposits",
  "Taxes, Zakat & Shariah",
  "Fees & Charges",
  "Security & Technology",
  "Support",
  "Account",
  "Features",
  "Security",
  "Other",
]);

function normalizeCategory(category: string): string {
  const c = category?.trim();
  if (!c) return "Other";
  if (ALLOWED_CATEGORIES.has(c)) return c;
  return "Other";
}

/** Deterministic _id for idempotent createOrReplace. */
function toFaqId(itemId: string): string {
  const id = (itemId || "").trim().replace(/[^a-zA-Z0-9_-]/g, "-").slice(0, 80);
  return id ? `help-faq-${id}` : `help-faq-${Date.now()}`;
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
    const question = row.Question?.trim();
    const answerRaw = row.Answer ?? "";
    const answer = stripHtml(answerRaw);
    const category = normalizeCategory(row.Category ?? "");

    if (!question) {
      console.warn(`Row ${i + 1}: skipping empty question`);
      continue;
    }
    if (!answer) {
      console.warn(`Row ${i + 1}: skipping empty answer for "${question.slice(0, 50)}..."`);
      continue;
    }

    const _id = toFaqId(row["Item ID"] ?? String(i));

    const doc = {
      _id,
      _type: "faq" as const,
      question,
      answer,
      category,
    };

    try {
      await client.createOrReplace(doc);
      ok++;
      if ((ok + err) % 10 === 0) console.log(`  ${ok + err}/${rows.length}`);
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
