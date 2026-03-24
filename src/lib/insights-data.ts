/**
 * Maps Sanity investor education documents to Insights page shape and splits
 * into featured, most popular, and per-section lists.
 */

import { urlFor } from "@/lib/sanity/image";
import {
  DEFAULT_ARTICLE_AUTHOR,
  formatArticleReadTime,
  sanitizeArticleAuthorName,
} from "@/lib/formatters";
import type {
  SanityInvestorEducation,
  SanityInvestorEducationType,
} from "@/lib/sanity/types";

const PLACEHOLDER_IMAGE =
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-8-wide.svg";

/** Display category for Insights tabs and grid sections (from categoryLabel or derived from _type). */
export type InsightsCategory =
  | "Investing"
  | "Personal Finance"
  | "Market Views"
  | "Solutions"
  | "Private Wealth";

const INSIGHTS_CATEGORY_VALUES: InsightsCategory[] = [
  "Investing",
  "Personal Finance",
  "Market Views",
  "Solutions",
  "Private Wealth",
];

function isInsightsCategory(value: string | null | undefined): value is InsightsCategory {
  return typeof value === "string" && INSIGHTS_CATEGORY_VALUES.includes(value as InsightsCategory);
}

/** Single article card shape for Insights UI. */
export interface InsightsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: InsightsCategory;
  tag: string;
  /** Display author (CMS or default). */
  authorName: string;
  readTime: string;
  imageUrl: string;
  href: string;
  openExternal?: boolean;
}

/** Mapped data for the Insights page. */
export interface InsightsPageData {
  featuredArticles: InsightsArticle[];
  mostPopularArticles: InsightsArticle[];
  investingArticles: InsightsArticle[];
  personalFinanceArticles: InsightsArticle[];
  marketViewsArticles: InsightsArticle[];
  allArticles: InsightsArticle[];
}

function typeToInsightsCategory(
  _type: SanityInvestorEducationType
): InsightsCategory {
  switch (_type) {
    case "investorEducationArticle":
      return "Investing";
    case "investorEducationNews":
      return "Market Views";
    case "investorEducationVideoPodcast":
      return "Personal Finance";
    default:
      return "Investing";
  }
}

function typeToTag(_type: SanityInvestorEducationType): string {
  switch (_type) {
    case "investorEducationArticle":
      return "Article";
    case "investorEducationNews":
      return "News";
    case "investorEducationVideoPodcast":
      return "Video";
    default:
      return "Article";
  }
}

function mapToInsightsArticle(item: SanityInvestorEducation): InsightsArticle {
  const slug = item.slug?.current ?? item._id;
  const category = isInsightsCategory(item.categoryLabel)
    ? item.categoryLabel
    : typeToInsightsCategory(item._type);
  const tag = typeToTag(item._type);
  const isExternal =
    (item.category === "Video" || item.category === "News") &&
    item.externalLink?.startsWith("http");
  const href = isExternal
    ? item.externalLink!
    : `/investor-education/${slug}`;
  const imageUrl =
    item.thumbnail != null
      ? urlFor(item.thumbnail).width(800).height(450).url()
      : item.thumbnailUrl ?? PLACEHOLDER_IMAGE;
  const authorName =
    sanitizeArticleAuthorName(item.author) || DEFAULT_ARTICLE_AUTHOR;

  return {
    id: item._id,
    slug,
    title: item.title ?? "Untitled",
    excerpt: item.excerpt ?? "",
    category,
    tag,
    authorName,
    readTime: formatArticleReadTime(item.readingTime),
    imageUrl,
    href,
    openExternal: isExternal || undefined,
  };
}

/**
 * Converts Sanity investor education list to Insights shape and splits into
 * featured (latest 4 added), most popular (latest 4 news only), and per-section arrays.
 * Featured section explicitly uses the 4 most recently added items (_createdAt desc, then publishedAt desc).
 */
export function mapSanityToInsightsPageData(
  items: SanityInvestorEducation[]
): InsightsPageData {
  const byLatestAdded = [...items].sort((a, b) => {
    const aCreated = a._createdAt ?? "";
    const bCreated = b._createdAt ?? "";
    if (bCreated !== aCreated) return bCreated.localeCompare(aCreated);
    const aPub = a.publishedAt ?? "";
    const bPub = b.publishedAt ?? "";
    return bPub.localeCompare(aPub);
  });
  const all = byLatestAdded.map(mapToInsightsArticle);
  const featured = all.slice(0, 4);
  const newsItems = items.filter(
    (i) => i._type === "investorEducationNews"
  );
  const latestNews = [...newsItems].sort((a, b) => {
    const aPub = a.publishedAt ?? "";
    const bPub = b.publishedAt ?? "";
    if (bPub !== aPub) return bPub.localeCompare(aPub);
    const aCreated = a._createdAt ?? "";
    const bCreated = b._createdAt ?? "";
    return bCreated.localeCompare(aCreated);
  });
  const mostPopular = latestNews.slice(0, 4).map(mapToInsightsArticle);
  const investing = all.filter((a) => a.category === "Investing");
  const personalFinance = all.filter(
    (a) => a.category === "Personal Finance"
  );
  const marketViews = all.filter((a) => a.category === "Market Views");

  return {
    featuredArticles: featured,
    mostPopularArticles: mostPopular,
    investingArticles: investing.slice(0, 3),
    personalFinanceArticles: personalFinance.slice(0, 3),
    marketViewsArticles: marketViews.slice(0, 3),
    allArticles: all,
  };
}
