/** Shapes returned by GROQ for app use (minimal types; extend as needed).
 * For investor education, category is derived in fetch from _type (Article, News, Video).
 */
export type SanityInvestorEducationType =
  | "investorEducationArticle"
  | "investorEducationNews"
  | "investorEducationVideoPodcast";

export interface SanityInvestorEducation {
  _id: string;
  _type: SanityInvestorEducationType;
  /** ISO date when the document was created in Sanity (for "latest added" ordering) */
  _createdAt?: string | null;
  /** Derived in fetch from _type: Article | News | Video */
  category?: "Video" | "Article" | "News" | null;
  title: string | null;
  slug: { current: string } | null;
  publishedAt?: string | null;
  excerpt?: string | null;
  thumbnail?: { _type: string; asset?: { _ref: string }; [key: string]: unknown } | null;
  thumbnailUrl?: string | null;
  externalLink?: string | null;
  author?: string | null;
  readingTime?: string | null;
  bodyHtml?: unknown;
}

export interface SanityFundDocument {
  _id: string;
  title: string | null;
  fileUrl: string | null;
  fund: string | null;
  category: string | null;
  publishDate: string | null;
}

export interface SanityFaq {
  _id: string;
  question: string | null;
  answer: string | null;
  category: string | null;
}
