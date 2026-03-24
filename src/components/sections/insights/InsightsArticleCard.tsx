"use client";

import Image from "next/image";
import Link from "next/link";
import { cleanCopy } from "@/lib/copy-utils";
import {
  formatArticleCardMeta,
  formatNewsOutletDisplay,
  formatVideoWatchTimeDisplay,
} from "@/lib/formatters";
import type { InsightsArticle } from "@/lib/insights-data";

export function InsightsArticleCard({ article }: { article: InsightsArticle }) {
  const Comp = article.openExternal ? "a" : Link;
  const props = article.openExternal
    ? { href: article.href, target: "_blank", rel: "noopener noreferrer" }
    : { href: article.href };

  return (
    <Comp
      {...props}
      className="group block overflow-hidden rounded-xl border border-surface-stroke bg-surface-card shadow-sm transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system-brand"
    >
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={article.imageUrl}
          alt=""
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <span className="text-xs font-semibold uppercase tracking-wide text-system-brand">
          {cleanCopy(article.tag)}
        </span>
        <p className="mt-1.5 line-clamp-2 font-medium text-text-primary group-hover:text-system-brand">
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
