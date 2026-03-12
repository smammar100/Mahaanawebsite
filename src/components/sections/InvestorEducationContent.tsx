"use client";

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/image";
import type { SanityInvestorEducation } from "@/lib/sanity/types";
import { TextSmall } from "@/components/ui/Typography";
import { Button } from "@/components/base/buttons/button";
import { formatPublishedDate } from "@/lib/formatters";

function InvestorEducationCard({ item }: { item: SanityInvestorEducation }) {
  const slug = item.slug?.current ?? item._id;
  const isVideoOrNews = item.category === "Video" || item.category === "News";
  const openExternal =
    isVideoOrNews && item.externalLink && item.externalLink.startsWith("http");
  const href = openExternal ? item.externalLink! : `/investor-education/${slug}`;
  const imageUrl = item.thumbnail
    ? urlFor(item.thumbnail).width(600).height(340).url()
    : item.thumbnailUrl ?? "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-8-wide.svg";
  const dateStr = formatPublishedDate(item.publishedAt ?? undefined);
  const meta = [item.author ? `By ${item.author}` : null, dateStr].filter(Boolean).join(" · ") || "Mahaana";

  const linkProps = openExternal
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  return (
    <Link
      href={href}
      {...linkProps}
      className="flex min-h-[320px] flex-col gap-5 rounded-2xl bg-surface-card p-5 transition-colors hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system-brand"
    >
      <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-lg">
        <Image
          src={imageUrl}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <h3 className="font-heading text-[20px] font-medium leading-[30px] tracking-heading text-text-primary line-clamp-2">
          {item.title ?? "Untitled"}
        </h3>
        <TextSmall className="mt-auto pt-2 text-text-tertiary">
          {meta}
        </TextSmall>
      </div>
    </Link>
  );
}

/** Renders filtered list of cards, empty state, and See more. Pills and category state live in InvestorEducationLayout. */
export function InvestorEducationContent({
  items,
}: {
  items: SanityInvestorEducation[];
}) {
  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 xl:grid-cols-3">
        {items.map((item) => (
          <InvestorEducationCard key={item._id} item={item} />
        ))}
      </div>

      {items.length === 0 && (
        <p className="text-center font-body text-regular text-text-tertiary">
          No items in this category yet.
        </p>
      )}

      {items.length > 0 && (
        <div className="flex justify-center pt-4">
          <Button href="/investor-education" color="secondary" size="md">
            See more
          </Button>
        </div>
      )}
    </>
  );
}
