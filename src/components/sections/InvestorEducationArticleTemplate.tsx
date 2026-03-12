import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { H1, TextLarge, TextRegular, TextSmall } from "@/components/ui/Typography";
import { formatPublishedDate } from "@/lib/formatters";

export interface InvestorEducationArticleTemplateProps {
  title: string;
  description?: string | null;
  author?: string | null;
  publishedAt?: string | null;
  readingTime?: string | null;
  heroImageUrl?: string | null;
  heroVideoEmbed?: ReactNode;
  bodyContent?: ReactNode;
  externalLink?: string | null;
  category?: string | null;
}

export function InvestorEducationArticleTemplate({
  title,
  description,
  author,
  publishedAt,
  readingTime,
  heroImageUrl,
  heroVideoEmbed,
  bodyContent,
  externalLink,
  category,
}: InvestorEducationArticleTemplateProps) {
  const dateStr = formatPublishedDate(publishedAt);
  const metaParts: string[] = [];
  if (author) metaParts.push(`By ${author}`);
  if (dateStr) metaParts.push(dateStr);
  const hasMeta = metaParts.length > 0 || readingTime;

  return (
    <div className="bg-surface-bg">
      <article>
        {/* Hero */}
        <section className="py-12 sm:py-16 lg:py-24 pb-10">
          <Container className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center">
            <H1 className="max-w-3xl text-text-primary">{title}</H1>
            {description ? (
              <TextLarge className="max-w-3xl text-text-secondary">
                {description}
              </TextLarge>
            ) : null}
            {hasMeta ? (
              <div className="flex flex-col items-center gap-1 text-center md:flex-row md:items-center md:justify-center md:gap-2">
                {metaParts.length > 0 ? (
                  <TextRegular className="text-text-secondary">
                    {metaParts.join(" · ")}
                  </TextRegular>
                ) : null}
                {readingTime ? (
                  <TextSmall className="text-text-tertiary">
                    {readingTime}
                  </TextSmall>
                ) : null}
              </div>
            ) : null}
          </Container>
        </section>

        {/* Hero media: video embed or image */}
        {heroVideoEmbed ? (
          <section className="px-4 sm:px-6 md:px-8 lg:px-12">
            <Container className="max-w-4xl">{heroVideoEmbed}</Container>
          </section>
        ) : heroImageUrl ? (
          <section className="px-4 sm:px-6 md:px-8 lg:px-12">
            <Container className="max-w-4xl">
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-surface-stroke">
                <Image
                  src={heroImageUrl}
                  alt=""
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 896px"
                />
              </div>
            </Container>
          </section>
        ) : null}

        {/* Prose + CTA */}
        <section className="pt-10 pb-10">
          <Container className="max-w-3xl">
            {bodyContent ?? null}
            {externalLink ? (
              <div className="mt-8">
                <Link
                  href={externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-system-brand px-6 py-3 font-body text-regular font-semibold text-white transition-colors hover:bg-system-brand/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system-brand"
                >
                  {category === "Video" ? "Watch" : "Read more"}
                </Link>
              </div>
            ) : null}
          </Container>
        </section>
      </article>
    </div>
  );
}
