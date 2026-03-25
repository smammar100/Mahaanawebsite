"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Container } from "@/components/layout/Container";
import { Input } from "@/components/ui/Input";
import { H1, TextMedium, TextRegular } from "@/components/ui/Typography";
import type { HelpCenterFaqItem } from "@/lib/sanity/fetch";
import { cx } from "@/utils/cx";
import { cleanCopy } from "@/lib/copy-utils";
import { ChevronDown, SearchLg, X } from "@untitledui/icons";

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

/** Filter FAQs by query and rank by relevance: question > answer > category. */
function filterAndRankFaqs(items: HelpCenterFaqItem[], query: string): HelpCenterFaqItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return items;
  return items
    .map((item) => {
      let score = 0;
      if (item.question.toLowerCase().includes(q)) score += 3;
      if (item.answer.toLowerCase().includes(q)) score += 2;
      if (item.category.toLowerCase().includes(q)) score += 1;
      return { item, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ item }) => item);
}

interface HelpCenterSectionProps {
  items: HelpCenterFaqItem[];
  className?: string;
}

export function HelpCenterSection({ items, className }: HelpCenterSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredItems = useMemo(() => filterAndRankFaqs(items, searchQuery), [items, searchQuery]);
  const categories = getOrderedCategories(filteredItems);
  const [activeCategory, setActiveCategory] = useState<Category | null>(categories[0] ?? null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Keep activeCategory in sync when search narrows categories
  useEffect(() => {
    if (categories.length > 0 && (!activeCategory || !categories.includes(activeCategory))) {
      setActiveCategory(categories[0]);
    } else if (categories.length === 0) {
      setActiveCategory(null);
    }
  }, [categories, activeCategory]);
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
          <TextMedium className="mx-auto mt-4 max-w-xl text-center text-white/90">
            No FAQs yet. Check back soon.
          </TextMedium>
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
      <Container className="flex flex-col gap-8 md:gap-10 lg:gap-10">
        {/* Hero */}
        <div className="text-center pt-16 pb-16 flex flex-col gap-2">
          <H1
            id="help-center-heading"
            className="text-center text-white"
          >
            We&apos;ve got answers
          </H1>
          <TextMedium className="mx-auto mt-4 max-w-xl text-center text-white/90">
            Find answers to common questions about your account, security, and Mahaana products.
          </TextMedium>
        </div>

        {/* Search bar + categories: sidebar top-aligned with search bar, FAQ content below */}
        <div className="grid gap-x-8 gap-y-6 md:grid-cols-[200px_1fr] md:gap-x-12 md:gap-y-8 lg:gap-x-16 lg:gap-y-10">
          {/* Sidebar - spans 2 rows so its top aligns with search bar */}
          <div className="sticky top-24 hidden h-fit flex-col gap-4 md:flex md:row-span-2 md:items-start">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => handleCategoryClick(category)}
                className={cx(
                  "text-nav-heading text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system-brand rounded",
                  activeCategory === category
                    ? "text-white"
                    : "text-white/80 hover:text-white"
                )}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Row 1 col 2: search bar */}
          <div className="help-center-search-wrapper relative min-w-0">
            <Input
              type="search"
              value={searchQuery}
              onChange={(value) => setSearchQuery(value ?? "")}
              placeholder="Search FAQs…"
              icon={SearchLg}
              aria-label="Search help center FAQs"
              className="w-full max-w-full"
              inputClassName={searchQuery.length > 0 ? "pr-9" : undefined}
            />
            {searchQuery.length > 0 && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 flex size-8 items-center justify-center rounded text-text-tertiary hover:bg-surface-stroke/50 hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system-brand rounded-full"
                aria-label="Clear search"
              >
                <X className="size-4" aria-hidden />
              </button>
            )}
          </div>

          {/* Row 2 col 2: FAQ blocks */}
          <div className="space-y-6 rounded-xl bg-surface-card px-4 py-6 sm:px-6 md:py-8 min-w-0">
            {filteredItems.length === 0 && searchQuery.trim() !== "" ? (
              <p className="text-text-tertiary text-center py-8" role="status">
                No FAQs match your search.
              </p>
            ) : (
            categories.map((category) => {
              const categoryItems = filteredItems.filter((i) => i.category === category);
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
                        <AccordionTrigger className="text-base font-normal font-body text-text-primary hover:no-underline hover:text-system-brand py-4">
                          <span className="min-w-0 flex-1 text-left">{item.question}</span>
                          <ChevronDown className="size-5 shrink-0 transition-transform duration-200" aria-hidden />
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="text-body font-normal whitespace-pre-line text-text-tertiary">
                            {cleanCopy(item.answer)}
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              );
            })
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
