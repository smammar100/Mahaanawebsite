/**
 * Confirms REVALIDATION_SECRET is set for local testing of /api/revalidate.
 * Production must set the same variable in Netlify. Loads .env.local then .env.
 * Usage: npm run revalidate:verify-env
 */
const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, "..", ".env.local"),
  override: false,
});
require("dotenv").config({
  path: path.join(__dirname, "..", ".env"),
  override: false,
});

const secret = process.env.REVALIDATION_SECRET ?? "";

if (!secret.trim()) {
  console.error("[revalidate:verify-env] REVALIDATION_SECRET is missing or empty.\n");
  console.error(
    "  Add it to .env.local (same value as Netlify + Sanity webhook Bearer token).\n" +
      "  See .env.example and docs/sanity.md (Cache revalidation).\n"
  );
  process.exit(1);
}

console.log("[revalidate:verify-env] OK — REVALIDATION_SECRET is set (length hidden).");
process.exit(0);
