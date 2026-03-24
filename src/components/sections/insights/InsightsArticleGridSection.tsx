"use client";

import Link from "next/link";
import { cleanCopy } from "@/lib/copy-utils";
import type { InsightsArticle } from "@/lib/insights-data";
import { InsightsArticleCard } from "@/components/sections/insights/InsightsArticleCard";

interface InsightsArticleGridSectionProps {
  title: string;
  viewAllHref?: string;
  articles: InsightsArticle[];
  /** Default 3 for hub sections; use `Infinity` to show every card in this block. */
  maxCards?: number;
  showViewAllLink?: boolean;
}

export function InsightsArticleGridSection({
  title,
  viewAllHref,
  articles,
  maxCards = 3,
  showViewAllLink = true,
}: InsightsArticleGridSectionProps) {
  const visible =
    maxCards === Infinity ? articles : articles.slice(0, maxCards);
  const headingId = `insights-grid-${title.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <section aria-labelledby={headingId}>
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2
          id={headingId}
          className="text-xl font-semibold text-text-primary"
        >
          {cleanCopy(title)}
        </h2>
        {showViewAllLink && viewAllHref ? (
          <Link
            href={viewAllHref}
            className="shrink-0 text-sm font-medium text-system-brand hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system-brand"
          >
            {cleanCopy("View all")} →
          </Link>
        ) : null}
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((article) => (
          <InsightsArticleCard key={article.id} article={article} />
        ))}
      </div>
      {articles.length === 0 && (
        <p className="py-8 text-sm text-text-tertiary">
          {cleanCopy("No articles in this section yet.")}
        </p>
      )}
    </section>
  );
}
