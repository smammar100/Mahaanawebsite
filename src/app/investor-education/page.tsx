import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/metadata";
import { getPosts } from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/image";
import type { SanityPost } from "@/lib/sanity/types";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Container } from "@/components/layout/Container";
import { H1, H2, TextRegular, TextSmall } from "@/components/ui/Typography";

export const metadata: Metadata = buildPageMetadata({
  title: "Investor Education | Mahaana",
  description: "Learn about investing, savings, and financial planning with Mahaana.",
  path: "investor-education",
});

const TYPES = [
  { id: "blog" as const, label: "Blogs" },
  { id: "news" as const, label: "News" },
  { id: "video" as const, label: "Videos" },
];

function PostCard({ post }: { post: SanityPost }) {
  const slug = post.slug?.current ?? post._id;
  const href = `/investor-education/${slug}`;
  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(600).height(340).url()
    : "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-8-wide.svg";
  const authorImageUrl = post.author?.image
    ? urlFor(post.author.image).width(48).height(48).url()
    : "";

  return (
    <Link
      href={href}
      className="rounded-xl border border-surface-stroke bg-[#f8f8f7] transition-colors hover:border-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system-brand dark:bg-surface-card"
    >
      <div className="p-2">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
          <Image
            src={imageUrl}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      </div>
      <div className="px-3 pt-2 pb-4 min-w-0">
        <span className="font-body text-tiny font-semibold uppercase tracking-wide text-system-brand">
          {post.type}
        </span>
        <h3 className="mt-1 mb-1 font-body text-large font-semibold leading-[150%] text-text-primary line-clamp-2">
          {post.title ?? "Untitled"}
        </h3>
        <TextSmall className="line-clamp-2 text-text-tertiary">
          {post.excerpt ?? ""}
        </TextSmall>
        <div className="my-5 border-t border-surface-stroke" aria-hidden />
        <div className="flex items-center gap-3">
          {authorImageUrl ? (
            <div className="relative size-9 shrink-0 overflow-hidden rounded-full ring-1 ring-input">
              <Image
                src={authorImageUrl}
                alt=""
                fill
                className="object-cover"
                sizes="36px"
              />
            </div>
          ) : null}
          <TextSmall weight="medium" className="text-text-primary">
            {post.author?.name ?? "Mahaana"}
          </TextSmall>
          {post.readTime ? (
            <span className="rounded-full bg-gray-100 px-2 py-0.5 font-body text-tiny font-medium text-text-tertiary">
              {post.readTime}
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}

export default async function InvestorEducationPage() {
  const allPosts = await getPosts();
  const byType = {
    blog: allPosts.filter((p) => p.type === "blog"),
    news: allPosts.filter((p) => p.type === "news"),
    video: allPosts.filter((p) => p.type === "video"),
  };

  return (
    <div className="bg-surface-bg">
      <AnimatedSection className="py-12 sm:py-16 lg:py-24">
        <Container>
          <H1 className="text-text-primary">Investor Education</H1>
          <TextRegular className="mt-4 max-w-prose text-text-secondary">
            Educational resources, articles, and guides to help you make informed
            investment decisions.
          </TextRegular>
        </Container>
      </AnimatedSection>

      {TYPES.map(({ id, label }) => {
        const posts = byType[id];
        if (!posts.length) return null;
        return (
          <AnimatedSection
            key={id}
            className="border-t border-surface-stroke py-8 sm:py-10 md:py-12"
          >
            <Container>
              <H2 className="text-text-primary mb-6">{label}</H2>
              <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            </Container>
          </AnimatedSection>
        );
      })}

      {allPosts.length === 0 ? (
        <AnimatedSection className="border-t border-surface-stroke py-12">
          <Container>
            <TextRegular className="text-text-tertiary">
              No content yet. Check back soon or visit our blog from the home
              page.
            </TextRegular>
          </Container>
        </AnimatedSection>
      ) : null}
    </div>
  );
}
