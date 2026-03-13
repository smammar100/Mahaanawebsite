import type { Metadata } from "next";
import Image from "next/image";
import { buildPageMetadata } from "@/lib/metadata";
import { getReviews } from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/image";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Container } from "@/components/layout/Container";
import { H1, TextRegular } from "@/components/ui/Typography";

export const metadata: Metadata = buildPageMetadata({
  title: "Reviews | Mahaana",
  description: "See what our users say about Mahaana.",
  path: "reviews",
});

export default async function ReviewsPage() {
  const reviews = await getReviews();

  return (
    <div className="bg-surface-bg">
      <AnimatedSection className="py-12 sm:py-16 lg:py-24">
        <Container>
          <H1 className="text-text-primary">Reviews</H1>
          <TextRegular className="mt-4 max-w-prose text-text-secondary">
            See what our users say about Mahaana.
          </TextRegular>
        </Container>
      </AnimatedSection>

      {reviews.length > 0 ? (
        <AnimatedSection className="border-t border-surface-stroke py-8 sm:py-10 md:py-12">
          <Container>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review) => {
                const authorImageUrl = review.authorImage
                  ? urlFor(review.authorImage).width(96).height(96).url()
                  : null;
                return (
                  <div
                    key={review._id}
                    className="rounded-xl border border-surface-stroke bg-surface-card p-6 dark:bg-surface-card"
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
                    <blockquote className="font-body text-regular leading-[150%] text-text-secondary">
                      &ldquo;{review.quote ?? ""}&rdquo;
                    </blockquote>
                    <div className="mt-5 flex items-center gap-3 border-t border-surface-stroke pt-4">
                      {authorImageUrl ? (
                        <div className="relative size-10 shrink-0 overflow-hidden rounded-full ring-1 ring-input">
                          <Image
                            src={authorImageUrl}
                            alt={review.authorName ? `Photo of ${review.authorName}` : "Review author"}
                            fill
                            className="object-cover"
                            sizes="40px"
                          />
                        </div>
                      ) : null}
                      <div className="min-w-0">
                        <p className="font-body text-regular font-semibold text-text-primary">
                          {review.authorName ?? "Anonymous"}
                        </p>
                        {review.source ? (
                          <p className="font-body text-small text-text-tertiary">
                            {review.source}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        </AnimatedSection>
      ) : (
        <AnimatedSection className="border-t border-surface-stroke py-12">
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
