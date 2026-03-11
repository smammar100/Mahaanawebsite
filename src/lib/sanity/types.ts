/** Shapes returned by GROQ for app use (minimal types; extend as needed). */

export interface SanityInvestorEducation {
  _id: string;
  title: string | null;
  slug: { current: string } | null;
  priority?: number | null;
  category?: "Video" | "Article" | "News" | null;
  thumbnailImage?: { _type: string; asset?: { _ref: string }; [key: string]: unknown } | null;
  thumbnailImageUrl?: string | null;
  tldr?: string | null;
  cta?: string | null;
  link?: string | null;
  blogBodyText?: unknown;
  readingTime?: string | null;
  authorName?: string | null;
}
