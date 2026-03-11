/**
 * One-off script to delete all fundDocument entries with category "fund-manager-reports"
 * from the Sanity dataset.
 *
 * Prerequisites:
 * - .env.local with NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET,
 *   and SANITY_API_WRITE_TOKEN.
 *
 * Run from project root:
 *   npx tsx scripts/delete-fund-manager-reports.ts
 */

import { createClient } from "@sanity/client";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local");
  process.exit(1);
}
if (!token) {
  console.error("Missing SANITY_API_WRITE_TOKEN in .env.local");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: false,
  token,
});

async function main() {
  const ids = await client.fetch<string[]>(
    `*[_type == "fundDocument" && category == "fund-manager-reports"]._id`
  );

  if (ids.length === 0) {
    console.log("No fund documents with category 'fund-manager-reports' found.");
    return;
  }

  console.log(`Deleting ${ids.length} fund document(s)...`);
  const tx = client.transaction();
  for (const id of ids) {
    tx.delete(id);
  }
  await tx.commit();
  console.log(`Done. Deleted ${ids.length} document(s).`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
