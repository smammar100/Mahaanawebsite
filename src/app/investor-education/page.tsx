import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/metadata";
import { getInvestorEducations } from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/image";
import type { SanityInvestorEducation } from "@/lib/sanity/types";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Container } from "@/components/layout/Container";
import { H1, H2, TextRegular, TextSmall } from "@/components/ui/Typography";

export const metadata: Metadata = buildPageMetadata({
  title: "Investor Education | Mahaana",
  description: "Learn about investing, savings, and financial planning with Mahaana.",
  path: "investor-education",
});

const CATEGORIES = [
  { id: "Article" as const, label: "Blogs" },
  { id: "News" as const, label: "News" },
  { id: "Video" as const, label: "Videos" },
];

function PostCard({ item }: { item: SanityInvestorEducation }) {
  const slug = item.slug?.current ?? item._id;
  const href = `/investor-education/${slug}`;
  const imageUrl = item.thumbnailImage
    ? urlFor(item.thumbnailImage).width(600).height(340).url()
    : item.thumbnailImageUrl ?? "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-8-wide.svg";

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
          {item.category ?? "Article"}
        </span>
        <h3 className="mt-1 mb-1 font-body text-large font-semibold leading-[150%] text-text-primary line-clamp-2">
          {item.title ?? "Untitled"}
        </h3>
        <TextSmall className="line-clamp-2 text-text-tertiary">
          {item.tldr ?? ""}
        </TextSmall>
        <div className="my-5 border-t border-surface-stroke" aria-hidden />
        <div className="flex items-center gap-3">
          <TextSmall weight="medium" className="text-text-primary">
            {item.authorName ?? "Mahaana"}
          </TextSmall>
          {item.readingTime ? (
            <span className="rounded-full bg-gray-100 px-2 py-0.5 font-body text-tiny font-medium text-text-tertiary">
              {item.readingTime}
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}

export default async function InvestorEducationPage() {
  const allItems = await getInvestorEducations();
  const byCategory = {
    Article: allItems.filter((p) => p.category === "Article"),
    News: allItems.filter((p) => p.category === "News"),
    Video: allItems.filter((p) => p.category === "Video"),
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

      {CATEGORIES.map(({ id, label }) => {
        const items = byCategory[id];
        if (!items.length) return null;
        return (
          <AnimatedSection
            key={id}
            className="border-t border-surface-stroke py-8 sm:py-10 md:py-12"
          >
            <Container>
              <H2 className="text-text-primary mb-6">{label}</H2>
              <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                  <PostCard key={item._id} item={item} />
                ))}
              </div>
            </Container>
          </AnimatedSection>
        );
      })}

      {allItems.length === 0 ? (
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
