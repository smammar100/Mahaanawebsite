"use client";

import { ArrowRight } from "@untitledui/icons";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/base/buttons/button";
import { BlogCard } from "@/components/sections/BlogCard";
import { H3, TextRegular } from "@/components/ui/Typography";
import { cleanCopy } from "@/lib/copy-utils";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

interface BlogPost {
  title: string;
  excerpt: string;
  authorName: string;
  authorImageUrl: string;
  readTime: string;
  imageUrl: string;
  href: string;
}

const BLOG_POSTS_FALLBACK: BlogPost[] = [
  {
    title: "How to build a successful brand and business online in 2024",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    authorName: "John Doe",
    authorImageUrl: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
    readTime: "10 Min Read",
    imageUrl: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-8-wide.svg",
    href: "#",
  },
  {
    title: "The difference between UI and UX and how to design for both",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    authorName: "Jane Doe",
    authorImageUrl: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
    readTime: "14 Min Read",
    imageUrl: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-8-wide.svg",
    href: "#",
  },
  {
    title: "Optimizing your website for SEO and getting more traffic",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    authorName: "Jane Smith",
    authorImageUrl: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
    readTime: "9 Min Read",
    imageUrl: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-8-wide.svg",
    href: "#",
  },
];

interface BlogSectionProps {
  className?: string;
  /** Posts from Sanity; falls back to hardcoded list when empty or undefined. */
  posts?: BlogPost[];
  /** Optional: override section heading (e.g. "In news & media"). */
  heading?: string;
  /** Optional: override eyebrow label above heading. */
  eyebrow?: string;
  /** Optional: override description below heading. */
  description?: string;
  /** Optional: "View all" link href. Default: /investor-education */
  viewAllHref?: string;
  /** Optional: "View all" button label. Default: View all */
  viewAllLabel?: string;
}

export function BlogSection({
  className,
  posts,
  heading: headingProp,
  eyebrow: eyebrowProp,
  description: descriptionProp,
  viewAllHref = "/investor-education",
  viewAllLabel = "View all",
}: BlogSectionProps) {
  const list = posts?.length ? posts : BLOG_POSTS_FALLBACK;
  const { ref, isVisible } = useInView(0.15);
  const heading = headingProp ?? "Discover the latest trends";
  const eyebrow = eyebrowProp ?? "Our Blogs";
  const description =
    descriptionProp ??
    "Explore our blog for insightful articles, personal reflections and ideas that inspire action on the topics you care about.";
  return (
    <section
      ref={ref}
      className={cn(
        "section-fade-in-up border-t border-surface-stroke py-8 sm:py-10 md:py-12 lg:py-14 xl:py-16",
        isVisible && "visible",
        className
      )}
      aria-labelledby="blog-heading"
    >
      <Container className="flex flex-col gap-12 sm:gap-16 lg:gap-10">
        {/* Header - left aligned, eyebrow matches other sections */}
        <div className="flex flex-col items-start">
          <div className="flex flex-col items-start gap-2">
            <p className="text-label text-system-brand">
              {cleanCopy(eyebrow)}
            </p>
            <H3 id="blog-heading" className="text-text-primary w-full max-w-3xl">
              {heading}
            </H3>
          </div>
          <TextRegular className="mt-4 max-w-2xl text-text-tertiary">
            {cleanCopy(description)}
          </TextRegular>
            <Button href={viewAllHref} color="secondary" size="md" iconTrailing={ArrowRight} className="mt-6 w-fit">
            {cleanCopy(viewAllLabel)}
          </Button>
        </div>

        {/* Cards grid */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((post, index) => (
            <BlogCard
              key={index}
              title={post.title}
              imageUrl={post.imageUrl}
              href={post.href}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
