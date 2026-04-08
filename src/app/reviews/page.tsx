import type { Metadata } from "next";
import Image from "next/image";
import { buildPageMetadata } from "@/lib/metadata";
import { getReviews } from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/image";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Container } from "@/components/layout/Container";
import { H1, TextRegular } from "@/components/ui/Typography";
import { cleanCopy } from "@/lib/copy-utils";

export const metadata: Metadata = buildPageMetadata({
  title: "Reviews | Mahaana",
  description: "See what our users say about Mahaana.",
  path: "reviews",
});

export default async function ReviewsPage() {
  const reviews = await getReviews();

  return (
    <div className="bg-surface-bg">
      <AnimatedSection className="section-y">
        <Container>
          <H1 className="text-text-primary">Reviews</H1>
          <TextRegular className="mt-4 max-w-prose text-text-tertiary">
            {cleanCopy("See what our users say about Mahaana.")}
          </TextRegular>
        </Container>
      </AnimatedSection>

      {reviews.length > 0 ? (
        <AnimatedSection className="section-y">
          <Container>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review) => {
                const authorImageUrl = review.authorImage
                  ? urlFor(review.authorImage).width(96).height(96).url()
                  : null;
                const avatarUrl =
                  typeof review.avatarUrl === "string" && review.avatarUrl.trim()
                    ? review.avatarUrl.trim()
                    : null;
                const avatarSrc = authorImageUrl ?? avatarUrl;
                return (
                  <div
                    key={review._id}
                    className="flex h-full min-h-0 flex-col rounded-xl border border-surface-stroke bg-surface-card p-6 dark:bg-surface-card"
                  >
                    {review.rating != null ? (
                      <div className="mb-3 flex gap-0.5" aria-label={`Rating: ${review.rating} out of 5`}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={
                              star <= (review.rating ?? 0)
                                ? "text-amber-500"
                                : "text-gray-200 dark:text-gray-600"
                            }
                            aria-hidden
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    ) : null}
                    <blockquote className="line-clamp-5 min-h-[7.5rem] flex-1 overflow-hidden leading-relaxed text-text-tertiary">
                      &ldquo;{cleanCopy(review.quote ?? "")}&rdquo;
                    </blockquote>
                    <div className="mt-5 flex shrink-0 items-center gap-3 border-t border-surface-stroke pt-4">
                      {avatarSrc ? (
                        <div className="relative size-10 shrink-0 overflow-hidden rounded-full ring-1 ring-input">
                          <Image
                            src={avatarSrc}
                            alt={review.authorName ? `Photo of ${review.authorName}` : "Review author"}
                            fill
                            className="object-cover"
                            sizes="40px"
                          />
                        </div>
                      ) : null}
                      <div className="min-w-0">
                        <p className="text-text-primary">
                          {review.authorName ?? "Anonymous"}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        </AnimatedSection>
      ) : (
        <AnimatedSection className="section-y">
          <Container>
            <TextRegular className="text-text-tertiary">
              No reviews yet. Check back soon.
            </TextRegular>
          </Container>
        </AnimatedSection>
      )}
    </div>
  );
}
