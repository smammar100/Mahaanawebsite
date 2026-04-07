"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { H3, TextLarge } from "@/components/ui/Typography";
import { InvestorEducationContent } from "@/components/sections/InvestorEducationContent";
import { cx } from "@/utils/cx";
import type { SanityInvestorEducation } from "@/lib/sanity/types";

const CATEGORIES: { id: "Video" | "News" | "Article"; label: string }[] = [
  { id: "Video", label: "Videos & Podcasts" },
  { id: "News", label: "News and Trends" },
  { id: "Article", label: "Articles" },
];

// Schema category values map to tabs: Video → Videos & Podcasts, News → News and Trends, Article → Articles
// Sort by date so latest first within each tab
function sortByDateLatestFirst(items: SanityInvestorEducation[]): SanityInvestorEducation[] {
  return [...items].sort((a, b) => {
    const aDate = a.publishedAt ?? "";
    const bDate = b.publishedAt ?? "";
    if (bDate < aDate) return -1;
    if (bDate > aDate) return 1;
    return 0;
  });
}

export function InvestorEducationLayout({
  items,
  headline,
  subtitle,
}: {
  items: SanityInvestorEducation[];
  headline: string;
  subtitle: string;
}) {
  const [selectedCategory, setSelectedCategory] = useState<"Video" | "News" | "Article">("Video");
  const filtered = items.filter((p) => p.category === selectedCategory);
  const sorted = sortByDateLatestFirst(filtered);

  return (
    <>
      <section className="bg-gradient-brand section-y">
        <Container className="flex flex-col items-center gap-10 text-center">
          <div className="flex flex-col items-center gap-4">
            <H3 className="text-white">{headline}</H3>
            <TextLarge className="text-primary-100">{subtitle}</TextLarge>
          </div>
          <div
            className="fund-tab-list flex w-fit min-h-[44px] max-w-full flex-nowrap justify-start overflow-x-auto snap-x snap-mandatory gap-4 rounded-full bg-gray-100 p-1.5 sm:justify-center"
            role="tablist"
            aria-label="Content category"
          >
            {CATEGORIES.map(({ id, label }) => {
              const isActive = selectedCategory === id;
              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedCategory(id)}
                  className={cx(
                    "min-h-[44px] w-fit shrink-0 snap-start rounded-full px-4 py-3 text-center whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system-brand sm:px-5",
                    isActive
                      ? "bg-white text-text-primary shadow-sm"
                      : "text-text-tertiary hover:bg-white/80 hover:text-text-primary"
                  )}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="section-y">
        <Container className="flex flex-col gap-8">
          <InvestorEducationContent items={sorted} />
        </Container>
      </section>
    </>
  );
}
