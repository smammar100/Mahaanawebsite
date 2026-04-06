"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { INVESTOR_LOGOS } from "@/components/sections/LogoStrip";
import { Container } from "@/components/layout/Container";
import { H3, TextRegular } from "@/components/ui/Typography";
import Stack from "@/components/ui/Stack";
import { useInView } from "@/hooks/useInView";
import type { BlogPostForSection } from "@/lib/sanity/fetch";
import { aboutFigmaData } from "./aboutFigma.data";
import { cx } from "@/utils/cx";

interface AboutFigmaVisibilityProps {
  newsPosts: BlogPostForSection[];
}

interface VisibilityCard {
  title: string;
  dateLabel: string;
  image: string;
  href: string;
}

function formatDateLabel(publishedAt?: string): string {
  if (!publishedAt) return "Latest Update";

  const date = new Date(publishedAt);
  if (Number.isNaN(date.getTime())) return "Latest Update";

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
}

export function AboutFigmaVisibility({ newsPosts }: AboutFigmaVisibilityProps) {
  const { ref, isVisible } = useInView(0.15);

  const cards = useMemo<VisibilityCard[]>(() => {
    if (newsPosts.length > 0) {
      return newsPosts.slice(0, 3).map((post) => ({
        title: post.title,
        dateLabel: formatDateLabel(post.publishedAt),
        image: post.imageUrl,
        href: post.href,
      }));
    }

    return aboutFigmaData.visibility.milestones.map((milestone) => ({
      title: milestone.title,
      dateLabel: milestone.date,
      image: milestone.image,
      href: "#",
    }));
  }, [newsPosts]);

  const stackedCards = useMemo(
    () =>
      cards.map((card, index) => (
        <article
          key={`${card.title}-${index}`}
          className="w-full rounded-3xl border border-surface-stroke bg-white p-5 shadow-[-10px_14px_16px_rgba(0,0,0,0.45)] sm:p-6 lg:max-w-[315px]"
        >
          <img
            src={card.image}
            alt={card.title}
            loading="lazy"
            className="mb-5 h-40 w-full rounded-xl object-cover"
          />
          <div className="flex flex-col gap-2">
            <p className="text-body text-[#0b0f1a]">{card.dateLabel}</p>
            {card.href !== "#" ? (
              <Link
                href={card.href}
                className="line-clamp-2 text-xl font-semibold leading-tight tracking-[-0.01em] text-[#0b0f1a] transition-colors hover:text-primary-200"
              >
                {card.title}
              </Link>
            ) : (
              <p className="line-clamp-2 text-xl font-semibold leading-tight tracking-[-0.01em] text-[#0b0f1a]">
                {card.title}
              </p>
            )}
          </div>
        </article>
      )),
    [cards]
  );

  return (
    <section
      ref={ref}
      className={cx(
        "section-fade-in-up bg-gradient-brand py-10 sm:py-12 md:py-14 lg:py-16",
        isVisible && "visible"
      )}
      aria-labelledby="about-figma-visibility-heading"
    >
      <Container className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="rounded-2xl">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="flex flex-col justify-between gap-8">
              <div className="flex flex-col gap-4">
                <p className="text-label text-[#d0bafe]">{aboutFigmaData.visibility.eyebrow}</p>
                <H3 id="about-figma-visibility-heading" className="text-white">
                  {aboutFigmaData.visibility.heading}
                </H3>
              </div>

              <div className="flex flex-col gap-5">
                <TextRegular className="max-w-sm text-white">
                  {aboutFigmaData.visibility.trustedText}
                </TextRegular>
                <div className="grid w-full max-w-full grid-cols-2 place-items-center gap-x-4 gap-y-4 sm:grid-cols-4 sm:gap-x-5 sm:gap-y-0">
                  {INVESTOR_LOGOS.map((logo, index) => (
                    <div
                      key={`${logo.src}-${index}`}
                      className="flex min-h-[42px] w-full max-w-[150px] items-center justify-center rounded-lg border border-surface-stroke bg-white px-3 py-2"
                    >
                      <Image
                        src={logo.src}
                        alt={logo.alt}
                        width={140}
                        height={42}
                        sizes="(max-width: 800px) 45vw, 25vw"
                        className="h-6 w-auto object-contain object-center opacity-90 sm:h-7"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative flex flex-col gap-5 lg:min-h-[480px] lg:items-end lg:justify-center">
              <div className="h-[420px] w-full max-w-[340px] sm:h-[460px] sm:max-w-[360px] lg:h-[480px]">
                <Stack
                  randomRotation
                  sensitivity={200}
                  sendToBackOnClick
                  cards={stackedCards}
                  autoplay
                  autoplayDelay={3000}
                  pauseOnHover={false}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
