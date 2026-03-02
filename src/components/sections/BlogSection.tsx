"use client";

import Image from "next/image";
import { ArrowRight } from "@untitledui/icons";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/base/buttons/button";
import { TextRegular, TextSmall } from "@/components/ui/Typography";
import { cx } from "@/utils/cx";

interface DataItem {
  title: string;
  content: string;
}

const DATA: DataItem[] = [
  {
    title: "Cloud Computing",
    content:
      "Exploring cost-effective cloud migration patterns and multi-cloud management",
  },
  {
    title: "Cybersecurity",
    content:
      "Implementing adaptive security frameworks for distributed workforces",
  },
  {
    title: "IoT",
    content: "Reducing latency in smart city deployments through fog computing",
  },
];

interface BlogSectionProps {
  className?: string;
}

export function BlogSection({ className }: BlogSectionProps) {
  return (
    <section
      className={cx(
        "border-t border-surface-stroke py-8 sm:py-10 md:py-12 lg:py-14 xl:py-16",
        className
      )}
      aria-labelledby="blog-heading"
    >
      <Container className="flex flex-col gap-6 sm:gap-8 lg:gap-10">
        {/* Header */}
        <div className="mb-0">
          <p className="font-body text-small font-semibold uppercase tracking-wide text-system-brand">
            Blog
          </p>
          <h2
            id="blog-heading"
            className="font-heading text-[2rem] font-semibold leading-[120%] tracking-heading text-text-primary sm:text-[2.5rem] lg:text-h2 mt-2"
          >
            Tech Insights
          </h2>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <TextRegular className="text-text-tertiary text-small sm:text-regular max-w-xl">
              Exploring cutting-edge technologies shaping tomorrow&apos;s digital
              landscape
            </TextRegular>
            <Button
              color="secondary"
              size="md"
              iconTrailing={ArrowRight}
              className="w-fit shrink-0 sm:ml-auto"
            >
              Read More
            </Button>
          </div>
        </div>

        {/* Content grid */}
        <div className="flex flex-col items-stretch gap-16 md:flex-row">
          {/* Main featured post */}
          <article className="flex h-full min-h-0 flex-col">
            <div className="relative w-full aspect-video overflow-hidden rounded-2xl">
              <Image
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-8-wide.svg"
                alt="Next-Gen AI: Transforming Business Operations"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <h3 className="font-heading text-xl font-semibold leading-[120%] tracking-heading text-text-primary sm:text-2xl lg:text-3xl mt-4">
              Next-Gen AI: Transforming Business Operations
            </h3>
            <div className="mt-6 flex items-center justify-between gap-4 sm:mt-8">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-lg sm:h-12 sm:w-12">
                  <Image
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp"
                    alt="Sarah Johnson"
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div className="flex flex-col">
                  <TextSmall weight="medium" className="text-text-primary">
                    Sarah Johnson
                  </TextSmall>
                  <TextSmall className="text-text-tertiary text-tiny sm:text-small">
                    AI Researcher
                  </TextSmall>
                </div>
              </div>
              <Button
                href="#"
                color="tertiary"
                size="sm"
                iconTrailing={ArrowRight}
                className="shrink-0"
              >
                Read More
              </Button>
            </div>
          </article>

          {/* Secondary posts list */}
          <div className="flex h-full min-h-0 flex-col gap-4">
            {DATA.map((post, index) => (
              <article
                key={index}
                className="flex items-start gap-4 border-b border-surface-stroke pb-6 last:border-b-0 last:pb-0"
              >
                <div className="relative w-[29%] shrink-0 aspect-video sm:w-[23%]">
                  <Image
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-8-wide.svg"
                    alt={post.title}
                    fill
                    className="rounded-lg object-cover"
                    sizes="(max-width: 640px) 25vw, 20vw"
                  />
                </div>
                <div className="flex flex-1 min-w-0 flex-col gap-3">
                  <TextRegular className="text-text-primary text-small leading-relaxed sm:text-regular">
                    {post.content}
                  </TextRegular>
                  <Button
                    href="#"
                    color="tertiary"
                    size="sm"
                    iconTrailing={ArrowRight}
                    className="w-fit"
                  >
                    Read More
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
