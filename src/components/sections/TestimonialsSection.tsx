"use client";

import { useMemo, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { Star01, Zap } from "@untitledui/icons";

import { Container } from "@/components/layout/Container";
import { H3, TextMedium, TextRegular, TextSmall } from "@/components/ui/Typography";
import { useInView } from "@/hooks/useInView";
import { cleanCopy } from "@/lib/copy-utils";
import { cx } from "@/utils/cx";

const testimonials = [
  {
    name: "Alice Johnson",
    role: "CEO & Founder",
    avatar: "/images/testimonials/testimonial-avatar-1.webp",
    content:
      "This platform has revolutionized the way we manage projects. It is incredibly user-friendly and efficient.",
  },
  {
    name: "David Lee",
    role: "CTO",
    avatar: "/images/testimonials/testimonial-avatar-2.webp",
    content:
      "I have been impressed with the seamless integration and functionality. It has made our tech operations much smoother.",
  },
  {
    name: "Mark Thompson",
    role: "COO",
    avatar: "/images/testimonials/testimonial-avatar-3.webp",
    content:
      "Managing our day-to-day tasks has never been easier. The interface is intuitive and saves us a lot of time.",
  },
  {
    name: "Emily Carter",
    role: "Tech Lead",
    avatar: "/images/testimonials/testimonial-avatar-4.webp",
    content:
      "The tools provided have significantly improved our team's workflow and collaboration. Highly recommend it!",
  },
  {
    name: "Sophia Turner",
    role: "Designer",
    avatar: "/images/testimonials/testimonial-avatar-5.webp",
    content:
      "From a design perspective, the flexibility and ease of use are outstanding. This has become an indispensable tool for our team.",
  },
  {
    name: "James Wilson",
    role: "Developer",
    avatar: "/images/testimonials/testimonial-avatar-6.webp",
    content:
      "As a developer, I appreciate the robust features and simplicity. It has streamlined our processes considerably.",
  },
];

interface TestimonialsSectionProps {
  className?: string;
}

export function TestimonialsSection({ className }: TestimonialsSectionProps) {
  const plugin = useRef(
    AutoScroll({
      startDelay: 500,
      speed: 0.7,
      stopOnMouseEnter: true,
    })
  );

  const plugins = useMemo(() => [plugin.current], []);

  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      containScroll: "trimSnaps",
    },
    plugins
  );

  const { ref, isVisible } = useInView(0.15);
  return (
    <section
      ref={ref}
      className={cx(
        "section-fade-in-up border-t border-surface-stroke py-8 sm:py-10 md:py-12 lg:py-14 xl:py-16",
        isVisible && "visible",
        className
      )}
      aria-labelledby="testimonials-heading"
    >
      <Container className="flex flex-col gap-6 sm:gap-8 lg:gap-10">
        {/* Header - left-aligned */}
        <div className="flex flex-col items-start gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
              <Zap className="size-6 shrink-0 fill-primary-200 text-primary-200" aria-hidden />
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
          <TextRegular className="mt-0 max-w-2xl text-text-tertiary">
            Join a growing community of smart savers, professionals, and everyday
            Pakistanis who trust Mahaana to secure their financial future.
          </TextRegular>
        </div>

        {/* Carousel */}
        <div className="relative -mx-16 overflow-hidden">
          {/* Gradient fade overlays */}
          <div
            className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-24 sm:w-36 bg-gradient-to-r from-surface-bg to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-24 sm:w-36 bg-gradient-to-l from-surface-bg to-transparent"
            aria-hidden
          />

          <div
            ref={emblaRef}
            className="overflow-hidden px-16 [--overflow:clip]"
          >
            <div className="flex gap-4 sm:gap-6" role="list">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex min-w-[300px] max-w-[384px] shrink-0 flex-col gap-4 rounded-2xl border border-surface-stroke bg-surface-card p-6 select-none"
                  role="listitem"
                >
                  <div className="flex justify-between">
                    <div className="flex gap-4">
                      <img
                        src={testimonial.avatar}
                        alt={`Photo of ${testimonial.name}, ${testimonial.role}`}
                        loading="lazy"
                        className="size-14 shrink-0 rounded-full border border-surface-stroke object-cover"
                      />
                      <div className="flex flex-col">
                        <TextMedium weight="medium" className="text-text-primary">
                          {testimonial.name}
                        </TextMedium>
                        <TextSmall className="text-text-tertiary">
                          {testimonial.role}
                        </TextSmall>
                      </div>
                    </div>
                    <div className="flex gap-0.5" aria-hidden>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star01
                          key={i}
                          className="size-5 shrink-0 fill-warning-300 text-warning-300"
                        />
                      ))}
                    </div>
                  </div>
                  <blockquote className="font-body text-regular leading-7 text-text-tertiary">
                    &ldquo;{cleanCopy(testimonial.content)}&rdquo;
                  </blockquote>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
