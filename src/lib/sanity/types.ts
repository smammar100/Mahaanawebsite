/** Shapes returned by GROQ for app use (minimal types; extend as needed).
 * For investor education, display category comes from categoryLabel when set, else derived from _type.
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
  /** Optional display category for tabs/filtering; when set, used instead of type-based default */
  categoryLabel?: string | null;
  /** Derived in fetch from _type: Article | News | Video (for tag/badge) */
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

export interface SanityLegalDocument {
  _id: string;
  title: string | null;
  fileUrl: string | null;
}

export interface SanityJob {
  _id: string;
  title: string | null;
  slug: { current: string } | null;
  department: string | null;
  location: string | null;
  employmentType?: string | null;
  isOpen?: boolean | null;
  publishedAt?: string | null;
  aboutMahaana?: string | null;
  roleOverview?: string | null;
  keyResponsibilities?: unknown;
  requirements?: unknown;
  preferredQualifications?: unknown;
  benefits?: unknown;
}
