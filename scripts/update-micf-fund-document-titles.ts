/**
 * One-off: update MICF fundDocument titles in Sanity to match the display from the reference images.
 *
 * Prerequisites: .env.local with NEXT_PUBLIC_SANITY_PROJECT_ID,
 * NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN.
 *
 * Run: npx tsx scripts/update-micf-fund-document-titles.ts
 */

import { createClient } from "@sanity/client";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const MONTH_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTH_FULL = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const GENERAL_TITLES = [
  "Trust Deed",
  "Offering Document (revised April 15th, 2024)",
  "Consolidated MICF offering document",
  "4th supplemental offering documents of MICF",
];

const SHARIAH_TITLES = [
  "Shariah Audit Certificate, June 2023",
  "Fatwa",
];

/** Map General doc to target title by matching current title or _id. */
function getGeneralTitle(doc: Doc): string | null {
  const t = (doc.title ?? "").toLowerCase();
  const id = (doc._id ?? "").toLowerCase();
  if (id.includes("trust-deed") || t.includes("trust deed")) return GENERAL_TITLES[0];
  if (id.includes("offering-document-revised") || (t.includes("offering document") && t.includes("revised"))) return GENERAL_TITLES[1];
  if (id.includes("consolidated") || t.includes("consolidated micf")) return GENERAL_TITLES[2];
  if (id.includes("4th-supplemental") || id.includes("supplemental") || t.includes("supplemental")) return GENERAL_TITLES[3];
  return null;
}

/** Map Shariah doc to target title by matching current title or _id. */
function getShariahTitle(doc: Doc): string | null {
  const t = (doc.title ?? "").toLowerCase();
  const id = (doc._id ?? "").toLowerCase();
  if (id.includes("shariah-audit") || id.includes("audit-certificate") || t.includes("shariah audit") || t.includes("audit certificate")) return SHARIAH_TITLES[0];
  if (id.includes("fatwa") || t.includes("fatwa")) return SHARIAH_TITLES[1];
  return null;
}

type Doc = { _id: string; title: string | null; category: string; publishDate: string | null };

function parseDate(d: string | null): { year: number; month: number } | null {
  if (!d || typeof d !== "string") return null;
  const match = d.match(/^(\d{4})-(\d{2})/);
  if (!match) return null;
  const year = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  if (month < 1 || month > 12) return null;
  return { year, month };
}

async function main() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
  const token = process.env.SANITY_API_WRITE_TOKEN;

  if (!projectId) throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local");
  if (!token) throw new Error("Missing SANITY_API_WRITE_TOKEN in .env.local");

  const client = createClient({
    projectId,
    dataset,
    apiVersion: "2024-01-01",
    useCdn: false,
    token,
  });

  const query = `*[_type == "fundDocument" && fund == "micf"] { _id, title, category, publishDate }`;
  const docs = (await client.fetch(query)) as Doc[];
  if (!docs.length) {
    console.log("No MICF fund documents found.");
    return;
  }

  const byCategory = new Map<string, Doc[]>();
  for (const d of docs) {
    const cat = d.category ?? "general";
    if (!byCategory.has(cat)) byCategory.set(cat, []);
    byCategory.get(cat)!.push(d);
  }

  let updated = 0;
  let skipped = 0;

  for (const [category, list] of byCategory) {
    if (category === "general") {
      for (const doc of list) {
        const title = getGeneralTitle(doc) ?? doc.title ?? "Untitled";
        if (title !== doc.title) {
          await client.patch(doc._id).set({ title }).commit();
          updated++;
          console.log(`  [general] ${doc._id} -> "${title}"`);
        } else {
          skipped++;
        }
      }
      continue;
    }

    if (category === "fund-manager-reports") {
      const sorted = [...list].sort((a, b) => {
        const da = parseDate(a.publishDate);
        const db = parseDate(b.publishDate);
        if (!da) return 1;
        if (!db) return -1;
        if (da.year !== db.year) return db.year - da.year;
        return db.month - da.month;
      });
      for (const doc of sorted) {
        const parsed = parseDate(doc.publishDate);
        if (!parsed) {
          console.warn(`  [fund-manager-reports] ${doc._id}: missing publishDate, skipping title update`);
          skipped++;
          continue;
        }
        const title = `FMR ${MONTH_SHORT[parsed.month - 1]} ${parsed.year}`;
        if (title !== doc.title) {
          await client.patch(doc._id).set({ title }).commit();
          updated++;
          console.log(`  [fund-manager-reports] ${doc._id} -> "${title}"`);
        } else {
          skipped++;
        }
      }
      continue;
    }

    if (category === "shariah-compliance") {
      for (const doc of list) {
        const title = getShariahTitle(doc) ?? doc.title ?? "Untitled";
        if (title !== doc.title) {
          await client.patch(doc._id).set({ title }).commit();
          updated++;
          console.log(`  [shariah-compliance] ${doc._id} -> "${title}"`);
        } else {
          skipped++;
        }
      }
      continue;
    }

    if (category === "financial-statements") {
      const sorted = [...list].sort((a, b) => {
        const da = parseDate(a.publishDate);
        const db = parseDate(b.publishDate);
        if (!da) return 1;
        if (!db) return -1;
        if (da.year !== db.year) return db.year - da.year;
        return db.month - da.month;
      });
      for (const doc of sorted) {
        const parsed = parseDate(doc.publishDate);
        if (!parsed) {
          console.warn(`  [financial-statements] ${doc._id}: missing publishDate, skipping title update`);
          skipped++;
          continue;
        }
        const title = `MICF ${MONTH_FULL[parsed.month - 1]} ${parsed.year}`;
        if (title !== doc.title) {
          await client.patch(doc._id).set({ title }).commit();
          updated++;
          console.log(`  [financial-statements] ${doc._id} -> "${title}"`);
        } else {
          skipped++;
        }
      }
      continue;
    }

    console.warn(`  Unknown category "${category}", ${list.length} doc(s) unchanged.`);
    skipped += list.length;
  }

  console.log(`\nDone. Updated: ${updated}, unchanged/skipped: ${skipped}.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
