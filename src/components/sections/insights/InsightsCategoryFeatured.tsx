"use client";

import Image from "next/image";
import Link from "next/link";
import { H3, TextRegular } from "@/components/ui/Typography";
import { cleanCopy } from "@/lib/copy-utils";
import {
  formatArticleCardMeta,
  formatNewsOutletDisplay,
  formatVideoWatchTimeDisplay,
} from "@/lib/formatters";
import type { InsightsArticle } from "@/lib/insights-data";

function ArticleCardLink({
  article,
  className,
  children,
}: {
  article: InsightsArticle;
  className?: string;
  children: React.ReactNode;
}) {
  const Comp = article.openExternal ? "a" : Link;
  const props = article.openExternal
    ? { href: article.href, target: "_blank", rel: "noopener noreferrer" }
    : { href: article.href };
  return (
    <Comp className={className} {...props}>
      {children}
    </Comp>
  );
}

function metaLine(article: InsightsArticle) {
  return article.tag === "Video"
    ? formatVideoWatchTimeDisplay(article.readTime)
    : article.tag === "News"
      ? formatNewsOutletDisplay(article.authorName)
      : formatArticleCardMeta({
          authorName: article.authorName,
          readTime: article.readTime,
        });
}

interface InsightsCategoryFeaturedProps {
  articles: InsightsArticle[];
}

/** One hero + up to three side cards (same 2/3 + 1/3 layout as hub Featured articles). */
export function InsightsCategoryFeatured({
  articles,
}: InsightsCategoryFeaturedProps) {
  const slice = articles.slice(0, 4);
  if (slice.length === 0) return null;

  const heroArticle = slice[0]!;
  const sideArticles = slice.slice(1, 4);
  const onlyHero = sideArticles.length === 0;

  return (
    <section
      className="mt-10"
      aria-label={cleanCopy("Featured articles in this category")}
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-stretch lg:gap-4">
        <div className={onlyHero ? "lg:col-span-3" : "lg:col-span-2"}>
          <ArticleCardLink
            article={heroArticle}
            className="group block h-full overflow-hidden rounded-xl border border-surface-stroke bg-surface-card shadow-sm transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system-brand"
          >
            <div className="relative aspect-[16/10] w-full min-h-[200px] overflow-hidden lg:min-h-0">
              <Image
                src={heroArticle.imageUrl}
                alt=""
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                aria-hidden
              />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <span className="text-xs font-semibold uppercase tracking-wide text-white/90">
                  {cleanCopy(heroArticle.tag)}
                </span>
                <H3 className="mt-1 text-xl leading-tight text-white sm:text-2xl">
                  <span className="line-clamp-2 group-hover:text-primary-150">
                    {cleanCopy(heroArticle.title)}
                  </span>
                </H3>
                {heroArticle.excerpt ? (
                  <TextRegular className="mt-2 line-clamp-2 text-sm text-white/90">
                    {cleanCopy(heroArticle.excerpt)}
                  </TextRegular>
                ) : null}
                <p className="mt-2 text-xs text-white/80">
                  {cleanCopy(metaLine(heroArticle))}
                </p>
              </div>
            </div>
          </ArticleCardLink>
        </div>

        {!onlyHero ? (
          <div className="flex min-h-0 flex-col gap-4 lg:h-full">
            {sideArticles.map((article) => (
              <ArticleCardLink
                key={article.id}
                article={article}
                className="group flex min-h-0 gap-4 rounded-lg border border-surface-stroke bg-surface-card p-3 transition-colors hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system-brand lg:flex-1"
              >
                <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-md sm:h-20 sm:w-28">
                  <Image
                    src={article.imageUrl}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    sizes="112px"
                  />
                </div>
                <div className="min-w-0 flex-1 overflow-hidden">
                  <span className="text-xs font-semibold uppercase tracking-wide text-system-brand">
                    {cleanCopy(article.tag)}
                  </span>
                  <p className="mt-0.5 line-clamp-2 text-sm font-medium text-text-primary group-hover:text-system-brand">
                    {cleanCopy(article.title)}
                  </p>
                  <p className="mt-0.5 text-xs text-text-tertiary">
                    {cleanCopy(metaLine(article))}
                  </p>
                </div>
              </ArticleCardLink>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
