/**
 * Migrate existing investorEducation documents to the new schema types
 * (investorEducationArticle, investorEducationNews, investorEducationVideoPodcast).
 *
 * Prerequisites: .env.local with NEXT_PUBLIC_SANITY_PROJECT_ID,
 * NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN.
 *
 * Run from project root:
 *   npx tsx scripts/migrate-investor-education-to-new-schemas.ts
 *   npx tsx scripts/migrate-investor-education-to-new-schemas.ts --delete-old
 */

import { createClient } from "@sanity/client";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token =
  process.env.SANITY_API_WRITE_TOKEN ?? process.env.SANITY_API_READ_TOKEN;

if (!projectId) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local");
  process.exit(1);
}
if (!token) {
  console.error(
    "Missing SANITY_API_WRITE_TOKEN in .env.local"
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

type OldDoc = {
  _id: string;
  _type: string;
  title?: string | null;
  slug?: { _type?: string; current?: string } | null;
  publishedAt?: string | null;
  category?: "Video" | "Article" | "News" | string | null;
  excerpt?: string | null;
  tldr?: string | null;
  thumbnail?: unknown;
  externalLink?: string | null;
  link?: string | null;
  author?: string | null;
  authorName?: string | null;
  readingTime?: string | null;
  bodyHtml?: unknown;
  blogBodyText?: unknown;
};

type NewType =
  | "investorEducationArticle"
  | "investorEducationNews"
  | "investorEducationVideoPodcast";

function categoryToType(
  category: string | null | undefined
): NewType {
  const c = category?.trim();
  if (c === "Video") return "investorEducationVideoPodcast";
  if (c === "News") return "investorEducationNews";
  return "investorEducationArticle";
}

const MIGRATION_QUERY = `*[_type == "investorEducation"] {
  _id,
  _type,
  title,
  slug,
  publishedAt,
  category,
  excerpt,
  tldr,
  thumbnail,
  externalLink,
  link,
  author,
  authorName,
  readingTime,
  bodyHtml,
  blogBodyText
}`;

async function main() {
  const deleteOld = process.argv.includes("--delete-old");
  if (deleteOld) {
    console.log("Running with --delete-old: old documents will be deleted after migration.");
  }

  console.log("Fetching existing investorEducation documents...");
  const oldDocs = (await client.fetch(MIGRATION_QUERY)) as OldDoc[];

  if (!oldDocs.length) {
    console.log("No documents with _type == 'investorEducation' found. Nothing to migrate.");
    return;
  }

  console.log(`Found ${oldDocs.length} document(s) to migrate.`);

  const counts: Record<NewType, number> = {
    investorEducationArticle: 0,
    investorEducationNews: 0,
    investorEducationVideoPodcast: 0,
  };
  let errors = 0;

  for (const doc of oldDocs) {
    const newType = categoryToType(doc.category);
    const newId = `migrated-${doc._id}`;

    const excerpt = doc.excerpt ?? doc.tldr ?? undefined;
    const externalLink = doc.externalLink ?? doc.link ?? undefined;
    const author = doc.author ?? doc.authorName ?? undefined;
    const bodyHtml = doc.bodyHtml ?? doc.blogBodyText ?? undefined;

    const newDoc: Record<string, unknown> = {
      _id: newId,
      _type: newType,
      title: doc.title ?? "Untitled",
      slug: doc.slug && doc.slug.current
        ? { _type: "slug", current: doc.slug.current }
        : { _type: "slug", current: doc._id },
      publishedAt: doc.publishedAt ?? undefined,
      excerpt: excerpt || undefined,
      thumbnail: doc.thumbnail ?? undefined,
      externalLink: externalLink || undefined,
      author: author || undefined,
      readingTime: doc.readingTime ?? undefined,
      bodyHtml: bodyHtml ?? undefined,
    };

    // Omit undefined so we don't send null/undefined to Sanity
    const cleaned: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(newDoc)) {
      if (v !== undefined && v !== null) cleaned[k] = v;
    }

    try {
      await client.createOrReplace(cleaned as { _id: string; _type: string } & Record<string, unknown>);
      counts[newType]++;
      if ((counts.investorEducationArticle + counts.investorEducationNews + counts.investorEducationVideoPodcast + errors) % 10 === 0) {
        console.log(`  Processed ${counts.investorEducationArticle + counts.investorEducationNews + counts.investorEducationVideoPodcast + errors}/${oldDocs.length}`);
      }
    } catch (e) {
      console.error(`Failed to migrate _id "${doc._id}" (${doc.title ?? "no title"}):`, e);
      errors++;
      continue;
    }

    if (deleteOld) {
      try {
        await client.delete(doc._id);
      } catch (e) {
        console.error(`Failed to delete old document _id "${doc._id}":`, e);
      }
    }
  }

  console.log("Done.");
  console.log("  investorEducationArticle:", counts.investorEducationArticle);
  console.log("  investorEducationNews:", counts.investorEducationNews);
  console.log("  investorEducationVideoPodcast:", counts.investorEducationVideoPodcast);
  if (errors > 0) console.log("  Errors:", errors);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
