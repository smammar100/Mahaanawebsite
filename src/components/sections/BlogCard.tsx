"use client";

import Image from "next/image";
import Link from "next/link";
import { cleanCopy } from "@/lib/copy-utils";
import {
  DEFAULT_ARTICLE_AUTHOR,
  formatArticleCardMeta,
  formatArticleReadTime,
  formatNewsOutletDisplay,
  formatVideoWatchTimeDisplay,
} from "@/lib/formatters";
import { cn } from "@/lib/utils";

export interface BlogCardProps {
  title: string;
  imageUrl: string;
  href: string;
  openExternal?: boolean;
  /** Show a play icon overlay on the thumbnail (e.g. for video items) */
  showPlayButton?: boolean;
  authorName?: string;
  readTime?: string;
  /** When true, footer shows watch duration only (no author). */
  isVideo?: boolean;
  /** When true, footer shows outlet/byline only (no read time). */
  isNews?: boolean;
  className?: string;
}

export function BlogCard({
  title,
  imageUrl,
  href,
  openExternal,
  showPlayButton = false,
  authorName,
  readTime,
  isVideo = false,
  isNews = false,
  className,
}: BlogCardProps) {
  const linkProps = openExternal
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  const cardClassName =
    "block overflow-hidden rounded-xl border border-surface-stroke bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-colors hover:border-surface-stroke hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system-brand dark:bg-surface-card dark:shadow-[0_1px_3px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)]";

  const content = (
    <>
      <div className="relative aspect-video w-full overflow-hidden rounded-t-xl">
        <Image
          src={imageUrl}
          alt={title ? `Featured image for ${title}` : "Blog post image"}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {showPlayButton && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-t-xl"
            aria-hidden
          >
            <span className="flex items-center justify-center w-14 h-14 rounded-full bg-white/90 text-system-brand shadow-lg ring-2 ring-white/50">
              <svg
                className="w-6 h-6 ml-1 shrink-0"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
              >
                <path d="M8 5v14l11-7L8 5z" />
              </svg>
            </span>
          </div>
        )}
      </div>
      <div className="px-5 pt-5 pb-5 min-w-0">
        <p className="text-card-title text-text-primary line-clamp-2">
          {title}
        </p>
        <p className="mt-2 text-xs text-text-tertiary line-clamp-2">
          {cleanCopy(
            isVideo
              ? formatVideoWatchTimeDisplay(readTime)
              : isNews
                ? formatNewsOutletDisplay(authorName)
                : formatArticleCardMeta({
                    authorName: authorName ?? DEFAULT_ARTICLE_AUTHOR,
                    readTime: formatArticleReadTime(readTime),
                  })
          )}
        </p>
      </div>
    </>
  );

  if (openExternal) {
    return (
      <a
        href={href}
        className={cn(cardClassName, className)}
        {...linkProps}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={cn(cardClassName, className)}>
      {content}
    </Link>
  );
}
