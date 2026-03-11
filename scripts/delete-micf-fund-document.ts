/**
 * One-off: delete a single MICF fundDocument by _id.
 * Run: npx tsx scripts/delete-micf-fund-document.ts [documentId]
 * Default id: micf-financial-statements-micf-10k-users
 */

import { createClient } from "@sanity/client";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const DOC_ID = process.argv[2] ?? "micf-financial-statements-micf-10k-users";

async function main() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!projectId || !token) throw new Error("Missing Sanity env in .env.local");
  const client = createClient({
    projectId,
    dataset,
    apiVersion: "2024-01-01",
    useCdn: false,
    token,
  });
  await client.delete(DOC_ID);
  console.log("Deleted:", DOC_ID);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
