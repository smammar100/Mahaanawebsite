/** Shapes returned by GROQ for app use (minimal types; extend as needed). */

export interface SanityAuthor {
  _id?: string;
  name?: string | null;
  image?: { _type: string; asset?: { _ref: string }; [key: string]: unknown } | null;
  role?: string | null;
}

export interface SanityPost {
  _id: string;
  title: string | null;
  slug: { current: string } | null;
  type?: "blog" | "news" | "video";
  excerpt?: string | null;
  mainImage?: { _type: string; asset?: { _ref: string }; [key: string]: unknown } | null;
  body?: unknown;
  videoUrl?: string | null;
  author?: SanityAuthor | null;
  readTime?: string | null;
  publishedAt?: string | null;
}

export interface SanityReview {
  _id: string;
  quote?: string | null;
  authorName?: string | null;
  authorImage?: { _type: string; asset?: { _ref: string }; [key: string]: unknown } | null;
  rating?: number | null;
  source?: string | null;
  order?: number | null;
}

export interface SanityFaqItem {
  _id: string;
  question?: string | null;
  answer?: string | null;
  product?: string | null;
  order?: number | null;
}

export interface SanityFundDocument {
  _id: string;
  title?: string | null;
  fileUrl?: string | null;
  category?: string | null;
  fund?: string | null;
  order?: number | null;
}
