import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_READ_TOKEN;

if (!projectId) {
  console.warn("NEXT_PUBLIC_SANITY_PROJECT_ID is not set; Sanity queries will fail.");
}

export const sanityClient = createClient({
  projectId: projectId ?? "",
  dataset,
  apiVersion: "2024-01-01",
  useCdn: false,
  ...(token ? { token } : {}),
});
