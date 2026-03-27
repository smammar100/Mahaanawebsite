/**
 * Confirms env vars needed for schema deploy and hosted Studio deploy.
 * Loads .env.local then .env (same order as schema-deploy).
 * Usage: npm run sanity:verify-env
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

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "";
const authToken = process.env.SANITY_AUTH_TOKEN ?? "";

const errors = [];
if (!projectId.trim()) {
  errors.push("NEXT_PUBLIC_SANITY_PROJECT_ID is missing or empty.");
}
if (!dataset.trim()) {
  errors.push("NEXT_PUBLIC_SANITY_DATASET is missing or empty.");
}
if (!authToken.trim()) {
  errors.push(
    "SANITY_AUTH_TOKEN is missing or empty (required for npm run schema:deploy and npm run sanity:studio-deploy)."
  );
}

if (errors.length) {
  console.error("[sanity:verify-env] Fix the following:\n");
  errors.forEach((e) => console.error(`  - ${e}`));
  console.error(
    "\nCopy .env.example to .env.local and set values. Get a deploy token from:\n" +
      "  https://www.sanity.io/manage → API → Tokens (Editor or deploy-capable token).\n"
  );
  process.exit(1);
}

console.log("[sanity:verify-env] OK");
console.log(`  projectId: ${projectId}`);
console.log(`  dataset:   ${dataset}`);
console.log("  SANITY_AUTH_TOKEN: set");
process.exit(0);
