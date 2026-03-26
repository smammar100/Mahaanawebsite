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

/** Page H1, breadcrumb, and metadata title (matches Insights hub category labels). */
export const INSIGHTS_CATEGORY_HEADING: Record<InsightsCategory, string> = {
  Investing: "Investing",
  "Personal Finance": "Videos & Podcasts",
  "Market Views": "Latest News",
  Solutions: "Solutions",
  "Private Wealth": "Private Wealth",
};

/** One-line intro under the category title (until CMS fields exist). */
export const INSIGHTS_CATEGORY_DESCRIPTION: Record<InsightsCategory, string> = {
  Investing:
    "Guides, explainers, and ideas to help you invest with confidence on Mahaana.",
  "Personal Finance":
    "Videos, podcasts, and stories on budgeting, goals, and everyday money decisions.",
  "Market Views":
    "News, commentary, and updates on markets relevant to your portfolio.",
  Solutions:
    "Product updates, portfolio insights, and how our solutions can work for you.",
  "Private Wealth":
    "Deeper perspectives for sophisticated investors and long-term wealth planning.",
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
