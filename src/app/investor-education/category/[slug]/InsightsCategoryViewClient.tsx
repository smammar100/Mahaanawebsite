"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { H1, TextRegular } from "@/components/ui/Typography";
import { cleanCopy } from "@/lib/copy-utils";
import type { InsightsArticle } from "@/lib/insights-data";
import { InsightsArticleGridSection } from "@/components/sections/insights/InsightsArticleGridSection";

interface InsightsCategoryViewClientProps {
  heading: string;
  description: string;
  articles: InsightsArticle[];
}

export function InsightsCategoryViewClient({
  heading,
  description,
  articles,
}: InsightsCategoryViewClientProps) {
  const sortedArticles = useMemo(
    () =>
      [...articles].sort((a, b) => {
        const ap = a.publishedAt ?? "";
        const bp = b.publishedAt ?? "";
        if (bp !== ap) return bp.localeCompare(ap);
        return 0;
      }),
    [articles]
  );

  return (
    <div className="-mt-[calc(4.5rem+env(safe-area-inset-top,0px))] bg-surface-bg">
      <Container className="pt-[120px] pb-12 md:pb-16">
        <nav
          className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-text-tertiary"
          aria-label={cleanCopy("Breadcrumb")}
        >
          <Link
            href="/investor-education"
            className="font-medium text-system-brand hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system-brand"
          >
            {cleanCopy("Investor Education")}
          </Link>
          <span aria-hidden>/</span>
          <span className="text-text-primary">{cleanCopy(heading)}</span>
        </nav>

        <H1 className="mt-6 text-text-primary">{cleanCopy(heading)}</H1>
        <TextRegular className="mt-3 max-w-2xl text-text-secondary">
          {cleanCopy(description)}
        </TextRegular>

        {sortedArticles.length === 0 ? (
          <p className="mt-10 text-center text-sm text-text-tertiary">
            {cleanCopy("No items in this category yet.")}
          </p>
        ) : (
          <section className="mt-10" aria-labelledby="insights-category-all-heading">
            <div id="insights-category-all-heading">
              <InsightsArticleGridSection
                title={heading}
                articles={sortedArticles}
                maxCards={Infinity}
                showViewAllLink={false}
              />
            </div>
          </section>
        )}
      </Container>
    </div>
  );
}
