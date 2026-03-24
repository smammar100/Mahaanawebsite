import { sanityClient } from "./client";
import { urlFor } from "./image";
import {
  investorEducationsQuery,
  investorEducationsByTypeQuery,
  investorEducationBySlugQuery,
  investorEducationSlugsQuery,
  investorEducationSitemapQuery,
  latestInvestorEducationsQuery,
  fundDocumentsQuery,
  faqsQuery,
  legalDocumentsQuery,
} from "./queries";
import type {
  SanityInvestorEducation,
  SanityInvestorEducationType,
  SanityFundDocument,
  SanityFaq,
  SanityLegalDocument,
} from "./types";
import {
  DEFAULT_ARTICLE_AUTHOR,
  formatArticleReadTime,
  sanitizeArticleAuthorName,
} from "@/lib/formatters";

/** Map Sanity _type to app category for tabs and CTA. */
function typeToCategory(
  _type: SanityInvestorEducationType
): "Video" | "Article" | "News" {
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

/** Map app category to Sanity _type for filtered fetch. */
function categoryToType(
  category: "Video" | "Article" | "News"
): SanityInvestorEducationType {
  switch (category) {
    case "Video":
      return "investorEducationVideoPodcast";
    case "News":
      return "investorEducationNews";
    case "Article":
      return "investorEducationArticle";
  }
}

function withCategory(
  item: Omit<SanityInvestorEducation, "category"> & { _type: SanityInvestorEducationType }
): SanityInvestorEducation {
  return { ...item, category: typeToCategory(item._type) };
}

export interface BlogPostForSection {
  title: string;
  excerpt: string;
  authorName: string;
  authorImageUrl: string;
  readTime: string;
  imageUrl: string;
  href: string;
  isVideo: boolean;
  isNews: boolean;
}

function mapToBlogPostForSection(
  p: SanityInvestorEducation & { _type: SanityInvestorEducationType }
): BlogPostForSection {
  return {
    title: p.title ?? "Untitled",
    excerpt: p.excerpt ?? "",
    authorName: sanitizeArticleAuthorName(p.author) || DEFAULT_ARTICLE_AUTHOR,
    authorImageUrl:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
    readTime: formatArticleReadTime(p.readingTime),
    imageUrl: p.thumbnail
      ? urlFor(p.thumbnail).width(800).height(450).url()
      : p.thumbnailUrl ?? "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-8-wide.svg",
    href: `/investor-education/${p.slug?.current ?? p._id}`,
    isVideo: p._type === "investorEducationVideoPodcast",
    isNews: p._type === "investorEducationNews",
  };
}

/** Fetch latest 3 investor education items and map to BlogSection shape. */
export async function getLatestBlogPosts(): Promise<BlogPostForSection[]> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId) return [];

  try {
    const raw = (await sanityClient.fetch(
      latestInvestorEducationsQuery
    )) as (SanityInvestorEducation & { _type: SanityInvestorEducationType })[] | null;
    if (!Array.isArray(raw) || raw.length === 0) return [];

    return raw.map(mapToBlogPostForSection);
  } catch {
    return [];
  }
}

/** Fetch latest 3 news items (investorEducationNews only) for BlogSection shape. */
export async function getLatestNewsPosts(): Promise<BlogPostForSection[]> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId) return [];

  try {
    type Raw = SanityInvestorEducation & { _type: SanityInvestorEducationType };
    const raw = (await sanityClient.fetch(investorEducationsByTypeQuery, {
      type: "investorEducationNews",
    })) as Raw[] | null;
    const list = Array.isArray(raw) ? raw.slice(0, 3) : [];
    return list.map(mapToBlogPostForSection);
  } catch {
    return [];
  }
}

/** Fetch all investor education items (optionally by category). Category is derived from _type. */
export async function getInvestorEducations(
  category?: "Video" | "Article" | "News"
): Promise<SanityInvestorEducation[]> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId) return [];

  try {
    type Raw = Omit<SanityInvestorEducation, "category"> & { _type: SanityInvestorEducationType };
    const raw = category
      ? ((await sanityClient.fetch(investorEducationsByTypeQuery, {
          type: categoryToType(category),
        })) as Raw[] | null)
      : ((await sanityClient.fetch(investorEducationsQuery)) as Raw[] | null);
    const list = Array.isArray(raw) ? raw : [];
    return list.map(withCategory);
  } catch {
    return [];
  }
}

/** Fetch single investor education by slug. Returns item with category derived from _type. */
export async function getInvestorEducationBySlug(
  slug: string
): Promise<SanityInvestorEducation | null> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId) return null;

  try {
    type Raw = Omit<SanityInvestorEducation, "category"> & { _type: SanityInvestorEducationType };
    const raw = (await sanityClient.fetch(investorEducationBySlugQuery, {
      slug,
    })) as Raw | null;
    return raw ? withCategory(raw) : null;
  } catch {
    return null;
  }
}

/** All investor education slugs for static params (unique across all three types). */
export async function getInvestorEducationSlugs(): Promise<string[]> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId) return [];

  try {
    const slugs = (await sanityClient.fetch(
      investorEducationSlugsQuery
    )) as string[] | null;
    const list = Array.isArray(slugs) ? slugs : [];
    return [...new Set(list)];
  } catch {
    return [];
  }
}

export interface InvestorEducationSitemapEntry {
  slug: string;
  lastModified: string;
}

/** Investor education entries for sitemap (slug + lastmod from Sanity). */
export async function getInvestorEducationSitemapEntries(): Promise<InvestorEducationSitemapEntry[]> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId) return [];

  try {
    const raw = (await sanityClient.fetch(
      investorEducationSitemapQuery
    )) as { slug: string; lastModified: string }[] | null;
    if (!Array.isArray(raw)) return [];
    return raw.filter((r) => r?.slug);
  } catch {
    return [];
  }
}

/** Help Center FAQ item (question, answer, category). */
export interface HelpCenterFaqItem {
  question: string;
  answer: string;
  category: string;
}

/** Fetch all Help Center FAQs from Sanity, ordered by category. */
export async function getHelpCenterFaqs(): Promise<HelpCenterFaqItem[]> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId) return [];

  try {
    const raw = (await sanityClient.fetch(faqsQuery)) as SanityFaq[] | null;
    if (!Array.isArray(raw)) return [];
    return raw
      .filter((d) => d.question && d.answer && d.category)
      .map((d) => ({
        question: d.question!,
        answer: d.answer!,
        category: d.category!,
      }));
  } catch {
    return [];
  }
}

/** Stub: Reviews no longer in Sanity; returns empty array. */
export async function getReviews(): Promise<
  { _id: string; quote?: string | null; authorName?: string | null; authorImage?: unknown; rating?: number | null; source?: string | null }[]
> {
  return [];
}

export type FaqProduct = "micf" | "miietf" | "miirf" | "save-plus" | "retirement";

export interface FaqItemForSection {
  question: string;
  answer: string;
}

/** Stub: FAQs no longer in Sanity; returns empty array. */
export async function getFaqByProduct(
  _product: FaqProduct
): Promise<FaqItemForSection[]> {
  return [];
}

export type FundId = "micf" | "miietf" | "miirf";

export interface FundDocumentForSection {
  title: string;
  fileUrl: string | null;
  category: string;
  publishDate: string | null;
}

/** Fetch fund documents for a fund (MICF, MIIETF, MIIRF), ordered by publishDate desc. */
export async function getFundDocuments(
  fund: FundId
): Promise<FundDocumentForSection[]> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId) return [];

  try {
    const raw = (await sanityClient.fetch(fundDocumentsQuery, {
      fund,
    })) as SanityFundDocument[] | null;
    if (!Array.isArray(raw)) return [];
    const result = raw.map((d) => ({
      title: d.title ?? "",
      fileUrl: d.fileUrl ?? null,
      category: d.category ?? "",
      publishDate: d.publishDate ?? null,
    }));
    if (process.env.NODE_ENV === "development" && result.length === 0) {
      console.warn(
        `getFundDocuments("${fund}"): no documents returned. Check NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, and SANITY_API_READ_TOKEN (if dataset is private).`
      );
    }
    if (process.env.NODE_ENV === "development" && result.length > 0) {
      console.log(`getFundDocuments("${fund}"): ${result.length} document(s) returned.`);
    }
    return result;
  } catch (e) {
    if (process.env.NODE_ENV === "development") {
      console.error("getFundDocuments failed:", e);
    }
    return [];
  }
}

export interface LegalDocumentForSection {
  _id: string;
  title: string;
  fileUrl: string | null;
}

/** Fetch all legal documents from Sanity (Legal Documents schema), ordered by _createdAt asc. */
export async function getLegalDocuments(): Promise<LegalDocumentForSection[]> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId) return [];

  try {
    const raw = (await sanityClient.fetch(
      legalDocumentsQuery
    )) as SanityLegalDocument[] | null;
    if (!Array.isArray(raw)) return [];
    return raw.map((d) => ({
      _id: d._id,
      title: d.title ?? "",
      fileUrl: d.fileUrl ?? null,
    }));
  } catch (e) {
    if (process.env.NODE_ENV === "development") {
      console.error("getLegalDocuments failed:", e);
    }
    return [];
  }
}
