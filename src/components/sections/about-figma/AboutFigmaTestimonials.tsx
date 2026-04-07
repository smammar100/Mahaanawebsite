"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Container } from "@/components/layout/Container";
import { cleanCopy } from "@/lib/copy-utils";
import { H3, TextSmall } from "@/components/ui/Typography";
import { useInView } from "@/hooks/useInView";
import { aboutFigmaData } from "./aboutFigma.data";
import { cx } from "@/utils/cx";

export function AboutFigmaTestimonials() {
  const { ref, isVisible } = useInView(0.15);
  const testimonialItems = useMemo(() => aboutFigmaData.testimonials.items, []);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerChange = (nextIndex: number) => {
    if (nextIndex === activeIndex) return;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsFading(true);
    timeoutRef.current = setTimeout(() => {
      setActiveIndex(nextIndex);
      setIsFading(false);
    }, 220);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % testimonialItems.length;
      triggerChange(nextIndex);
    }, 3000);

    return () => {
      clearInterval(interval);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [activeIndex, testimonialItems.length]);

  const activeItem = testimonialItems[activeIndex];

  return (
    <section
      ref={ref}
      className={cx(
        "section-fade-in-up bg-surface-bg section-y",
        isVisible && "visible"
      )}
      aria-labelledby="about-figma-testimonials-heading"
    >
      <Container className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col gap-8 sm:gap-10">
          <div className="flex flex-col gap-3 sm:gap-4">
            <p className="text-label text-system-brand">{aboutFigmaData.testimonials.eyebrow}</p>
            <H3 id="about-figma-testimonials-heading" className="text-text-primary">
              {aboutFigmaData.testimonials.heading}
            </H3>
          </div>

          <div className="overflow-hidden rounded-2xl border border-surface-stroke bg-surface-card">
            <div className="border-b border-surface-stroke px-5 py-10 sm:px-6 sm:py-6">
              <div
                className={cx(
                  "mx-auto flex min-h-[320px] max-w-4xl flex-col items-center justify-between gap-8 text-center sm:min-h-[250px] lg:min-h-[220px]",
                  "transition-opacity duration-300",
                  isFading ? "opacity-0" : "opacity-100"
                )}
              >
                <blockquote
                  className="font-body text-body-lg leading-relaxed text-text-primary"
                >
                  &ldquo;{cleanCopy(activeItem.quote)}&rdquo;
                </blockquote>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={activeItem.avatar}
                      alt={`Photo of ${activeItem.person}, ${activeItem.role}`}
                      loading="lazy"
                      className="size-16 rounded-full border border-surface-stroke object-cover"
                    />
                    <div className="flex flex-col items-start text-left">
                      <p className="text-body-md font-medium text-text-primary">
                        {activeItem.person}
                      </p>
                      <TextSmall className="text-text-tertiary">
                        {activeItem.role}
                      </TextSmall>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3">
              {testimonialItems.map((item, index) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => triggerChange(index)}
                  aria-pressed={activeIndex === index}
                  className={cx(
                    "flex items-center justify-center border-t border-surface-stroke px-4 py-6 transition-colors duration-300",
                    "sm:border-t-0 sm:border-r",
                    index === testimonialItems.length - 1 && "sm:border-r-0",
                    activeIndex === index && "bg-system-brand/10"
                  )}
                >
                  <div className="flex items-center">
                    <img
                      src={item.tabLogo}
                      alt=""
                      loading="lazy"
                      className="h-10 w-auto max-h-12 max-w-[150px] object-contain"
                      aria-hidden
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
