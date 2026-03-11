/**
 * Generic fund document import from NDJSON: uploads PDFs and creates/updates fundDocument.
 * Used by MIIETF FMR script and MICF fund literature zip script.
 *
 * Prerequisites: .env.local with NEXT_PUBLIC_SANITY_PROJECT_ID,
 * NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN.
 */

import { createClient } from "@sanity/client";
import { readFileSync, existsSync } from "fs";
import { resolve, basename, dirname } from "path";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export type NdjsonRow = {
  _type?: string;
  title: string;
  reportDate?: string;
  publishDate?: string;
  pdfFile?: { _type?: string; _sanityAsset?: string };
};

/** MIIETF FMR uses YYYY-MM for _id. */
export function toIdMiietfFmr(reportDate: string): string {
  const d = reportDate?.trim();
  if (!d || !/^\d{4}-\d{2}-\d{2}$/.test(d)) return "";
  const [y, m] = d.split("-");
  return `miietf-fmr-${y}-${m}`;
}

/** Extract local file path from _sanityAsset. */
export function getPdfPath(sanityAsset: string | undefined): string | null {
  if (!sanityAsset || typeof sanityAsset !== "string") return null;
  const prefix = "file@file://";
  if (!sanityAsset.startsWith(prefix)) return null;
  const path = sanityAsset.slice(prefix.length).trim() || null;
  if (!path) return null;
  return path.replace(/\u00a0/g, " ");
}

/** Resolve PDF path under base; try spaces/underscores swapped if not found. */
export function resolvePdfPath(pdfBasePath: string, relativePath: string): string | null {
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

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80) || "doc";
}

export interface RunFundDocumentImportResult {
  ok: number;
  err: number;
  uploaded: number;
}

export async function runFundDocumentImport(
  ndjsonPath: string,
  pdfBasePath: string,
  fund: "micf" | "miietf" | "miirf",
  category: string
): Promise<RunFundDocumentImportResult> {
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
  const raw = readFileSync(resolved, "utf-8");
  const lines = raw.split(/\r?\n/).filter((line) => line.trim());

  let ok = 0;
  let err = 0;
  let uploaded = 0;
  const usedIds = new Set<string>();

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
    const reportDate = (row.reportDate ?? row.publishDate)?.trim() ?? "";

    if (!title) {
      console.warn(`Line ${i + 1}: missing title, skipping.`);
      err++;
      continue;
    }

    let _id: string;
    if (fund === "miietf" && category === "fund-manager-reports") {
      _id = toIdMiietfFmr(reportDate);
      if (!_id) {
        console.warn(`Line ${i + 1}: invalid reportDate "${reportDate}", skipping.`);
        err++;
        continue;
      }
    } else {
      let base = `${fund}-${category}-${slugify(title)}`;
      _id = base;
      let n = 0;
      while (usedIds.has(_id)) {
        n++;
        _id = `${base}-${n}`;
      }
      usedIds.add(_id);
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
      fund,
      category,
      publishDate: reportDate || undefined,
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

  return { ok, err, uploaded };
}
