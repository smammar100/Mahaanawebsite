"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { H1, H2, TextMedium } from "@/components/ui/Typography";
import { Button } from "@/components/base/buttons/button";
import { sectionFadeInUp, sectionViewport } from "@/lib/sectionMotion";
import { cx } from "@/utils/cx";
import { cleanCopy } from "@/lib/copy-utils";

const FUND_HERO_TABS = [
  { id: "overview", label: "Overview" },
  { id: "performance", label: "Performance" },
  { id: "portfolio", label: "Portfolio" },
  { id: "fund-literature", label: "Fund literature" },
] as const;

interface FundHeroProps {
  shortTitle: string;
  fullTitle: string;
  ctaLabel?: string;
  ctaHref?: string;
  showPartners?: boolean;
}

export function FundHero({
  shortTitle,
  fullTitle,
  ctaLabel = "Open retirement account",
  ctaHref = "#open-account",
  showPartners = true,
}: FundHeroProps) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeInUp}
      className={cx("relative overflow-hidden bg-surface-bg section-y")}
      aria-labelledby="fund-hero-heading"
    >
      <Container className="flex flex-col gap-8 px-4 sm:px-6 md:px-8 lg:px-16 sm:gap-10 lg:gap-14">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-16 xl:gap-20">
          <div className="flex flex-col gap-6 lg:max-w-[340px]">
            <H1
              id="fund-hero-heading"
              className="text-text-primary"
            >
              {shortTitle}
            </H1>
            <Button
              href={ctaHref}
              color="primary"
              size="lg"
              className="w-full rounded-xl sm:w-auto"
            >
              {cleanCopy(ctaLabel)}
            </Button>
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-6">
            <H2
              className="text-text-primary"
              weight="semibold"
            >
              {fullTitle}
            </H2>
            {showPartners && (
              <div className="flex flex-col gap-4">
                <TextMedium
                  weight="bold"
                  className="uppercase tracking-wide text-system-brand"
                >
                  WITH OUR PARTNERS
                </TextMedium>
                <div className="relative h-12 w-[108px] sm:w-[140px]">
                  <Image
                    src="/images/invest/IGI%20Life%20Logo.webp"
                    alt="Partner logos"
                    fill
                    className="object-contain object-left"
                    sizes="140px"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div
          className="fund-tab-list flex min-h-[44px] w-full max-w-full flex-nowrap justify-start overflow-x-auto snap-x snap-mandatory gap-1 rounded-full bg-surface-card p-1 sm:justify-between"
          role="tablist"
          aria-label="Fund sections"
        >
          {FUND_HERO_TABS.map((tab) => (
            <a
              key={tab.id}
              href={`#${tab.id}`}
              role="tab"
              className={cx(
                "flex min-h-[40px] shrink-0 snap-start items-center justify-center whitespace-nowrap rounded-full px-4 py-3 text-center text-text-tertiary transition-colors hover:bg-white hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system-brand sm:min-h-[44px] sm:flex-1 sm:min-w-0"
              )}
            >
              {cleanCopy(tab.label)}
            </a>
          ))}
        </div>
      </Container>
    </motion.section>
  );
}
