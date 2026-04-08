#!/usr/bin/env node
/**
 * Imports scripts/sanity-reviews.review.ndjson into the configured Sanity dataset.
 * Requires a token with create/write access (Editor), not read-only.
 *
 * Env (from .env.local): NEXT_PUBLIC_SANITY_DATASET, and one of:
 *   SANITY_IMPORT_TOKEN, SANITY_AUTH_TOKEN, SANITY_API_WRITE_TOKEN, SANITY_WRITE_TOKEN
 *
 * Usage: node scripts/import-reviews-dataset.mjs
 */
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
dotenv.config({ path: path.join(root, ".env.local"), override: false });
dotenv.config({ path: path.join(root, ".env"), override: false });

const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
/** Prefer SANITY_IMPORT_TOKEN for a dedicated Editor token; SANITY_AUTH_TOKEN must belong to this project (see Unauthorized vs insufficient create errors). */
const token =
  process.env.SANITY_IMPORT_TOKEN?.trim() ||
  process.env.SANITY_AUTH_TOKEN?.trim() ||
  process.env.SANITY_API_WRITE_TOKEN?.trim() ||
  process.env.SANITY_WRITE_TOKEN?.trim();

if (!token) {
  console.error(
    "[import-reviews] Set SANITY_IMPORT_TOKEN or SANITY_AUTH_TOKEN or SANITY_API_WRITE_TOKEN in .env.local (Editor token with create permission)."
  );
  process.exit(1);
}

/** Relative path so CLI args are not split on spaces in absolute paths (Windows). */
const ndjsonRel = "scripts/sanity-reviews.review.ndjson";
const r = spawnSync(
  "npx",
  [
    "sanity",
    "datasets",
    "import",
    ndjsonRel,
    "-d",
    dataset,
    "-t",
    token,
    "--replace",
  ],
  { cwd: root, stdio: "inherit", shell: true }
);

process.exit(r.status ?? 1);
