/**
 * Loads .env.local (and .env) so SANITY_AUTH_TOKEN is available for `sanity schema deploy`.
 * Run via: npm run schema:deploy
 */
const path = require("path");
const { spawnSync } = require("child_process");

require("dotenv").config({ path: path.join(__dirname, "..", ".env.local") });
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const cwd = path.join(__dirname, "..");
const sanityBin = path.join(cwd, "node_modules", "sanity", "bin", "sanity");

const result = spawnSync(
  process.execPath,
  [sanityBin, "schema", "deploy", "--manifest-dir", "public/studio/static"],
  { stdio: "inherit", env: process.env, cwd, shell: false }
);

process.exit(result.status === null ? 1 : result.status);
