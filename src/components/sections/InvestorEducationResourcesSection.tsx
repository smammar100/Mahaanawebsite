"use client";

import { useCallback, useMemo, useState } from "react";

import { Button } from "@/components/base/buttons/button";
import { BlogCard } from "@/components/sections/BlogCard";
import { Container } from "@/components/layout/Container";
import { H1, TextLarge } from "@/components/ui/Typography";
import { urlFor } from "@/lib/sanity/image";
import type { SanityInvestorEducation } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";
import { cleanCopy } from "@/lib/copy-utils";

const AUTHOR_AVATAR_FALLBACK =
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp";

interface PostShape {
  id: string;
  categoryLabel: string;
  categoryValue: "Article" | "News" | "Video";
  title: string;
  summary: string;
  link: string;
  cta: string;
  thumbnail: string;
  openExternal?: boolean;
  authorName: string;
  authorImageUrl: string;
  readTime: string;
  imageUrl: string;
  href: string;
}

interface CategoryOption {
  label: string;
  value: string;
}

const POSTS_PER_PAGE = 6;

const CATEGORY_OPTIONS: CategoryOption[] = [
  { label: "All", value: "all" },
  { label: "Articles", value: "Article" },
  { label: "News and Trends", value: "News" },
  { label: "Videos & Podcasts", value: "Video" },
];

const CATEGORY_LABELS: Record<"Article" | "News" | "Video", string> = {
  Article: "Articles",
  News: "News and Trends",
  Video: "Videos & Podcasts",
};

function mapItemToPost(item: SanityInvestorEducation): PostShape {
  const category = item.category ?? "Article";
  const slug = item.slug?.current ?? item._id;
  const isVideoOrNews = category === "Video" || category === "News";
  const openExternal =
    isVideoOrNews && item.externalLink?.startsWith("http");
  const link = openExternal
    ? item.externalLink!
    : `/investor-education/${slug}`;
  const imageUrl =
    item.thumbnail != null
      ? urlFor(item.thumbnail).width(600).height(340).url()
      : item.thumbnailUrl ??
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-8-wide.svg";
  const cta = category === "Video" ? cleanCopy("Watch") : cleanCopy("Read more");
  return {
    id: item._id,
    categoryLabel: CATEGORY_LABELS[category],
    categoryValue: category,
    title: cleanCopy(item.title ?? "Untitled"),
    summary: item.excerpt ?? "",
    link,
    cta,
    thumbnail: imageUrl,
    openExternal,
    authorName: item.author ? cleanCopy(item.author) : cleanCopy("Mahaana"),
    authorImageUrl: AUTHOR_AVATAR_FALLBACK,
    readTime: item.readingTime ?? "5 Min Read",
    imageUrl,
    href: link,
  };
}

type CategoryTabValue = "all" | "Article" | "News" | "Video";

interface InvestorEducationResourcesSectionProps {
  items: SanityInvestorEducation[];
  className?: string;
}

export function InvestorEducationResourcesSection({
  items,
  className,
}: InvestorEducationResourcesSectionProps) {
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);
  const [selectedTab, setSelectedTab] = useState<CategoryTabValue>("all");

  const handleTabChange = useCallback((tab: CategoryTabValue) => {
    setSelectedTab(tab);
    setVisibleCount(POSTS_PER_PAGE);
  }, []);

  const handleLoadMore = useCallback(() => {
    setVisibleCount((prev) => prev + POSTS_PER_PAGE);
  }, []);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const aDate = a._createdAt ?? "";
      const bDate = b._createdAt ?? "";
      if (bDate < aDate) return -1;
      if (bDate > aDate) return 1;
      return 0;
    });
  }, [items]);

  const posts = useMemo(() => sortedItems.map(mapItemToPost), [sortedItems]);

  const filteredPosts = useMemo(() => {
    if (selectedTab === "all") return posts;
    return posts.filter((post) => post.categoryValue === selectedTab);
  }, [posts, selectedTab]);

  const postsToDisplay = filteredPosts.length > 0 ? filteredPosts : posts;
  const primaryPost = posts[0];
  const listPosts = primaryPost
    ? postsToDisplay.filter((post) => post.id !== primaryPost.id)
    : postsToDisplay;
  const hasMore = visibleCount < listPosts.length;
  const displayPosts = listPosts.slice(0, visibleCount);

  return (
    <div className={cn("pb-32", className)}>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-400 via-[#3d1a7a] to-primary-400 pt-[calc(4.5rem+env(safe-area-inset-top,0px))] pb-0">
        <div className="bg-transparent">
          <Container className="flex flex-col items-start justify-start gap-16 pt-20 pb-20 lg:flex-row lg:items-center lg:justify-between lg:pb-20">
            <div className="flex w-full flex-col justify-between gap-12">
              <div className="flex w-full max-w-[36rem] flex-col gap-8">
                <div className="flex w-full flex-col gap-5">
                  <H1 className="text-white">
                    Resources and insights
                  </H1>
                  <TextLarge className="font-semibold text-white/90">
                    The latest industry news, interviews, technologies, and
                    resources.
                  </TextLarge>
                </div>
              </div>
            </div>
            {primaryPost && (
              <div className="w-full max-w-[27.5rem]">
                <BlogCard
                  title={primaryPost.title}
                  imageUrl={primaryPost.imageUrl}
                  href={primaryPost.href}
                  openExternal={primaryPost.openExternal}
                  showPlayButton={primaryPost.categoryValue === "Video"}
                />
              </div>
            )}
          </Container>
        </div>
      </section>

      {/* List */}
      <section className="pt-0 pb-12 sm:pb-16 lg:pb-24">
        <Container className="flex flex-col gap-8 justify-start items-center pt-20 pb-20">
          <div
            className="fund-tab-list flex w-fit min-h-[44px] max-w-full flex-nowrap justify-center overflow-x-auto snap-x snap-mandatory gap-1 rounded-full bg-gray-100 p-1.5"
            role="tablist"
            aria-label="Content category"
          >
            {CATEGORY_OPTIONS.map((tab) => {
              const value = tab.value as CategoryTabValue;
              const isActive = selectedTab === value;
              return (
                <button
                  key={tab.value}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleTabChange(value)}
                  className={cn(
                    "min-h-[44px] shrink-0 snap-start rounded-full px-4 py-3 text-center whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system-brand sm:px-5",
                    isActive
                      ? "bg-white border border-white text-text-primary font-semibold shadow-sm"
                      : "font-medium text-text-tertiary hover:bg-white/80 hover:text-text-primary"
                  )}
                >
                  {cleanCopy(tab.label)}
                </button>
              );
            })}
          </div>
          <div className="flex w-full flex-col gap-4">
            <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
              {displayPosts.map((post) => (
                <BlogCard
                  key={post.id}
                  title={post.title}
                  imageUrl={post.imageUrl}
                  href={post.href}
                  openExternal={post.openExternal}
                  showPlayButton={post.categoryValue === "Video"}
                />
              ))}
            </div>
            {hasMore && (
              <Button
                color="secondary"
                size="md"
                className="w-full"
                onClick={handleLoadMore}
              >
                {cleanCopy("Load more")}
              </Button>
            )}
          </div>
        </Container>
      </section>
    </div>
  );
}
