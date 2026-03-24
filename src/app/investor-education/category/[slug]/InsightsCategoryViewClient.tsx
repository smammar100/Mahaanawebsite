"use client";

import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { cleanCopy } from "@/lib/copy-utils";
import type { InsightsArticle } from "@/lib/insights-data";
import { InsightsArticleCard } from "@/components/sections/insights/InsightsArticleCard";

interface InsightsCategoryViewClientProps {
  heading: string;
  articles: InsightsArticle[];
}

export function InsightsCategoryViewClient({
  heading,
  articles,
}: InsightsCategoryViewClientProps) {
  return (
    <div className="-mt-[calc(4.5rem+env(safe-area-inset-top,0px))] bg-surface-bg">
      <Container className="pt-[120px] pb-12 md:pb-16">
        <Link
          href="/investor-education"
          className="inline-flex text-sm font-medium text-system-brand hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system-brand"
        >
          ← {cleanCopy("Back to Investor Education")}
        </Link>
        <h1 className="mt-6 text-2xl font-semibold text-text-primary md:text-3xl">
          {cleanCopy(heading)}
        </h1>
        {articles.length === 0 ? (
          <p className="mt-10 text-center text-sm text-text-tertiary">
            {cleanCopy("No items in this category yet.")}
          </p>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <InsightsArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
