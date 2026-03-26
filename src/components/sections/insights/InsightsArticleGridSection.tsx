"use client";

import Link from "next/link";
import { H2 } from "@/components/ui/Typography";
import { cleanCopy } from "@/lib/copy-utils";
import type { InsightsArticle } from "@/lib/insights-data";
import { InsightsArticleCard } from "@/components/sections/insights/InsightsArticleCard";

interface InsightsArticleGridSectionProps {
  title: string;
  viewAllHref?: string;
  /** Defaults to “Read more on {title}”. */
  viewAllLabel?: string;
  articles: InsightsArticle[];
  /** Default 3 for hub sections; use `Infinity` to show every card in this block. */
  maxCards?: number;
  showViewAllLink?: boolean;
}

export function InsightsArticleGridSection({
  title,
  viewAllHref,
  viewAllLabel,
  articles,
  maxCards = 3,
  showViewAllLink = true,
}: InsightsArticleGridSectionProps) {
  const visible =
    maxCards === Infinity ? articles : articles.slice(0, maxCards);
  const headingId = `insights-grid-${title.replace(/\s+/g, "-").toLowerCase()}`;
  const linkLabel =
    viewAllLabel ?? cleanCopy(`Read more on ${title}`);

  return (
    <section aria-labelledby={headingId}>
      <div className="mb-4 flex flex-col gap-3 sm:mb-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <H2 id={headingId} className="text-xl text-text-primary sm:text-2xl">
          {cleanCopy(title)}
        </H2>
        {showViewAllLink && viewAllHref ? (
          <Link
            href={viewAllHref}
            className="shrink-0 text-sm font-medium text-system-brand hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system-brand"
          >
            {linkLabel}
            <span aria-hidden> →</span>
          </Link>
        ) : null}
      </div>
      {/* Horizontal scroll on small screens; grid from sm up */}
      <div className="-mx-4 overflow-x-auto overflow-y-visible pb-2 [-ms-overflow-style:none] [scrollbar-width:thin] sm:mx-0 sm:overflow-visible sm:pb-0 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-surface-stroke">
        <div className="flex snap-x snap-mandatory gap-4 px-4 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-6 sm:px-0 lg:grid-cols-3">
          {visible.map((article) => (
            <div
              key={article.id}
              className="w-[min(100%,min(320px,calc(100vw-3rem)))] shrink-0 snap-start sm:w-auto sm:min-w-0 sm:shrink"
            >
              <InsightsArticleCard article={article} />
            </div>
          ))}
        </div>
      </div>
      {articles.length === 0 && (
        <p className="py-8 text-sm text-text-tertiary">
          {cleanCopy("No articles in this section yet.")}
        </p>
      )}
    </section>
  );
}
