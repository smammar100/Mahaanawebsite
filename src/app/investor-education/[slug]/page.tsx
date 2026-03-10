import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { buildPageMetadata } from "@/lib/metadata";
import { getPostBySlug, getPostSlugs } from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/image";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Container } from "@/components/layout/Container";
import { H1, TextRegular } from "@/components/ui/Typography";
import { PortableTextRenderer } from "@/components/ui/PortableTextRenderer";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post?.title) return {};
  return buildPageMetadata({
    title: `${post.title} | Mahaana`,
    description: post.excerpt ?? "Investor education article from Mahaana.",
    path: `investor-education/${slug}`,
  });
}

export default async function InvestorEducationSlugPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const title = post.title ?? "Untitled";
  const isVideo = post.type === "video";
  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : null;
  const authorImageUrl = post.author?.image
    ? urlFor(post.author.image).width(96).height(96).url()
    : null;

  return (
    <div className="bg-surface-bg">
      <article>
        <AnimatedSection className="py-12 sm:py-16 lg:py-24">
          <Container className="max-w-3xl">
            <span className="font-body text-tiny font-semibold uppercase tracking-wide text-system-brand">
              {post.type}
            </span>
            <H1 className="mt-2 text-text-primary">{title}</H1>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              {post.author?.name ? (
                <span className="font-body text-regular text-text-secondary">
                  {post.author.name}
                </span>
              ) : null}
              {post.publishedAt ? (
                <time
                  dateTime={post.publishedAt}
                  className="font-body text-regular text-text-tertiary"
                >
                  {new Date(post.publishedAt).toLocaleDateString("en-PK", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              ) : null}
              {post.readTime ? (
                <span className="font-body text-regular text-text-tertiary">
                  {post.readTime}
                </span>
              ) : null}
            </div>
            {post.excerpt ? (
              <TextRegular className="mt-6 text-text-secondary">
                {post.excerpt}
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

        {isVideo && post.videoUrl ? (
          <AnimatedSection className="px-4 sm:px-6 md:px-8 lg:px-12">
            <Container className="max-w-4xl">
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black">
                <iframe
                  src={post.videoUrl}
                  title={title}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </Container>
          </AnimatedSection>
        ) : null}

        {!isVideo && post.body && Array.isArray(post.body) && post.body.length > 0 ? (
          <AnimatedSection className="py-12 sm:py-16">
            <Container className="max-w-3xl">
              <PortableTextRenderer value={post.body} />
            </Container>
          </AnimatedSection>
        ) : null}
      </article>
    </div>
  );
}
