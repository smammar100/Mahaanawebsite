/**
 * Import MIIETF FMR from MIIETF_Sanity_Export.zip: extract to temp, then run NDJSON import
 * so PDFs are attached to fund documents.
 *
 * Prerequisites: .env.local with NEXT_PUBLIC_SANITY_PROJECT_ID,
 * NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN.
 *
 * Run: npx tsx scripts/import-miietf-fmr-from-zip.ts "e:\Downloads\MIIETF_Sanity_Export.zip"
 */

import { mkdtempSync, rmSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import AdmZip from "adm-zip";
import dotenv from "dotenv";
import { runImport } from "./import-miietf-fmr-ndjson";

dotenv.config({ path: ".env.local" });

const ZIP_PATH = process.argv[2];
if (!ZIP_PATH) {
  console.error("Usage: npx tsx scripts/import-miietf-fmr-from-zip.ts <path-to-zip>");
  process.exit(1);
}

async function main() {
  const zip = new AdmZip(ZIP_PATH);
  const tempDir = mkdtempSync(join(tmpdir(), "MIIETF_Sanity_Export_"));
  try {
    zip.extractAllTo(tempDir, true);
    const ndjsonPath = join(tempDir, "sanity_import.ndjson");
    await runImport(ndjsonPath, tempDir);
  } finally {
    rmSync(tempDir, { recursive: true, force: true });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
