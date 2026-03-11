/**
 * Import MIIRF fund literature from MIIRF_All_Categories_Bundle.zip.
 * Bundle contains top-level folders (General, Fund_Manager_Reports, Financial_Statements, Shariah_Compliance)
 * with NDJSON and PDFs inside each folder.
 *
 * Prerequisites: .env.local with NEXT_PUBLIC_SANITY_PROJECT_ID,
 * NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN.
 *
 * Run: npx tsx scripts/import-miirf-fund-literature-from-zip.ts "e:\Downloads\MIIRF_All_Categories_Bundle.zip"
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
  console.error("Usage: npx tsx scripts/import-miirf-fund-literature-from-zip.ts <path-to-bundle-zip>");
  process.exit(1);
}

const FOLDER_TO_CATEGORY: Record<string, string> = {
  "General": "general",
  "Fund_Manager_Reports": "fund-manager-reports",
  "Financial_Statements": "financial-statements",
  "Shariah_Compliance": "shariah-compliance",
};

async function main() {
  const zip = new AdmZip(ZIP_PATH);
  const tempDir = mkdtempSync(join(tmpdir(), "MIIRF_Bundle_"));
  try {
    zip.extractAllTo(tempDir, true);
    const topDirs = readdirSync(tempDir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);

    for (const folderName of topDirs) {
      const category = FOLDER_TO_CATEGORY[folderName];
      if (!category) {
        console.log("Skipping unknown folder:", folderName);
        continue;
      }
      const categoryDir = join(tempDir, folderName);
      let ndjsonPath: string | null = null;
      const items = readdirSync(categoryDir);
      for (const item of items) {
        if (item.endsWith(".ndjson")) {
          ndjsonPath = join(categoryDir, item);
          break;
        }
      }
      if (!ndjsonPath || !existsSync(ndjsonPath)) {
        console.warn("No .ndjson file in", folderName);
        continue;
      }
      const pdfBasePath = categoryDir;
      console.log(`\n--- ${folderName} -> category: ${category} ---`);
      const result = await runFundDocumentImport(ndjsonPath, pdfBasePath, "miirf", category);
      console.log(`  ok: ${result.ok}, uploaded: ${result.uploaded}, err: ${result.err}`);
    }
  } finally {
    rmSync(tempDir, { recursive: true, force: true });
  }
  console.log("\nMIIRF fund literature import finished.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
