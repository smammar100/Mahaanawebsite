"use client";

import { useMemo, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { Zap } from "@untitledui/icons";

import { Container } from "@/components/layout/Container";
import { H3, TextMedium, TextRegular, TextSmall } from "@/components/ui/Typography";
import { useInView } from "@/hooks/useInView";
import { cleanCopy } from "@/lib/copy-utils";
import {
  TESTIMONIAL_AVATAR_IMAGES,
  TESTIMONIAL_COMPANY_LOGOS,
} from "@/lib/testimonial-avatars";
import { cx } from "@/utils/cx";

const testimonialEntries = [
  {
    name: "Mattias Martinsson",
    role: "Co-founder of Tundra Fonder, Sweden",
    content:
      "Through stimulating private savings now, Pakistan can make sure that the state is not overwhelmed 30 years from now when the youth of today retire.",
  },
  {
    name: "David Nangle",
    role: "CEO, VEF",
    content:
      "Mahaana is addressing one of the most important long-term financial issues that exist in Pakistan today. We are proud to back the CEO, Shamoon and his team in this scale venture and I am confident that Mahaana's success will be a positive for both the users of its platform and Pakistan as a whole.",
  },
  {
    name: "Tahir Masaud",
    role: "CEO, IGI Holdings",
    content:
      "IGI is more than a key investor and is a strategic local partner of Mahaana. There are clear synergies between IGI Insurance, IGI Securities and a digital wealth management company like Mahaana, which has a team with a proven track record of fund management in global markets.",
  },
];

const testimonials = testimonialEntries.map((entry, index) => {
  // Order is Mattias, then David; swap avatar indices so headshots match each person (Avatar1 = David, Avatar2 = Mattias).
  const avatarSlot = index === 0 ? 1 : index === 1 ? 0 : index;
  // Logo slots: Tundra, VEF, IGI — indices align with company2/3/1 PNG order used in the carousel.
  const companyLogoSlot =
    index === 0 ? 1 : index === 1 ? 2 : 0;
  return {
    ...entry,
    avatar: TESTIMONIAL_AVATAR_IMAGES[avatarSlot],
    companyLogo: TESTIMONIAL_COMPANY_LOGOS[companyLogoSlot],
  };
});

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
            <div className="flex gap-4" role="list">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.name}
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
                    <div className="flex shrink-0 items-center justify-end" aria-hidden>
                      <img
                        src={testimonial.companyLogo}
                        alt=""
                        loading="lazy"
                        className="h-8 w-auto max-h-10 max-w-[120px] object-contain object-right"
                      />
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
