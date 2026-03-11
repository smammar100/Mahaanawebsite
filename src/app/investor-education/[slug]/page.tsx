import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildPageMetadata } from "@/lib/metadata";
import {
  getInvestorEducationBySlug,
  getInvestorEducationSlugs,
} from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/image";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Container } from "@/components/layout/Container";
import { H1, TextRegular } from "@/components/ui/Typography";
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
    description: item.tldr ?? "Investor education article from Mahaana.",
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
  const isVideo = item.category === "Video";
  const imageUrl = item.thumbnailImage
    ? urlFor(item.thumbnailImage).width(1200).height(630).url()
    : item.thumbnailImageUrl ?? null;
  const bodyBlocks =
    item.blogBodyText && Array.isArray(item.blogBodyText)
      ? (item.blogBodyText as PortableTextBlock[])
      : null;

  return (
    <div className="bg-surface-bg">
      <article>
        <AnimatedSection className="py-12 sm:py-16 lg:py-24">
          <Container className="max-w-3xl">
            <span className="font-body text-tiny font-semibold uppercase tracking-wide text-system-brand">
              {item.category ?? "Article"}
            </span>
            <H1 className="mt-2 text-text-primary">{title}</H1>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              {item.authorName ? (
                <span className="font-body text-regular text-text-secondary">
                  {item.authorName}
                </span>
              ) : null}
              {item.readingTime ? (
                <span className="font-body text-regular text-text-tertiary">
                  {item.readingTime}
                </span>
              ) : null}
            </div>
            {item.tldr ? (
              <TextRegular className="mt-6 text-text-secondary">
                {item.tldr}
              </TextRegular>
            ) : null}
          </Container>
        </AnimatedSection>

        {imageUrl && !isVideo ? (
          <AnimatedSection className="px-4 sm:px-6 md:px-8 lg:px-12">
            <Container className="max-w-4xl">
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
                <Image
                  src={imageUrl}
                  alt=""
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 896px"
                />
              </div>
            </Container>
          </AnimatedSection>
        ) : null}

        {isVideo && item.link && isVideoEmbedUrl(item.link) ? (
          <AnimatedSection className="px-4 sm:px-6 md:px-8 lg:px-12">
            <Container className="max-w-4xl">
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black">
                <iframe
                  src={embedUrl(item.link)}
                  title={title}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </Container>
          </AnimatedSection>
        ) : null}

        {item.cta && item.link ? (
          <AnimatedSection className="px-4 sm:px-6 md:px-8 lg:px-12">
            <Container className="max-w-3xl">
              <Link
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-system-brand px-6 py-3 font-body text-regular font-semibold text-white transition-colors hover:bg-system-brand/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system-brand"
              >
                {item.cta}
              </Link>
            </Container>
          </AnimatedSection>
        ) : null}

        {bodyBlocks && bodyBlocks.length > 0 ? (
          <AnimatedSection className="py-12 sm:py-16">
            <Container className="max-w-3xl">
              <PortableTextRenderer value={bodyBlocks} />
            </Container>
          </AnimatedSection>
        ) : null}
      </article>
    </div>
  );
}
