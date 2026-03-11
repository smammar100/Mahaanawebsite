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

import { createClient } from "@sanity/client";
import { readFileSync, existsSync } from "fs";
import { resolve, basename, dirname } from "path";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const NDJSON_PATH = process.argv[2] ?? "e:\\Downloads\\sanity_import.ndjson";
const PDF_BASE_PATH = process.argv[3] ?? "";

export type NdjsonRow = {
  _type: string;
  title: string;
  reportDate: string;
  pdfFile?: { _type: string; _sanityAsset?: string };
};

export function toId(reportDate: string): string {
  const d = reportDate?.trim();
  if (!d || !/^\d{4}-\d{2}-\d{2}$/.test(d)) return "";
  const [y, m] = d.split("-");
  return `miietf-fmr-${y}-${m}`;
}

/** Extract local file path from _sanityAsset (e.g. "file@file://./MIIETF_FMR_Reports/x.pdf" -> "./MIIETF_FMR_Reports/x.pdf"). */
export function getPdfPath(sanityAsset: string | undefined): string | null {
  if (!sanityAsset || typeof sanityAsset !== "string") return null;
  const prefix = "file@file://";
  if (!sanityAsset.startsWith(prefix)) return null;
  const path = sanityAsset.slice(prefix.length).trim() || null;
  if (!path) return null;
  return path.replace(/\u00a0/g, " ");
}

/** Resolve PDF path under base; if not found, try filename with spaces/underscores swapped. */
function resolvePdfPath(pdfBasePath: string, relativePath: string): string | null {
  const fullPath = resolve(pdfBasePath, relativePath);
  if (existsSync(fullPath)) return fullPath;
  const dir = dirname(relativePath);
  const name = basename(relativePath);
  const withUnderscores = resolve(pdfBasePath, dir, name.replace(/ /g, "_"));
  if (existsSync(withUnderscores)) return withUnderscores;
  const withSpaces = resolve(pdfBasePath, dir, name.replace(/_/g, " "));
  if (existsSync(withSpaces)) return withSpaces;
  return null;
}

export interface RunImportResult {
  ok: number;
  err: number;
  uploaded: number;
}

export async function runImport(
  ndjsonPath: string,
  pdfBasePath: string
): Promise<RunImportResult> {
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

  const resolved = resolve(ndjsonPath);
  console.log("Reading NDJSON from:", resolved);
  if (pdfBasePath) {
    console.log("PDF base path:", resolve(pdfBasePath), "(will upload PDFs when file exists)");
  } else {
    console.log("No PDF base path provided; documents will be created without file attachment.");
  }

  const raw = readFileSync(resolved, "utf-8");
  const lines = raw.split(/\r?\n/).filter((line) => line.trim());

  console.log(`Found ${lines.length} lines. Importing as fundDocument...`);

  let ok = 0;
  let err = 0;
  let uploaded = 0;

  for (let i = 0; i < lines.length; i++) {
    let row: NdjsonRow;
    try {
      row = JSON.parse(lines[i]) as NdjsonRow;
    } catch (e) {
      console.warn(`Line ${i + 1}: invalid JSON, skipping.`);
      err++;
      continue;
    }

    const title = row.title?.trim();
    const reportDate = row.reportDate?.trim();

    if (!title || !reportDate) {
      console.warn(`Line ${i + 1}: missing title or reportDate, skipping.`);
      err++;
      continue;
    }

    const _id = toId(reportDate);
    if (!_id) {
      console.warn(`Line ${i + 1}: invalid reportDate "${reportDate}", skipping.`);
      err++;
      continue;
    }

    let fileRef: { _type: "file"; asset: { _type: "reference"; _ref: string } } | undefined;

    if (pdfBasePath && row.pdfFile?._sanityAsset) {
      const relativePath = getPdfPath(row.pdfFile._sanityAsset);
      if (relativePath) {
        const fullPath = resolvePdfPath(pdfBasePath, relativePath);
        if (fullPath) {
          try {
            const buffer = readFileSync(fullPath);
            const filename = basename(fullPath);
            const asset = await client.assets.upload("file", buffer, {
              filename,
              contentType: "application/pdf",
            });
            if (asset?._id) {
              fileRef = {
                _type: "file",
                asset: { _type: "reference", _ref: asset._id },
              };
              uploaded++;
            }
          } catch (uploadErr) {
            console.warn(`Line ${i + 1} (_id: ${_id}): PDF upload failed:`, uploadErr);
          }
        } else {
          console.warn(
            `Line ${i + 1} (_id: ${_id}): PDF not found at ${resolve(pdfBasePath, relativePath)} (tried space/underscore variants)`
          );
        }
      }
    }

    const doc = {
      _id,
      _type: "fundDocument",
      title,
      fund: "miietf",
      category: "fund-manager-reports",
      publishDate: reportDate,
      ...(fileRef ? { file: fileRef } : {}),
    };

    try {
      await client.createOrReplace(doc);
      ok++;
      if ((ok + err) % 5 === 0) console.log(`  ${ok + err}/${lines.length}`);
    } catch (e) {
      console.error(`Line ${i + 1} (_id: ${_id}):`, e);
      err++;
    }
  }

  console.log(`Done. Created/updated: ${ok}, PDFs uploaded: ${uploaded}, errors: ${err}`);
  return { ok, err, uploaded };
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
