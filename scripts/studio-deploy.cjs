/**
 * Hosted Sanity Studio deploy (sanity.io) using sanity.cli.ts (studioHost, appId).
 * Loads .env.local / .env so NEXT_PUBLIC_* and SANITY_AUTH_TOKEN are available.
 * Usage: npm run sanity:studio-deploy
 */
const path = require("path");
const { spawnSync } = require("child_process");

require("dotenv").config({
  path: path.join(__dirname, "..", ".env.local"),
  override: false,
});
require("dotenv").config({
  path: path.join(__dirname, "..", ".env"),
  override: false,
});

const cwd = path.join(__dirname, "..");
const sanityBin = path.join(cwd, "node_modules", "sanity", "bin", "sanity");

const result = spawnSync(
  process.execPath,
  [sanityBin, "deploy", "--yes"],
  { stdio: "inherit", env: process.env, cwd, shell: false }
);

process.exit(result.status === null ? 1 : result.status);
