import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildPageMetadata } from "@/lib/metadata";
import { SITE_URL } from "@/lib/metadata";
import {
  getInvestorEducationBySlug,
  getInvestorEducationSlugs,
  getInvestorEducations,
} from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/image";
import type { SanityInvestorEducation } from "@/lib/sanity/types";
import {
  DEFAULT_ARTICLE_AUTHOR,
  formatArticleReadTime,
  sanitizeArticleAuthorName,
} from "@/lib/formatters";
import { ArticleStructuredData } from "@/components/ArticleStructuredData";
import { BreadcrumbStructuredData } from "@/components/BreadcrumbStructuredData";
import {
  type RelatedArticleShape,
  InvestorEducationArticleTemplate,
} from "@/components/sections/InvestorEducationArticleTemplate";
import { PortableTextRenderer } from "@/components/ui/PortableTextRenderer";
import type { PortableTextBlock } from "@portabletext/types";

function toRelatedShape(item: SanityInvestorEducation): RelatedArticleShape {
  const slug = item.slug?.current ?? item._id;
  const isExternal =
    (item.category === "Video" || item.category === "News") &&
    item.externalLink?.startsWith("http");
  const href = isExternal
    ? item.externalLink!
    : `/investor-education/${slug}`;
  const imageUrl =
    item.thumbnail != null
      ? urlFor(item.thumbnail).width(400).height(225).url()
      : item.thumbnailUrl ?? "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-8-wide.svg";
  return {
    slug,
    title: item.title ?? "Untitled",
    imageUrl,
    href,
    authorName: sanitizeArticleAuthorName(item.author) || DEFAULT_ARTICLE_AUTHOR,
    readTime: formatArticleReadTime(item.readingTime),
    isVideo: item.category === "Video",
    isNews: item.category === "News",
  };
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getInvestorEducationSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getInvestorEducationBySlug(slug);
  if (!item?.title) return {};
  return buildPageMetadata({
    title: `${item.title} | Mahaana`,
    description: item.excerpt ?? "Investor education article from Mahaana.",
    path: `investor-education/${slug}`,
  });
}

function isVideoEmbedUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return (
      u.hostname.includes("youtube.com") ||
      u.hostname.includes("youtu.be") ||
      u.hostname.includes("vimeo.com")
    );
  } catch {
    return false;
  }
}

function embedUrl(url: string): string {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com") && u.searchParams.has("v")) {
      return `https://www.youtube.com/embed/${u.searchParams.get("v")}`;
    }
    if (u.hostname === "youtu.be") {
      return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
    }
    if (u.hostname.includes("vimeo.com")) {
      const id = u.pathname.split("/").filter(Boolean).pop();
      return id ? `https://player.vimeo.com/video/${id}` : url;
    }
  } catch {
    // ignore
  }
  return url;
}

export default async function InvestorEducationSlugPage({ params }: Props) {
  const { slug } = await params;
  const [item, allItems] = await Promise.all([
    getInvestorEducationBySlug(slug),
    getInvestorEducations(),
  ]);
  if (!item) notFound();

  const title = item.title ?? "Untitled";
  const excerpt = item.excerpt ?? null;
  const author = sanitizeArticleAuthorName(item.author) || null;
  const publishedAt = item.publishedAt ?? null;
  const readingTime = item.readingTime ?? null;
  const isVideo = item.category === "Video";
  const imageUrl = item.thumbnail
    ? urlFor(item.thumbnail).width(1200).height(630).url()
    : item.thumbnailUrl ?? null;
  const bodyBlocks =
    item.bodyHtml && Array.isArray(item.bodyHtml)
      ? (item.bodyHtml as PortableTextBlock[])
      : null;

  const sortedList = [...allItems].sort((a, b) => {
    const aPub = a.publishedAt ?? "";
    const bPub = b.publishedAt ?? "";
    if (bPub !== aPub) return bPub.localeCompare(aPub);
    const aCreated = a._createdAt ?? "";
    const bCreated = b._createdAt ?? "";
    return bCreated.localeCompare(aCreated);
  });
  const currentIndex = sortedList.findIndex(
    (i) => (i.slug?.current ?? i._id) === slug
  );
  const prevItem = currentIndex > 0 ? sortedList[currentIndex - 1] : null;
  const nextItem =
    currentIndex >= 0 && currentIndex < sortedList.length - 1
      ? sortedList[currentIndex + 1]
      : null;
  const relatedArticles = sortedList
    .filter((i) => (i.slug?.current ?? i._id) !== slug)
    .slice(0, 4)
    .map(toRelatedShape);
  const prevArticle = prevItem ? toRelatedShape(prevItem) : null;
  const nextArticle = nextItem ? toRelatedShape(nextItem) : null;

  const breadcrumbItems = [
    { name: "Investor Education", path: "investor-education" },
    { name: title, path: `investor-education/${slug}` },
  ];

  const heroVideoEmbed =
    isVideo &&
    item.externalLink &&
    isVideoEmbedUrl(item.externalLink) ? (
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black">
        <iframe
          src={embedUrl(item.externalLink)}
          title={title}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    ) : undefined;

  return (
    <>
      <BreadcrumbStructuredData items={breadcrumbItems} />
      <ArticleStructuredData
        title={title}
        description={excerpt ?? ""}
        slug={slug}
        author={author}
        publishedAt={publishedAt}
        imageUrl={imageUrl}
      />
      <InvestorEducationArticleTemplate
        title={title}
        description={excerpt}
        author={author}
        publishedAt={publishedAt}
        readingTime={readingTime}
        heroImageUrl={isVideo ? undefined : imageUrl ?? undefined}
        heroVideoEmbed={heroVideoEmbed}
        bodyContent={
          bodyBlocks && bodyBlocks.length > 0 ? (
            <PortableTextRenderer value={bodyBlocks} />
          ) : undefined
        }
        externalLink={item.externalLink ?? undefined}
        category={item.category ?? undefined}
        shareUrl={`${SITE_URL}/investor-education/${slug}`}
        breadcrumbItems={breadcrumbItems}
        relatedArticles={relatedArticles}
        prevArticle={prevArticle}
        nextArticle={nextArticle}
      />
    </>
  );
}
