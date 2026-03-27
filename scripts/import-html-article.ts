import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve } from "path";
import dotenv from "dotenv";
import { convertHtmlToMahaanaPortableText } from "./lib/html-to-portable-text";

dotenv.config({ path: ".env.local" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token =
  process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local");
  process.exit(1);
}
if (!token) {
  console.error(
    "Missing SANITY_WRITE_TOKEN or SANITY_API_WRITE_TOKEN in .env.local"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: false,
  token,
});

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/\//g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

async function main() {
  const args = process.argv.slice(2);
  const previewOnly = args.includes("--preview");
  const htmlPath = args.find((arg) => !arg.startsWith("--"));
  if (!htmlPath) {
    console.error("Usage: npx tsx scripts/import-html-article.ts <path-to-html-file>");
    process.exit(1);
  }

  const resolved = resolve(htmlPath);
  let html: string;
  try {
    html = readFileSync(resolved, "utf-8");
  } catch (e) {
    console.error("Failed to read file:", resolved, e);
    process.exit(1);
  }

  const { meta, bodyHtml } = convertHtmlToMahaanaPortableText(html, {
    includeProfiles: true,
  });

  if (bodyHtml.length === 0) {
    console.error("No content blocks found in HTML. Check structure (e.g. section.content-block, main, p, h2, h3, ul).");
    process.exit(1);
  }

  const slugCurrent = slugify(meta.title) || "untitled-" + Date.now();

  const doc = {
    _type: "investorEducationArticle",
    title: meta.title,
    slug: { _type: "slug", current: slugCurrent },
    author: meta.author || undefined,
    readingTime: meta.readingTime || undefined,
    excerpt: meta.excerpt || undefined,
    publishedAt: new Date().toISOString(),
    bodyHtml,
  };

  if (previewOnly) {
    console.log(
      JSON.stringify(
        {
          ...doc,
          _type: "investorEducationArticle (preview)",
        },
        null,
        2
      )
    );
    return;
  }

  const result = await client.create(doc);
  console.log("Created document:", result._id);
  console.log("Slug:", slugCurrent);
  console.log("View in Studio: Articles →", meta.title);
  console.log("View on site: /investor-education/" + slugCurrent);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
