/**
 * Seed sample documents for the three investor education schema types
 * (Articles, News, Videos & Podcasts) so each category has items in Studio.
 *
 * Prerequisites: .env.local with NEXT_PUBLIC_SANITY_PROJECT_ID,
 * NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN.
 *
 * Run from project root:
 *   npx tsx scripts/seed-investor-education.ts
 *
 * Uses deterministic slugs (seed-article-1, etc.). Re-running skips docs that already exist.
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

const BLOCK = (text: string) => ({
  _type: "block",
  style: "normal",
  markDefs: [],
  children: [{ _type: "span", text }],
});

const SAMPLES = {
  investorEducationArticle: [
    {
      slug: "seed-article-1",
      title: "Understanding Shariah-Compliant Investing",
      excerpt:
        "A short guide to how Islamic finance principles apply to investment products and what to look for when choosing funds.",
      author: "Mahaana Team",
      readingTime: "5 min read",
      bodyHtml: [BLOCK("Sample body content for the first article. You can replace this with full portable text from Sanity or your CMS.")],
    },
    {
      slug: "seed-article-2",
      title: "Building a Savings Plan That Works for You",
      excerpt:
        "Practical steps to set goals, automate savings, and stay on track for the long term.",
      author: "Mahaana Team",
      readingTime: "4 min read",
      bodyHtml: [BLOCK("Sample body for the second article. Edit or replace this in Sanity Studio.")],
    },
  ],
  investorEducationNews: [
    {
      slug: "seed-news-1",
      title: "Market Update: Key Trends in Ethical Investing",
      excerpt: "Recent developments in sustainable and values-based investment products.",
      author: "Mahaana Research",
      externalLink: "https://example.com/news-1",
      readingTime: "3 min read",
      bodyHtml: [BLOCK("Sample news body. Link to full article via External Link.")],
    },
    {
      slug: "seed-news-2",
      title: "Regulatory Changes Affecting Savings Products",
      excerpt: "What investors need to know about the latest regulatory updates.",
      author: "Mahaana Research",
      externalLink: "https://example.com/news-2",
      bodyHtml: [BLOCK("Brief summary. Read more at the external link.")],
    },
  ],
  investorEducationVideoPodcast: [
    {
      slug: "seed-video-1",
      title: "Introduction to Mahaana Funds",
      excerpt: "A short video overview of our fund range and how they align with your goals.",
      externalLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      author: "Mahaana",
      bodyHtml: [BLOCK("Optional description or transcript snippet.")],
    },
    {
      slug: "seed-video-2",
      title: "Podcast: Saving for the Future",
      excerpt: "Listen to our experts discuss practical saving strategies.",
      externalLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      author: "Mahaana",
    },
  ],
} as const;

const SLUGS_QUERY = `*[_type in ["investorEducationArticle", "investorEducationNews", "investorEducationVideoPodcast"] && defined(slug.current)].slug.current`;

async function main() {
  console.log("Checking for existing seed documents...");
  const existingSlugs = new Set(
    (await client.fetch(SLUGS_QUERY)) as string[] | null
  );
  if (!Array.isArray(existingSlugs)) {
    console.error("Failed to fetch existing slugs");
    process.exit(1);
  }

  const counts = {
    investorEducationArticle: 0,
    investorEducationNews: 0,
    investorEducationVideoPodcast: 0,
  };

  const publishedAt = new Date().toISOString();

  for (const [type, items] of Object.entries(SAMPLES)) {
    for (const item of items) {
      if (existingSlugs.has(item.slug)) {
        console.log(`  Skip ${type} (slug "${item.slug}" already exists)`);
        continue;
      }

      const doc: Record<string, unknown> = {
        _type: type,
        title: item.title,
        slug: { _type: "slug", current: item.slug },
        publishedAt,
        excerpt: item.excerpt,
        author: "author" in item ? item.author : undefined,
        readingTime: "readingTime" in item ? item.readingTime : undefined,
        externalLink: "externalLink" in item ? item.externalLink : undefined,
        bodyHtml: "bodyHtml" in item ? item.bodyHtml : undefined,
      };

      const cleaned: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(doc)) {
        if (v !== undefined) cleaned[k] = v;
      }

      try {
        await client.create(cleaned);
        counts[type as keyof typeof counts]++;
        console.log(`  Created ${type}: ${item.title}`);
      } catch (e) {
        console.error(`  Failed to create ${type} "${item.slug}":`, e);
      }
    }
  }

  console.log("Done.");
  console.log("  Articles:", counts.investorEducationArticle);
  console.log("  News:", counts.investorEducationNews);
  console.log("  Videos & Podcasts:", counts.investorEducationVideoPodcast);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
