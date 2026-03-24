import type { InsightsCategory } from "@/lib/insights-data";

/** URL segment under `/investor-education/category/[slug]`. */
export const INSIGHTS_CATEGORY_SLUGS = [
  "articles",
  "videos-and-podcast",
  "latest-news",
  "solutions",
  "private-wealth",
] as const;

export type InsightsCategorySlug = (typeof INSIGHTS_CATEGORY_SLUGS)[number];

const SLUG_TO_CATEGORY: Record<InsightsCategorySlug, InsightsCategory> = {
  articles: "Investing",
  "videos-and-podcast": "Personal Finance",
  "latest-news": "Market Views",
  solutions: "Solutions",
  "private-wealth": "Private Wealth",
};

const CATEGORY_TO_SLUG: Record<InsightsCategory, InsightsCategorySlug> = {
  Investing: "articles",
  "Personal Finance": "videos-and-podcast",
  "Market Views": "latest-news",
  Solutions: "solutions",
  "Private Wealth": "private-wealth",
};

/** Section / page heading (matches Insights hub labels). */
export const INSIGHTS_CATEGORY_HEADING: Record<InsightsCategory, string> = {
  Investing: "Articles",
  "Personal Finance": "Videos and Podcast",
  "Market Views": "Latest News",
  Solutions: "Solutions",
  "Private Wealth": "Private Wealth",
};

export function isInsightsCategorySlug(
  slug: string
): slug is InsightsCategorySlug {
  return (INSIGHTS_CATEGORY_SLUGS as readonly string[]).includes(slug);
}

export function insightsCategoryFromSlug(
  slug: string
): InsightsCategory | null {
  if (!isInsightsCategorySlug(slug)) return null;
  return SLUG_TO_CATEGORY[slug];
}

export function insightsCategoryToSlug(
  category: InsightsCategory
): InsightsCategorySlug {
  return CATEGORY_TO_SLUG[category];
}

export function insightsCategoryViewAllPath(category: InsightsCategory): string {
  return `/investor-education/category/${insightsCategoryToSlug(category)}`;
}
