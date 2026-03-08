import type { Metadata } from "next";

/** Base URL for canonical and Open Graph. Must match layout metadataBase. */
export const SITE_URL = "https://mahaana.netlify.app";

/** Default OG image used when no page-specific image is set. */
const defaultOgImage = {
  url: "/images/invest/hero-bg.jpg",
  width: 1200,
  height: 630,
  alt: "Mahaana Investment Platform",
} as const;

export type PageMetadataInput = {
  /** Page title (e.g. "About | Mahaana"). */
  title: string;
  /** Meta description for SEO and social. */
  description: string;
  /** Path without leading slash (e.g. "about", "retirement-calculator"). Empty string = home. */
  path?: string;
  /** Optional OG image override. */
  openGraph?: {
    images?: Array<{ url: string; width?: number; height?: number; alt?: string }>;
  };
  /** If true, set robots noindex (e.g. for style-guide). Default false. */
  noIndex?: boolean;
};

/**
 * Builds Next.js Metadata for a page. Use on every page for Lighthouse SEO:
 * - meta description
 * - Open Graph (title, description, url, image)
 * - Twitter card
 * - canonical URL
 */
export function buildPageMetadata({
  title,
  description,
  path = "",
  openGraph,
  noIndex = false,
}: PageMetadataInput): Metadata {
  const canonicalPath = path ? `/${path}` : "/";
  const canonical = `${SITE_URL}${canonicalPath}`;
  const rawImages = openGraph?.images ?? [defaultOgImage];
  const ogImages = rawImages.map((img) => ({
    ...img,
    url: img.url.startsWith("http") ? img.url : `${SITE_URL}${img.url}`,
  }));

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: canonical,
      siteName: "Mahaana",
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: noIndex ? { index: false, follow: true } : { index: true, follow: true },
    alternates: { canonical },
  };
}
