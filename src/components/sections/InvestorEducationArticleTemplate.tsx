import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { H1, H3, TextLarge, TextRegular, TextSmall } from "@/components/ui/Typography";
import { cleanCopy } from "@/lib/copy-utils";
import {
  DEFAULT_ARTICLE_AUTHOR,
  formatArticleCardMeta,
  formatArticleReadTime,
  formatNewsOutletDisplay,
  formatVideoWatchTimeDisplay,
  sanitizeArticleAuthorName,
} from "@/lib/formatters";
import { GetInTouchForm } from "@/components/sections/GetInTouchForm";

export interface RelatedArticleShape {
  slug: string;
  title: string;
  imageUrl: string;
  href: string;
  authorName: string;
  readTime: string;
  isVideo: boolean;
  isNews: boolean;
}

export interface BreadcrumbItemShape {
  name: string;
  path: string;
}

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
  breadcrumbItems?: BreadcrumbItemShape[];
  relatedArticles?: RelatedArticleShape[];
  prevArticle?: RelatedArticleShape | null;
  nextArticle?: RelatedArticleShape | null;
}

function ShareButtons({ title, href }: { title: string; href: string }) {
  const encodedUrl = encodeURIComponent(href);
  const encodedTitle = encodeURIComponent(title);
  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  return (
    <div className="flex items-center gap-2">
      <span className="text-body-sm font-medium text-text-secondary">
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
  breadcrumbItems = [],
  relatedArticles = [],
  prevArticle,
  nextArticle,
}: InvestorEducationArticleTemplateProps) {
  const displayAuthor =
    sanitizeArticleAuthorName(author) || DEFAULT_ARTICLE_AUTHOR;
  const displayReadTime = formatArticleReadTime(readingTime);
  const hasMeta = true;

  return (
    <div className="bg-surface-bg">
      <article>
        <Container className="pt-8 pb-4">
          {/* Breadcrumb */}
          {breadcrumbItems.length > 0 && (
            <Breadcrumb className="mb-6">
              <BreadcrumbList>
                {breadcrumbItems.map((item, i) => (
                  <BreadcrumbItem key={item.path}>
                    {i > 0 && <BreadcrumbSeparator />}
                    {i === breadcrumbItems.length - 1 ? (
                      <span className="text-body-xs text-text-tertiary">
                        {cleanCopy(item.name)}
                      </span>
                    ) : (
                      <BreadcrumbLink href={`/${item.path}`}>
                        {cleanCopy(item.name)}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          )}

          {/* Hero */}
          <section className="flex flex-col items-center text-center">
            <div className="mx-auto w-full max-w-3xl">
              {hasMeta && (
                <div className="mb-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center">
                  <span className="flex size-6 shrink-0 items-center justify-center overflow-hidden rounded-full bg-surface-stroke text-body-xs font-medium text-text-secondary">
                    {displayAuthor[0]?.toUpperCase() ?? "?"}
                  </span>
                  <TextSmall className="text-text-secondary">
                    {cleanCopy(displayAuthor)}
                  </TextSmall>
                  <span className="text-text-tertiary" aria-hidden>
                    ·
                  </span>
                  <TextSmall className="text-text-tertiary">
                    {cleanCopy(displayReadTime)}
                  </TextSmall>
                </div>
              )}
              <H1 className="text-text-primary">{title}</H1>
              {description && (
                <TextLarge className="mt-4 max-w-2xl text-text-secondary">
                  {cleanCopy(description)}
                </TextLarge>
              )}
            </div>
          </section>

          {/* Hero media */}
          {(heroVideoEmbed || heroImageUrl) && (
            <section className="mt-8 w-full">
              <Container className="max-w-4xl">
                {heroVideoEmbed ?? (
                  heroImageUrl && (
                    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-surface-stroke">
                      <Image
                        src={heroImageUrl}
                        alt={title ? `Hero image for ${title}` : "Article hero image"}
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 1024px) 100vw, 896px"
                      />
                    </div>
                  )
                )}
              </Container>
            </section>
          )}

          {/* Content card (overlapping) */}
          <section className="-mt-20">
            <Container className="max-w-3xl">
              <div className="rounded-2xl border border-surface-stroke bg-surface-card p-6 shadow-sm md:p-8">
                <div className="readable-line-length">
                  {bodyContent ?? null}
                  {externalLink && (
                    <div className="mt-8">
                      <Link
                        href={externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-full bg-system-brand px-6 py-3 text-white transition-colors hover:bg-system-brand/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system-brand"
                      >
                        {category === "Video" ? "Watch" : "Read more"}
                      </Link>
                    </div>
                  )}
                </div>

                {/* Article footer meta */}
                <div className="mt-8 flex flex-col gap-4 border-t border-surface-stroke pt-8 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-wrap items-center gap-2">
                    {category && (
                      <Link
                        href="/investor-education"
                        className="rounded-full border border-surface-stroke bg-surface-bg px-3 py-1.5 text-body-sm font-medium text-text-secondary transition-colors hover:border-system-brand hover:text-system-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system-brand"
                      >
                        {cleanCopy(category)}
                      </Link>
                    )}
                  </div>
                  {shareUrl ? (
                    <ShareButtons title={title} href={shareUrl} />
                  ) : null}
                </div>

                {/* Tags + Author row */}
                <div className="mt-6 grid gap-4 md:grid-cols-12">
                  <div className="rounded-xl border border-surface-stroke bg-surface-bg p-4 md:col-span-5">
                    <TextSmall className="mb-2 font-semibold uppercase tracking-wide text-text-tertiary">
                      {cleanCopy("Tags")}
                    </TextSmall>
                    <div className="flex flex-wrap gap-2">
                      {category && (
                        <Link
                          href="/investor-education"
                          className="rounded-full border border-surface-stroke px-3 py-1 text-body-sm text-text-secondary hover:border-system-brand hover:text-system-brand"
                        >
                          {cleanCopy(category)}
                        </Link>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-4 rounded-xl border border-surface-stroke bg-surface-bg p-4 md:col-span-7">
                    <span className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-surface-stroke text-body font-semibold text-text-secondary">
                      {displayAuthor[0]?.toUpperCase() ?? "?"}
                    </span>
                    <div className="min-w-0">
                      <TextSmall className="font-semibold text-text-primary">
                        {cleanCopy(displayAuthor)}
                      </TextSmall>
                      <TextSmall className="mt-0.5 text-text-secondary">
                        {cleanCopy(
                          "Content and insights from the Mahaana team to help you make informed decisions."
                        )}
                      </TextSmall>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </section>

          {/* Prev/Next */}
          {(prevArticle || nextArticle) && (
            <section className="mt-12">
              <Container className="max-w-3xl">
                <div className="grid gap-4 sm:grid-cols-2">
                  {prevArticle ? (
                    <Link
                      href={prevArticle.href}
                      className="group flex gap-3 rounded-xl border border-surface-stroke bg-surface-card p-4 transition-colors hover:border-system-brand/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system-brand"
                    >
                      <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={prevArticle.imageUrl}
                          alt=""
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                          sizes="80px"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <TextSmall className="font-semibold uppercase tracking-wide text-text-tertiary">
                          {cleanCopy("Prev")}
                        </TextSmall>
                        <p className="mt-0.5 line-clamp-2 text-body-sm font-medium text-text-primary group-hover:text-system-brand">
                          {cleanCopy(prevArticle.title)}
                        </p>
                        <TextSmall className="mt-1 text-text-tertiary">
                          {cleanCopy(
                            prevArticle.isVideo
                              ? formatVideoWatchTimeDisplay(prevArticle.readTime)
                              : prevArticle.isNews
                                ? formatNewsOutletDisplay(prevArticle.authorName)
                                : formatArticleCardMeta({
                                    authorName: prevArticle.authorName,
                                    readTime: prevArticle.readTime,
                                  })
                          )}
                        </TextSmall>
                      </div>
                    </Link>
                  ) : (
                    <div />
                  )}
                  {nextArticle ? (
                    <Link
                      href={nextArticle.href}
                      className="group flex flex-row-reverse gap-3 rounded-xl border border-surface-stroke bg-surface-card p-4 transition-colors hover:border-system-brand/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system-brand sm:flex-row-reverse"
                    >
                      <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={nextArticle.imageUrl}
                          alt=""
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                          sizes="80px"
                        />
                      </div>
                      <div className="min-w-0 flex-1 text-left">
                        <TextSmall className="font-semibold uppercase tracking-wide text-text-tertiary">
                          {cleanCopy("Next")}
                        </TextSmall>
                        <p className="mt-0.5 line-clamp-2 text-body-sm font-medium text-text-primary group-hover:text-system-brand">
                          {cleanCopy(nextArticle.title)}
                        </p>
                        <TextSmall className="mt-1 text-text-tertiary">
                          {cleanCopy(
                            nextArticle.isVideo
                              ? formatVideoWatchTimeDisplay(nextArticle.readTime)
                              : nextArticle.isNews
                                ? formatNewsOutletDisplay(nextArticle.authorName)
                                : formatArticleCardMeta({
                                    authorName: nextArticle.authorName,
                                    readTime: nextArticle.readTime,
                                  })
                          )}
                        </TextSmall>
                      </div>
                    </Link>
                  ) : null}
                </div>
              </Container>
            </section>
          )}

          {/* Comments placeholder */}
          <section className="mt-12">
            <Container className="max-w-3xl">
              <H3 className="text-text-primary">{cleanCopy("Comments")}</H3>
              <TextRegular className="mt-2 text-text-tertiary">
                {cleanCopy("No comments yet.")}
              </TextRegular>
            </Container>
          </section>

          {/* Get in Touch form */}
          <section className="mt-12">
            <Container className="max-w-3xl">
              <GetInTouchForm />
            </Container>
          </section>

          {/* Related posts */}
          {relatedArticles.length > 0 && (
            <section className="mt-16">
              <Container>
                <p className="mb-6 text-body-sm font-semibold uppercase tracking-wide text-system-brand">
                  {cleanCopy("Related posts")}
                </p>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {relatedArticles.map((post) => (
                    <Link
                      key={post.slug}
                      href={post.href}
                      className="group block overflow-hidden rounded-xl border border-surface-stroke bg-surface-card shadow-sm transition-shadow hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system-brand"
                    >
                      <div className="relative aspect-[16/10] w-full overflow-hidden">
                        <Image
                          src={post.imageUrl}
                          alt=""
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 25vw"
                        />
                      </div>
                      <div className="p-4">
                        <p className="line-clamp-2 font-medium text-text-primary group-hover:text-system-brand">
                          {cleanCopy(post.title)}
                        </p>
                        <TextSmall className="mt-1 text-text-tertiary">
                          {cleanCopy(
                            post.isVideo
                              ? formatVideoWatchTimeDisplay(post.readTime)
                              : post.isNews
                                ? formatNewsOutletDisplay(post.authorName)
                                : formatArticleCardMeta({
                                    authorName: post.authorName,
                                    readTime: post.readTime,
                                  })
                          )}
                        </TextSmall>
                      </div>
                    </Link>
                  ))}
                </div>
              </Container>
            </section>
          )}

        </Container>
      </article>
    </div>
  );
}
