import { sanityClient } from "./client";
import { urlFor } from "./image";
import {
  investorEducationsQuery,
  investorEducationsByCategoryQuery,
  investorEducationBySlugQuery,
  investorEducationSlugsQuery,
  latestInvestorEducationsQuery,
} from "./queries";
import type { SanityInvestorEducation } from "./types";

export interface BlogPostForSection {
  title: string;
  excerpt: string;
  authorName: string;
  authorImageUrl: string;
  readTime: string;
  imageUrl: string;
  href: string;
}

/** Fetch latest 3 investor education items and map to BlogSection shape. */
export async function getLatestBlogPosts(): Promise<BlogPostForSection[]> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId) return [];

  try {
    const raw = (await sanityClient.fetch(
      latestInvestorEducationsQuery
    )) as SanityInvestorEducation[] | null;
    if (!Array.isArray(raw) || raw.length === 0) return [];

    return raw.map((p) => ({
      title: p.title ?? "Untitled",
      excerpt: p.tldr ?? "",
      authorName: p.authorName ?? "Mahaana",
      authorImageUrl:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
      readTime: p.readingTime ?? "5 Min Read",
      imageUrl: p.thumbnailImage
        ? urlFor(p.thumbnailImage).width(800).height(450).url()
        : p.thumbnailImageUrl ?? "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-8-wide.svg",
      href: `/investor-education/${p.slug?.current ?? p._id}`,
    }));
  } catch {
    return [];
  }
}

/** Fetch all investor education items (optionally by category). */
export async function getInvestorEducations(
  category?: "Video" | "Article" | "News"
): Promise<SanityInvestorEducation[]> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId) return [];

  try {
    const raw = category
      ? ((await sanityClient.fetch(investorEducationsByCategoryQuery, {
          category,
        })) as SanityInvestorEducation[] | null)
      : ((await sanityClient.fetch(investorEducationsQuery)) as SanityInvestorEducation[] | null);
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}

/** Fetch single investor education by slug. */
export async function getInvestorEducationBySlug(
  slug: string
): Promise<SanityInvestorEducation | null> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId) return null;

  try {
    return (await sanityClient.fetch(investorEducationBySlugQuery, {
      slug,
    })) as SanityInvestorEducation | null;
  } catch {
    return null;
  }
}

/** All investor education slugs for static params. */
export async function getInvestorEducationSlugs(): Promise<string[]> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId) return [];

  try {
    const slugs = (await sanityClient.fetch(
      investorEducationSlugsQuery
    )) as string[] | null;
    return Array.isArray(slugs) ? slugs : [];
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

/** Stub: Fund documents no longer in Sanity; returns empty array. */
export async function getFundDocuments(_fund: FundId): Promise<
  { title?: string | null; fileUrl?: string | null; category?: string | null }[]
> {
  return [];
}
