"use client";

import Link from "next/link";
import { cleanCopy } from "@/lib/copy-utils";
import {
  formatArticleCardMeta,
  formatNewsOutletDisplay,
  formatVideoWatchTimeDisplay,
} from "@/lib/formatters";
import type { InsightsArticle } from "@/lib/insights-data";

interface InsightsMostPopularProps {
  articles: InsightsArticle[];
}

function ArticleRow({
  article,
  index,
  isLastRow,
}: {
  article: InsightsArticle;
  index: number;
  isLastRow?: boolean;
}) {
  const num = String(index + 1).padStart(2, "0");
  const Comp = article.openExternal ? "a" : Link;
  const props = article.openExternal
    ? { href: article.href, target: "_blank", rel: "noopener noreferrer" }
    : { href: article.href };

  return (
    <Comp
      {...props}
      className={`group flex items-start gap-4 border-b border-surface-stroke py-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system-brand ${isLastRow ? "border-b-0" : ""}`}
    >
      <span className="shrink-0 text-lg font-semibold text-text-tertiary">
        {num}
      </span>
      <div className="min-w-0 flex-1">
        <span className="text-xs font-semibold uppercase tracking-wide text-system-brand">
          {cleanCopy(article.tag)}
        </span>
        <p className="mt-0.5 line-clamp-2 font-medium text-text-primary group-hover:text-system-brand">
          {cleanCopy(article.title)}
        </p>
        <p className="mt-1 text-xs text-text-tertiary">
          {cleanCopy(
            article.tag === "Video"
              ? formatVideoWatchTimeDisplay(article.readTime)
              : article.tag === "News"
                ? formatNewsOutletDisplay(article.authorName)
                : formatArticleCardMeta({
                    authorName: article.authorName,
                    readTime: article.readTime,
                  })
          )}
        </p>
      </div>
    </Comp>
  );
}

export function InsightsMostPopular({ articles }: InsightsMostPopularProps) {
  return (
    <section aria-labelledby="insights-latest-news-heading">
      <p
        id="insights-latest-news-heading"
        className="mb-4 text-sm font-semibold uppercase tracking-wide text-system-brand"
      >
        {cleanCopy("Latest News")}
      </p>
      <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2 sm:auto-rows-fr">
        {articles.slice(0, 4).map((article, i) => (
          <ArticleRow
            key={article.id}
            article={article}
            index={i}
            isLastRow={i >= 2}
          />
        ))}
      </div>
      {articles.length === 0 && (
        <p className="py-6 text-sm text-text-tertiary">
          {cleanCopy("No articles yet.")}
        </p>
      )}
    </section>
  );
}
