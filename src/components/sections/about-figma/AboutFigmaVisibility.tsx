"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { INVESTOR_LOGOS } from "@/components/sections/LogoStrip";
import { Container } from "@/components/layout/Container";
import { H3, TextRegular } from "@/components/ui/Typography";
import Stack from "@/components/ui/stack/Stack";
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

  const stackCards = useMemo(
    () =>
      cards.map((card, index) => (
        <div
          key={`${card.href}-${card.title}-${index}`}
          className="flex w-full flex-col"
        >
          <img
            src={card.image}
            alt={card.title}
            loading="lazy"
            className="block h-36 w-full shrink-0 object-cover sm:h-40"
          />
          <div className="flex flex-col gap-2 px-5 pb-5 pt-4 sm:px-6 sm:pb-6 sm:pt-5">
            <p className="text-body text-[#0b0f1a]">{card.dateLabel}</p>
            {card.href !== "#" ? (
              <Link
                href={card.href}
                className="line-clamp-2 text-left text-xl font-semibold leading-tight tracking-[-0.01em] text-[#0b0f1a] transition-colors hover:text-primary-200"
                onClick={(e) => e.stopPropagation()}
                onPointerDown={(e) => e.stopPropagation()}
              >
                {card.title}
              </Link>
            ) : (
              <p className="line-clamp-2 text-xl font-semibold leading-tight tracking-[-0.01em] text-[#0b0f1a]">
                {card.title}
              </p>
            )}
          </div>
        </div>
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
              <div
                className={cx(
                  "relative h-[420px] w-full max-w-[340px] shrink-0 sm:h-[460px] sm:max-w-[360px] lg:h-[480px]",
                  "[&_.card]:h-auto [&_.card]:max-h-full [&_.card]:flex-col [&_.card]:items-start [&_.card]:justify-start",
                  "[&_.card]:overflow-hidden [&_.card]:rounded-3xl [&_.card]:border [&_.card]:border-surface-stroke [&_.card]:bg-white",
                  "[&_.card]:shadow-[-8px_12px_24px_rgba(0,0,0,0.2)]"
                )}
              >
                {cards.length > 0 ? (
                  <Stack
                    randomRotation={false}
                    sensitivity={200}
                    sendToBackOnClick
                    cards={stackCards}
                    autoplay={cards.length > 1}
                    autoplayDelay={3000}
                    pauseOnHover={false}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
