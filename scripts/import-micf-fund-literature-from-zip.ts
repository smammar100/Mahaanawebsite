/**
 * Import MICF fund literature from MICF_All_Categories_Final (1).zip.
 * Parent zip contains four inner zips; each is extracted to temp and imported via NDJSON.
 *
 * Prerequisites: .env.local with NEXT_PUBLIC_SANITY_PROJECT_ID,
 * NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN.
 *
 * Run: npx tsx scripts/import-micf-fund-literature-from-zip.ts "e:\Downloads\MICF_All_Categories_Final (1).zip"
 */

import { mkdtempSync, rmSync, existsSync, readdirSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import AdmZip from "adm-zip";
import dotenv from "dotenv";
import { runFundDocumentImport } from "./import-fund-documents-ndjson";

dotenv.config({ path: ".env.local" });

const ZIP_PATH = process.argv[2];
if (!ZIP_PATH) {
  console.error("Usage: npx tsx scripts/import-micf-fund-literature-from-zip.ts <path-to-parent-zip>");
  process.exit(1);
}

const INNER_ZIP_TO_CATEGORY: Record<string, string> = {
  "MICF_General_Export": "general",
  "MICF_Fund_Manager_Reports_Export": "fund-manager-reports",
  "MICF_Shariah_Compliance_Export": "shariah-compliance",
  "MICF_Financial_Statements_Export": "financial-statements",
};

function categoryForEntryName(entryName: string): string | null {
  const filename = entryName.split("/").pop() ?? entryName;
  const base = filename.replace(/\.zip$/i, "").trim();
  return INNER_ZIP_TO_CATEGORY[base] ?? null;
}

async function main() {
  const zip = new AdmZip(ZIP_PATH);
  const entries = zip.getEntries();

  for (const entry of entries) {
    if (entry.isDirectory) continue;
    const name = entry.entryName.replace(/\/$/, "");
    const category = categoryForEntryName(name);
    if (!category) {
      console.log("Skipping non-category entry:", name);
      continue;
    }

    const tempDir = mkdtempSync(join(tmpdir(), `MICF_${category}_`));
    try {
      const data = entry.getData();
      if (!(data && data.length > 0)) {
        console.warn("Empty inner zip:", name);
        continue;
      }
      const innerZip = new AdmZip(data);
      innerZip.extractAllTo(tempDir, true);

      let ndjsonPath = join(tempDir, "sanity_import.ndjson");
      if (!existsSync(ndjsonPath)) {
        const top = readdirSync(tempDir);
        for (const item of top) {
          const full = join(tempDir, item);
          if (item === "sanity_import.ndjson") {
            ndjsonPath = full;
            break;
          }
          if (item.endsWith(".ndjson")) {
            ndjsonPath = full;
            break;
          }
        }
        if (!existsSync(ndjsonPath)) {
          const singleDir = top.length === 1 && top[0] && !top[0].includes(".");
          if (singleDir) {
            const sub = join(tempDir, top[0]);
            const subItems = readdirSync(sub);
            for (const item of subItems) {
              if (item === "sanity_import.ndjson" || item.endsWith(".ndjson")) {
                ndjsonPath = join(sub, item);
                break;
              }
            }
          }
        }
      }
      if (!existsSync(ndjsonPath)) {
        console.warn("No .ndjson file in", name);
        continue;
      }

      const pdfBasePath = tempDir;
      console.log(`\n--- ${name} -> category: ${category} ---`);
      const result = await runFundDocumentImport(ndjsonPath, pdfBasePath, "micf", category);
      console.log(`  ok: ${result.ok}, uploaded: ${result.uploaded}, err: ${result.err}`);
    } finally {
      rmSync(tempDir, { recursive: true, force: true });
    }
  }

  console.log("\nMICF fund literature import finished.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
