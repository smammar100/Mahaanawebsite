import { cleanCopy } from "@/lib/copy-utils";

/** ~chars per line for testimonial cards in the home grid (similar width to card body text). */
const TESTIMONIAL_QUOTE_CHARS_PER_LINE_ESTIMATE = 52;

export function estimatedTestimonialQuoteLines(
  quote: string | null | undefined
): number {
  const text = cleanCopy(quote ?? "").trim();
  if (!text) return 0;
  return Math.ceil(text.length / TESTIMONIAL_QUOTE_CHARS_PER_LINE_ESTIMATE);
}

/** Non-empty avatar URL (remote image), not initials-only fallback. */
export function reviewHasAvatarImage(avatarUrl: string | null | undefined): boolean {
  return typeof avatarUrl === "string" && avatarUrl.trim().length > 0;
}

/**
 * Home testimonial grid: real Play Store / remote avatars only, and quotes long enough
 * to fill ~4+ lines in the card (ignores very short blurbs).
 */
export function reviewQualifiesForTestimonialGrid(
  review: {
    avatarUrl?: string | null;
    quote?: string | null;
  },
  minEstimatedLines = 4
): boolean {
  if (!reviewHasAvatarImage(review.avatarUrl)) return false;
  return estimatedTestimonialQuoteLines(review.quote) >= minEstimatedLines;
}
