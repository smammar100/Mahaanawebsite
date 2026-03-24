"use client";

import Image from "next/image";
import Link from "next/link";
import { H2, TextRegular } from "@/components/ui/Typography";
import { cleanCopy } from "@/lib/copy-utils";
import {
  formatArticleCardMeta,
  formatNewsOutletDisplay,
  formatVideoWatchTimeDisplay,
} from "@/lib/formatters";
import type { InsightsArticle } from "@/lib/insights-data";
import { cx } from "@/utils/cx";

interface InsightsFeaturedHeroProps {
  heroArticle: InsightsArticle | null;
  sideArticles: InsightsArticle[];
}

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

export function InsightsFeaturedHero({
  heroArticle,
  sideArticles,
}: InsightsFeaturedHeroProps) {
  return (
    <section>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-4 lg:items-stretch">
        {/* Hero card - aspect ratio drives row height on lg */}
        <div className="lg:col-span-2">
          {heroArticle ? (
            <ArticleCardLink
              article={heroArticle}
              className="group block overflow-hidden rounded-xl border border-surface-stroke bg-surface-card shadow-sm transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system-brand"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
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
                  <H2 className="mt-1 text-xl font-semibold text-white sm:text-2xl">
                    <span className="line-clamp-2 group-hover:text-primary-150">
                      {cleanCopy(heroArticle.title)}
                    </span>
                  </H2>
                  {heroArticle.excerpt && (
                    <TextRegular className="mt-2 line-clamp-2 text-sm text-white/90">
                      {cleanCopy(heroArticle.excerpt)}
                    </TextRegular>
                  )}
                  <p className="mt-2 text-xs text-white/80">
                    {cleanCopy(
                      heroArticle.tag === "Video"
                        ? formatVideoWatchTimeDisplay(heroArticle.readTime)
                        : heroArticle.tag === "News"
                          ? formatNewsOutletDisplay(heroArticle.authorName)
                          : formatArticleCardMeta({
                              authorName: heroArticle.authorName,
                              readTime: heroArticle.readTime,
                            })
                    )}
                  </p>
                </div>
              </div>
            </ArticleCardLink>
          ) : (
            <div className="flex aspect-[16/10] items-center justify-center rounded-xl border border-dashed border-surface-stroke bg-surface-card text-text-tertiary">
              <span className="text-sm">{cleanCopy("No featured article")}</span>
            </div>
          )}
        </div>
        {/* Side articles - height matches hero: three cards share space equally */}
        <div className="flex min-h-0 flex-col gap-4 lg:h-full">
          {sideArticles.slice(0, 3).map((article) => (
            <ArticleCardLink
              key={article.id}
              article={article}
              className="group flex min-h-0 gap-4 rounded-lg border lg:flex-1 border-surface-stroke bg-surface-card p-3 transition-colors hover:border-surface-stroke hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system-brand"
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
            </ArticleCardLink>
          ))}
        </div>
      </div>
    </section>
  );
}
