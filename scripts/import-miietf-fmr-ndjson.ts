/**
 * Import MIIETF Fund Manager Reports from NDJSON into Sanity as fundDocument.
 *
 * Maps each NDJSON line to a fundDocument with:
 * - fund: miietf
 * - category: fund-manager-reports
 * - title, publishDate (from reportDate)
 * - file: uploaded from local path when base path is provided (see pdfFile._sanityAsset in NDJSON)
 *
 * Prerequisites: .env.local with NEXT_PUBLIC_SANITY_PROJECT_ID,
 * NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN.
 *
 * Run: npx tsx scripts/import-miietf-fmr-ndjson.ts [path-to.ndjson] [base-path-for-pdfs]
 * Example: npx tsx scripts/import-miietf-fmr-ndjson.ts "e:\Downloads\sanity_import.ndjson" "e:\Downloads"
 * (PDFs must exist under base-path/MIIETF_FMR_Reports/ as in the NDJSON paths.)
 * Default NDJSON: e:\Downloads\sanity_import.ndjson
 *
 * Also export runImport(ndjsonPath, pdfBasePath) for use from import-miietf-fmr-from-zip.ts.
 */

import { resolve } from "path";
import dotenv from "dotenv";
import { runFundDocumentImport } from "./import-fund-documents-ndjson";

dotenv.config({ path: ".env.local" });

const NDJSON_PATH = process.argv[2] ?? "e:\\Downloads\\sanity_import.ndjson";
const PDF_BASE_PATH = process.argv[3] ?? "";

export type { NdjsonRow, RunFundDocumentImportResult } from "./import-fund-documents-ndjson";
export { getPdfPath, toIdMiietfFmr as toId } from "./import-fund-documents-ndjson";

export type RunImportResult = import("./import-fund-documents-ndjson").RunFundDocumentImportResult;

export async function runImport(
  ndjsonPath: string,
  pdfBasePath: string
): Promise<RunImportResult> {
  const resolved = resolve(ndjsonPath);
  console.log("Reading NDJSON from:", resolved);
  if (pdfBasePath) {
    console.log("PDF base path:", resolve(pdfBasePath), "(will upload PDFs when file exists)");
  } else {
    console.log("No PDF base path provided; documents will be created without file attachment.");
  }
  const result = await runFundDocumentImport(
    ndjsonPath,
    pdfBasePath,
    "miietf",
    "fund-manager-reports"
  );
  console.log(
    `Done. Created/updated: ${result.ok}, PDFs uploaded: ${result.uploaded}, errors: ${result.err}`
  );
  return result;
}

async function main() {
  await runImport(NDJSON_PATH, PDF_BASE_PATH);
}

if (require.main === module) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
