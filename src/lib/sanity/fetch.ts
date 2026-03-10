import { sanityClient } from "./client";
import { urlFor } from "./image";
import {
  latestBlogPostsQuery,
  postBySlugQuery,
  postsByTypeQuery,
  postsQuery,
  postSlugsQuery,
  reviewsQuery,
  faqByProductQuery,
  fundDocumentsQuery,
} from "./queries";
import type {
  SanityFaqItem,
  SanityFundDocument,
  SanityPost,
  SanityReview,
} from "./types";

export interface BlogPostForSection {
  title: string;
  excerpt: string;
  authorName: string;
  authorImageUrl: string;
  readTime: string;
  imageUrl: string;
  href: string;
}

/** Fetch latest 3 blog posts and map to BlogSection shape. Returns empty array if Sanity not configured or fetch fails. */
export async function getLatestBlogPosts(): Promise<BlogPostForSection[]> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId) return [];

  try {
    const raw = (await sanityClient.fetch(latestBlogPostsQuery)) as SanityPost[] | null;
    if (!Array.isArray(raw) || raw.length === 0) return [];

    return raw.map((p) => ({
      title: p.title ?? "Untitled",
      excerpt: p.excerpt ?? "",
      authorName: p.author?.name ?? "Mahaana",
      authorImageUrl: p.author?.image
        ? urlFor(p.author.image).width(96).height(96).url()
        : "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
      readTime: p.readTime ?? "5 Min Read",
      imageUrl: p.mainImage
        ? urlFor(p.mainImage).width(800).height(450).url()
        : "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-8-wide.svg",
      href: `/investor-education/${p.slug?.current ?? p._id}`,
    }));
  } catch {
    return [];
  }
}

/** Fetch all posts for investor education list (optionally by type). */
export async function getPosts(type?: "blog" | "news" | "video") {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId) return [];

  try {
    const raw = type
      ? ((await sanityClient.fetch(postsByTypeQuery, { type })) as SanityPost[] | null)
      : ((await sanityClient.fetch(postsQuery)) as SanityPost[] | null);
    if (!Array.isArray(raw)) return [];
    return raw;
  } catch {
    return [];
  }
}

/** Fetch single post by slug. */
export async function getPostBySlug(slug: string): Promise<SanityPost | null> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId) return null;

  try {
    return (await sanityClient.fetch(postBySlugQuery, { slug })) as SanityPost | null;
  } catch {
    return null;
  }
}

/** All post slugs for static params. */
export async function getPostSlugs(): Promise<string[]> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId) return [];

  try {
    const slugs = (await sanityClient.fetch(postSlugsQuery)) as string[] | null;
    return Array.isArray(slugs) ? slugs : [];
  } catch {
    return [];
  }
}

/** Fetch published reviews for the reviews page. */
export async function getReviews(): Promise<SanityReview[]> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId) return [];

  try {
    const raw = (await sanityClient.fetch(reviewsQuery)) as SanityReview[] | null;
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}

export type FaqProduct = "micf" | "miietf" | "miirf" | "save-plus" | "retirement";

export interface FaqItemForSection {
  question: string;
  answer: string;
}

/** Fetch FAQ items by product for MICF, MIIETF, MIIRF, Save+, Retirement pages. */
export async function getFaqByProduct(
  product: FaqProduct
): Promise<FaqItemForSection[]> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId) return [];

  try {
    const raw = (await sanityClient.fetch(faqByProductQuery, {
      product,
    })) as SanityFaqItem[] | null;
    if (!Array.isArray(raw)) return [];
    return raw.map((item) => ({
      question: item.question ?? "",
      answer: item.answer ?? "",
    }));
  } catch {
    return [];
  }
}

export type FundId = "micf" | "miietf" | "miirf";

/** Fetch fund documents for a fund (MICF, MIIETF, MIIRF). Group by category in the section. */
export async function getFundDocuments(
  fund: FundId
): Promise<SanityFundDocument[]> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId) return [];

  try {
    const raw = (await sanityClient.fetch(fundDocumentsQuery, {
      fund,
    })) as SanityFundDocument[] | null;
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}
