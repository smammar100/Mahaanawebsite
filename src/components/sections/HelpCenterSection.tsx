"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Container } from "@/components/layout/Container";
import { H1, TextRegular } from "@/components/ui/Typography";
import type { HelpCenterFaqItem } from "@/lib/sanity/fetch";
import { cx } from "@/utils/cx";
import { ChevronDown } from "@untitledui/icons";

/** Display order for Help Center FAQ categories (from CSV import + legacy). */
const CATEGORY_ORDER = [
  "Getting Started & Account Setup",
  "Mahaana Save+",
  "Mahaana ETF (MIIETF)",
  "Mahaana Retirement",
  "Returns & Performance",
  "Withdrawals & Deposits",
  "Taxes, Zakat & Shariah",
  "Fees & Charges",
  "Security & Technology",
  "Support",
  "Account",
  "Features",
  "Security",
  "Other",
] as const;

const TOP_PADDING = 200;

type Category = (typeof CATEGORY_ORDER)[number] | string;

function getOrderedCategories(items: HelpCenterFaqItem[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const c of CATEGORY_ORDER) {
    if (items.some((i) => i.category === c) && !seen.has(c)) {
      seen.add(c);
      result.push(c);
    }
  }
  // Append any category from items that wasn't in CATEGORY_ORDER
  for (const item of items) {
    if (!seen.has(item.category)) {
      seen.add(item.category);
      result.push(item.category);
    }
  }
  return result;
}

interface HelpCenterSectionProps {
  items: HelpCenterFaqItem[];
  className?: string;
}

export function HelpCenterSection({ items, className }: HelpCenterSectionProps) {
  const categories = getOrderedCategories(items);
  const [activeCategory, setActiveCategory] = useState<Category | null>(categories[0] ?? null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isScrollingRef = useRef(false);
  const categoryRefs = useRef<Partial<Record<string, HTMLDivElement | null>>>({});

  const setupObserver = useCallback(() => {
    observerRef.current?.disconnect();
    if (categories.length === 0) return undefined;

    let debounceTimeout: ReturnType<typeof setTimeout>;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (isScrollingRef.current) return;
        if (debounceTimeout) clearTimeout(debounceTimeout);

        debounceTimeout = setTimeout(() => {
          const intersecting = entries.filter((e) => e.isIntersecting);
          const entry = intersecting.reduce(
            (closest, current) => {
              const dist = Math.abs(current.boundingClientRect.top - TOP_PADDING);
              const closestDist = closest
                ? Math.abs(closest.boundingClientRect.top - TOP_PADDING)
                : Infinity;
              return dist < closestDist ? current : closest;
            },
            null as IntersectionObserverEntry | null
          );
          if (entry) {
            const cat = entry.target.getAttribute("data-category") as Category | null;
            if (cat) setActiveCategory(cat);
          }
        }, 150);
      },
      {
        root: null,
        rootMargin: `-${TOP_PADDING}px 0px -100% 0px`,
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    categories.forEach((category) => {
      const el = categoryRefs.current[category];
      if (el) {
        el.setAttribute("data-category", category);
        observerRef.current?.observe(el);
      }
    });

    return () => {
      if (debounceTimeout) clearTimeout(debounceTimeout);
    };
  }, [categories.join(",")]);

  useEffect(() => {
    const cleanup = setupObserver();
    return () => {
      cleanup?.();
      observerRef.current?.disconnect();
    };
  }, [setupObserver]);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    isScrollingRef.current = true;
    const el = document.getElementById(`faq-${category.toLowerCase()}`);
    if (el) {
      el.style.scrollMarginTop = `${TOP_PADDING}px`;
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 1000);
  };

  if (items.length === 0) {
    return (
      <section
        className={cx("bg-gradient-brand py-12 sm:py-16 md:py-20", className)}
        aria-labelledby="help-center-heading"
      >
        <Container>
          <H1 id="help-center-heading" className="text-center text-white">
            Help Center
          </H1>
          <TextRegular className="mx-auto mt-4 max-w-xl text-center text-gray-200">
            No FAQs yet. Check back soon.
          </TextRegular>
        </Container>
      </section>
    );
  }

  return (
    <section
      className={cx(
        "min-h-screen bg-gradient-brand py-8 sm:py-10 md:py-12 lg:py-14 xl:py-16",
        className
      )}
      aria-labelledby="help-center-heading"
    >
      <Container className="flex flex-col gap-8 md:gap-12 lg:gap-16">
        {/* Hero */}
        <div className="text-center pt-16 pb-16 flex flex-col gap-2">
          <H1
            id="help-center-heading"
            className="text-center text-white text-[2.5rem] leading-tight sm:text-[3rem] lg:text-[3.5rem]"
          >
            We&apos;ve got answers
          </H1>
          <TextRegular className="mx-auto mt-4 max-w-xl text-center text-gray-200">
            Find answers to common questions about your account, security, and Mahaana products.
          </TextRegular>
        </div>

        {/* Grid: sidebar + FAQ blocks */}
        <div className="grid gap-8 md:grid-cols-[200px_1fr] md:gap-12 lg:gap-16">
          {/* Sidebar - desktop */}
          <div className="sticky top-24 hidden h-fit flex-col gap-4 md:flex">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => handleCategoryClick(category)}
                className={cx(
                  "text-left font-body text-regular transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system-brand rounded",
                  activeCategory === category
                    ? "font-semibold text-white"
                    : "font-normal text-gray-200 hover:text-white"
                )}
              >
                {category}
              </button>
            ))}
          </div>

          {/* FAQ blocks - on elevated background for readability */}
          <div className="space-y-6 rounded-xl bg-surface-card px-4 py-6 sm:px-6 md:py-8">
            {categories.map((category) => {
              const categoryItems = items.filter((i) => i.category === category);
              if (categoryItems.length === 0) return null;

              return (
                <div
                  key={category}
                  id={`faq-${category.toLowerCase()}`}
                  ref={(el) => {
                    categoryRefs.current[category] = el;
                  }}
                  data-category={category}
                  style={{ scrollMarginTop: TOP_PADDING }}
                  className="scroll-mt-[200px]"
                >
                  <Accordion type="single" collapsible className="w-full">
                    {categoryItems.map((item, i) => (
                      <AccordionItem
                        key={`${category}-${i}`}
                        value={`${category}-${i}`}
                        className="border-b border-surface-stroke last:border-0"
                      >
                        <AccordionTrigger className="font-body text-regular font-semibold text-text-primary hover:no-underline hover:text-system-brand py-4">
                          <span className="min-w-0 flex-1 text-left">{item.question}</span>
                          <ChevronDown className="size-5 shrink-0 transition-transform duration-200" aria-hidden />
                        </AccordionTrigger>
                        <AccordionContent>
                          <TextRegular className="whitespace-pre-line text-text-secondary">
                            {item.answer}
                          </TextRegular>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
