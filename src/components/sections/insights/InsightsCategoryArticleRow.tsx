"use client";

import Image from "next/image";
import Link from "next/link";
import { cleanCopy } from "@/lib/copy-utils";
import {
  formatArticleCardMeta,
  formatNewsOutletDisplay,
  formatPublishedDate,
  formatVideoWatchTimeDisplay,
} from "@/lib/formatters";
import type { InsightsArticle } from "@/lib/insights-data";

interface InsightsCategoryArticleRowProps {
  article: InsightsArticle;
}

export function InsightsCategoryArticleRow({
  article,
}: InsightsCategoryArticleRowProps) {
  const Comp = article.openExternal ? "a" : Link;
  const props = article.openExternal
    ? { href: article.href, target: "_blank", rel: "noopener noreferrer" }
    : { href: article.href };

  const dateStr = formatPublishedDate(article.publishedAt);
  const fallbackMeta =
    article.tag === "Video"
      ? formatVideoWatchTimeDisplay(article.readTime)
      : article.tag === "News"
        ? formatNewsOutletDisplay(article.authorName)
        : formatArticleCardMeta({
            authorName: article.authorName,
            readTime: article.readTime,
          });
  const dateLine = dateStr ?? fallbackMeta;

  return (
    <Comp
      {...props}
      className="group flex gap-4 border-b border-surface-stroke py-5 last:border-b-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system-brand sm:gap-5 sm:py-6"
    >
      <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg sm:h-24 sm:w-36">
        <Image
          src={article.imageUrl}
          alt=""
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          sizes="144px"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-text-tertiary">
          <span className="font-medium text-text-secondary">
            {cleanCopy(article.category)}
          </span>
          <span className="mx-1.5 text-text-tertiary" aria-hidden>
            ·
          </span>
          <span>{cleanCopy(article.tag)}</span>
        </p>
        <p className="mt-1 line-clamp-2 text-base font-medium text-text-primary group-hover:text-system-brand sm:text-lg">
          {cleanCopy(article.title)}
        </p>
        <p className="mt-1 text-xs text-text-tertiary sm:text-sm">
          {cleanCopy(dateLine)}
        </p>
      </div>
    </Comp>
  );
}
