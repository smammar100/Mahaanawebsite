#!/usr/bin/env node
/**
 * Maps NDJSON lines with _type "appReview" (userName, text, avatarUrl, rating, date)
 * to Sanity "review" documents for dataset import.
 *
 * Usage:
 *   node scripts/transform-app-review-ndjson.mjs [input.ndjson] [output.ndjson]
 * Defaults: scripts/sanity-reviews.appReview.ndjson -> scripts/sanity-reviews.review.ndjson
 *
 * Import (after schema is deployed; needs Editor token in .env.local):
 *   npm run sanity:import-reviews
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const defaultIn = path.join(__dirname, "sanity-reviews.appReview.ndjson");
const defaultOut = path.join(__dirname, "sanity-reviews.review.ndjson");
const inputPath = process.argv[2] ?? defaultIn;
const outputPath = process.argv[3] ?? defaultOut;

const raw = fs.readFileSync(inputPath, "utf8");
const lines = raw.split(/\r?\n/).filter((l) => l.trim());
const out = [];
for (const line of lines) {
  const row = JSON.parse(line);
  if (row._type !== "appReview") continue;
  out.push(
    JSON.stringify({
      _id: row._id,
      _type: "review",
      authorName: row.userName,
      quote: row.text,
      avatarUrl: row.avatarUrl,
      rating: row.rating,
      reviewDate: row.date,
      source: "Google Play",
    })
  );
}
fs.writeFileSync(outputPath, `${out.join("\n")}\n`, "utf8");
console.log(`Wrote ${out.length} documents to ${outputPath}`);
