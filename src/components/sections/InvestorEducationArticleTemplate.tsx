import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowNarrowLeft } from "@untitledui/icons";
import { Container } from "@/components/layout/Container";
import { H1, TextRegular, TextSmall } from "@/components/ui/Typography";
import { cleanCopy } from "@/lib/copy-utils";
import {
  DEFAULT_ARTICLE_AUTHOR,
  formatArticleReadTime,
  formatNewsOutletDisplay,
  formatRelativeOrShortDate,
  formatVideoWatchTimeDisplay,
  sanitizeArticleAuthorName,
} from "@/lib/formatters";
import { CallToAction1 } from "@/components/ui/call-to-action-1";

export interface InvestorEducationArticleTemplateProps {
  title: string;
  description?: string | null;
  author?: string | null;
  publishedAt?: string | null;
  readingTime?: string | null;
  heroImageUrl?: string | null;
  heroVideoEmbed?: ReactNode;
  bodyContent?: ReactNode;
  externalLink?: string | null;
  category?: string | null;
  /** Full URL for share buttons (e.g. canonical article URL). */
  shareUrl?: string;
  /** Optional author portrait; falls back to initials in a circle. */
  authorImageUrl?: string | null;
}

function ShareButtons({ title, href }: { title: string; href: string }) {
  const encodedUrl = encodeURIComponent(href);
  const encodedTitle = encodeURIComponent(title);
  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  return (
    <div className="flex items-center gap-2">
      <span className="text-body-sm font-medium text-text-tertiary">
        {cleanCopy("Share")}
      </span>
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex size-8 items-center justify-center rounded-lg border border-surface-stroke bg-surface-card text-text-secondary transition-colors hover:border-system-brand hover:text-system-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system-brand"
        aria-label="Share on X"
      >
        <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>
      <a
        href={linkedInUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex size-8 items-center justify-center rounded-lg border border-surface-stroke bg-surface-card text-text-secondary transition-colors hover:border-system-brand hover:text-system-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system-brand"
        aria-label="Share on LinkedIn"
      >
        <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </a>
    </div>
  );
}

function asideSecondaryMeta(
  publishedAt: string | null | undefined,
  category: string | null | undefined,
  readingTime: string | null | undefined,
): string {
  const relative = formatRelativeOrShortDate(publishedAt);
  if (relative) return relative;
  if (category === "Video") return formatVideoWatchTimeDisplay(readingTime);
  if (category === "News") return formatArticleReadTime(readingTime);
  return formatArticleReadTime(readingTime);
}

export function InvestorEducationArticleTemplate({
  title,
  description,
  author,
  publishedAt,
  readingTime,
  heroImageUrl,
  heroVideoEmbed,
  bodyContent,
  externalLink,
  category,
  shareUrl = "",
  authorImageUrl,
}: InvestorEducationArticleTemplateProps) {
  const displayAuthor =
    sanitizeArticleAuthorName(author) || DEFAULT_ARTICLE_AUTHOR;
  const metaLine = asideSecondaryMeta(publishedAt, category, readingTime);

  return (
    <div className="-mt-[calc(4.5rem+env(safe-area-inset-top,0px))] bg-surface-bg">
      <article>
        <Container className="pt-[120px] pb-4">
          <div className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-12 xl:gap-16">
            <aside className="shrink-0 lg:sticky lg:top-[calc(var(--header-height)+1rem)] lg:z-10 lg:self-start lg:w-[280px] xl:w-[360px]">
              <Link
                href="/investor-education"
                className="mb-6 inline-flex items-center gap-2 text-body-sm font-medium text-text-tertiary transition-colors hover:text-system-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system-brand"
              >
                <ArrowNarrowLeft className="size-4 shrink-0" aria-hidden />
                {cleanCopy("Back to Investor Education")}
              </Link>
              <H1 className="pb-2 text-balance text-3xl text-text-primary lg:text-4xl">
                {title}
              </H1>
              {description ? (
                <TextRegular className="mt-4 text-text-tertiary">
                  {cleanCopy(description)}
                </TextRegular>
              ) : null}
              <div className="mt-8 flex gap-3">
                {authorImageUrl ? (
                  <span className="relative size-10 shrink-0 overflow-hidden rounded-full border border-surface-stroke bg-surface-stroke">
                    <Image
                      src={authorImageUrl}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </span>
                ) : (
                  <span className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-surface-stroke bg-surface-stroke text-body-sm font-semibold text-text-tertiary">
                    {displayAuthor[0]?.toUpperCase() ?? "?"}
                  </span>
                )}
                <div className="flex min-w-0 flex-col">
                  <TextSmall className="font-semibold text-text-primary">
                    {cleanCopy(displayAuthor)}
                  </TextSmall>
                  {metaLine ? (
                    <TextSmall className="mt-0.5 text-text-tertiary">
                      {cleanCopy(metaLine)}
                    </TextSmall>
                  ) : null}
                </div>
              </div>
            </aside>

            <div className="min-w-0 flex-1">
              {(heroVideoEmbed || heroImageUrl) && (
                <div className="mb-8 w-full">
                  {heroVideoEmbed ?? (
                    heroImageUrl && (
                      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-surface-stroke">
                        <Image
                          src={heroImageUrl}
                          alt={
                            title
                              ? `Hero image for ${title}`
                              : "Article hero image"
                          }
                          fill
                          className="object-cover"
                          priority
                          sizes="(max-width: 1024px) 100vw, 720px"
                        />
                      </div>
                    )
                  )}
                </div>
              )}

              <div className="readable-line-length">
                {bodyContent ?? null}
              </div>

              {externalLink ? (
                <div className="readable-line-length mt-8">
                  <Link
                    href={externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-system-brand px-6 py-3 text-white transition-colors hover:bg-system-brand/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system-brand"
                  >
                    {cleanCopy(category === "Video" ? "Watch" : "Read more")}
                  </Link>
                </div>
              ) : null}

              <div className="mt-10 flex flex-col gap-4 border-t border-surface-stroke pt-8 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-2">
                  {category ? (
                    <Link
                      href="/investor-education"
                      className="rounded-full border border-surface-stroke bg-surface-bg px-3 py-1.5 text-body-sm font-medium text-text-tertiary transition-colors hover:border-system-brand hover:text-system-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system-brand"
                    >
                      {cleanCopy(category)}
                    </Link>
                  ) : null}
                </div>
                {shareUrl ? (
                  <ShareButtons title={title} href={shareUrl} />
                ) : null}
              </div>
            </div>
          </div>
        </Container>

        <section className="mt-12 pb-16">
          <Container>
            <CallToAction1 />
          </Container>
        </section>
      </article>
    </div>
  );
}
