import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildPageMetadata } from "@/lib/metadata";
import {
  getInvestorEducationBySlug,
  getInvestorEducationSlugs,
} from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/image";
import { InvestorEducationArticleTemplate } from "@/components/sections/InvestorEducationArticleTemplate";
import { PortableTextRenderer } from "@/components/ui/PortableTextRenderer";
import type { PortableTextBlock } from "@portabletext/types";

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
  const item = await getInvestorEducationBySlug(slug);
  if (!item) notFound();

  const title = item.title ?? "Untitled";
  const excerpt = item.excerpt ?? null;
  const author = item.author ?? null;
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
    />
  );
}
