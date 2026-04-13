"use client";

import Image from "next/image";
import { useMemo } from "react";
import { Zap } from "@untitledui/icons";

import { Container } from "@/components/layout/Container";
import { H3, TextRegular } from "@/components/ui/Typography";
import { useInView } from "@/hooks/useInView";
import type { ReviewForDisplay } from "@/lib/sanity/fetch";
import { cleanCopy } from "@/lib/copy-utils";
import { reviewQualifiesForTestimonialGrid } from "@/lib/review-quote-display";
import { cn } from "@/lib/utils";
import { cx } from "@/utils/cx";

interface TestimonialsSectionProps {
  reviews: ReviewForDisplay[];
  className?: string;
}

/** Max testimonials in the 3×3 grid */
const GRID_SIZE = 9;

/** Single light-grey card style (solid, no variant rotation). */
const testimonialCardClassName = cn(
  "border border-gray-200 bg-gray-100 shadow-sm",
  "dark:border-gray-700 dark:bg-gray-900"
);
const testimonialQuoteClassName = cn(
  "text-gray-700 dark:text-gray-300"
);
const testimonialNameClassName = cn("text-gray-900 dark:text-white");

export function TestimonialsSection({
  reviews,
  className,
}: TestimonialsSectionProps) {
  const { ref, isVisible } = useInView(0.15);
  const gridReviews = useMemo(
    () =>
      reviews
        .filter((r) => reviewQualifiesForTestimonialGrid(r, 4))
        .slice(0, GRID_SIZE),
    [reviews]
  );

  return (
    <section
      ref={ref}
      className={cx(
        "section-fade-in-up section-y",
        isVisible && "visible",
        className
      )}
      aria-labelledby="testimonials-heading"
    >
      <Container className="flex flex-col gap-6 sm:gap-8 lg:gap-10">
        {reviews.length > 0 ? (
          <div className="flex w-full flex-col gap-6 sm:gap-8">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1">
                  <Zap
                    className="size-6 shrink-0 fill-primary-200 text-primary-200"
                    aria-hidden
                  />
                  <p
                    className="text-label text-system-brand"
                    style={{
                      textShadow:
                        "0 1px 2px color-mix(in srgb, var(--color-system-brand) 20%, transparent), 0 0 12px color-mix(in srgb, var(--color-system-brand) 12%, transparent)",
                    }}
                  >
                    {cleanCopy("Rated 4.5 stars by 20K+ Pakistanis")}
                  </p>
                </div>
                <H3
                  id="testimonials-heading"
                  className="text-text-primary w-full max-w-3xl"
                >
                  Meet our happy investors
                </H3>
              </div>
              <TextRegular className="max-w-2xl text-text-tertiary">
                {cleanCopy(
                  "Join a growing community of smart savers, professionals, and everyday Pakistanis who trust Mahaana to secure their financial future."
                )}
              </TextRegular>
            </div>

            {gridReviews.length === 0 ? (
              <TextRegular className="text-text-tertiary">
                {cleanCopy(
                  "No reviews yet — check back when more investor stories are available."
                )}
              </TextRegular>
            ) : (
            <ul
              className="grid list-none grid-cols-1 gap-2 p-0 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 lg:gap-3"
              role="list"
            >
              {gridReviews.map((review) => {
                const name = review.authorName?.trim() || "Anonymous";
                const avatar = review.avatarUrl!.trim();
                return (
                  <li key={review._id} className="min-h-0">
                    <div
                      className={cn(
                        "relative flex h-full min-h-[17.5rem] flex-col justify-between overflow-hidden rounded-lg p-5",
                        "sm:min-h-[18.5rem] sm:p-6",
                        testimonialCardClassName
                      )}
                    >
                      <article className="relative z-[1] flex min-h-0 flex-1 flex-col justify-between gap-4">
                        <q
                          className={cn(
                            "line-clamp-5 min-h-0 not-italic",
                            "text-sm leading-relaxed sm:text-base sm:leading-relaxed",
                            testimonialQuoteClassName
                          )}
                        >
                          {cleanCopy(review.quote ?? "")}
                        </q>
                        <div
                          className={cn(
                            "flex shrink-0 items-end justify-between gap-3 pt-2",
                            "sm:gap-4 sm:pt-5"
                          )}
                        >
                          <div className="min-w-0 flex-1 text-left">
                            <p
                              className={cn(
                                "font-semibold leading-snug",
                                "text-sm sm:text-base lg:text-lg",
                                testimonialNameClassName
                              )}
                            >
                              {name}
                            </p>
                          </div>
                          <Image
                            src={avatar}
                            alt={name ? `Photo of ${name}` : "Reviewer"}
                            width={64}
                            height={64}
                            className={cn(
                              "h-12 w-12 shrink-0 rounded-xl object-cover",
                              "sm:h-14 sm:w-14 lg:h-16 lg:w-16"
                            )}
                          />
                        </div>
                      </article>
                    </div>
                  </li>
                );
              })}
            </ul>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1">
                <Zap
                  className="size-6 shrink-0 fill-primary-200 text-primary-200"
                  aria-hidden
                />
                <p
                  className="text-label text-system-brand"
                  style={{
                    textShadow:
                      "0 1px 2px color-mix(in srgb, var(--color-system-brand) 20%, transparent), 0 0 12px color-mix(in srgb, var(--color-system-brand) 12%, transparent)",
                  }}
                >
                  {cleanCopy("Rated 4.5 stars by 20K+ Pakistanis")}
                </p>
              </div>
              <H3
                id="testimonials-heading"
                className="text-text-primary w-full max-w-3xl"
              >
                Meet our happy investors
              </H3>
            </div>
            <TextRegular className="max-w-2xl text-text-tertiary">
              {cleanCopy(
                "Join a growing community of smart savers, professionals, and everyday Pakistanis who trust Mahaana to secure their financial future."
              )}
            </TextRegular>
          </div>
        )}
      </Container>
    </section>
  );
}
