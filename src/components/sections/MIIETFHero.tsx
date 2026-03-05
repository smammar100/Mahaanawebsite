"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Container } from "@/components/layout/Container";
import {
  H2,
  TextSmall,
  TextMedium,
  TextTiny,
} from "@/components/ui/Typography";
import { sectionFadeInUp, sectionViewport } from "@/lib/sectionMotion";
import { cx } from "@/utils/cx";

const MIIETF_HERO_TABS = [
  { id: "overview", label: "Overview" },
  { id: "performance", label: "Performance" },
  { id: "portfolio", label: "Portfolio" },
  { id: "distribution", label: "Distribution" },
  { id: "fund-literature", label: "Fund literature" },
] as const;

const TAB_TO_SECTION_ID: Record<(typeof MIIETF_HERO_TABS)[number]["id"], string> = {
  overview: "overview-section-heading",
  performance: "performance-section-heading",
  portfolio: "portfolio-section-heading",
  distribution: "distributions-section-heading",
  "fund-literature": "fund-literature-section-heading",
};

export function MIIETFHero() {
  const [selectedTab, setSelectedTab] = useState<(typeof MIIETF_HERO_TABS)[number]["id"]>("overview");

  function handleTabClick(tabId: (typeof MIIETF_HERO_TABS)[number]["id"]) {
    setSelectedTab(tabId);
    const sectionId = TAB_TO_SECTION_ID[tabId];
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeInUp}
      className="relative overflow-hidden bg-surface-bg pt-[160px] pb-12 sm:pb-16 lg:pb-20"
      aria-labelledby="miietf-hero-heading"
    >
      <Container className="flex flex-col gap-12 px-4 sm:px-6 md:px-8 lg:gap-20 lg:px-12 xl:px-16">
        {/* Two-column content row */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-20">
          {/* Left: title block */}
          <div className="flex max-w-[550px] flex-col gap-2">
            <h1
              id="miietf-hero-heading"
              className={cx(
                "font-heading font-bold leading-[120%] tracking-heading",
                "bg-gradient-to-b from-[#443087] to-[#30225f] bg-clip-text text-transparent",
                "text-[2.5rem] sm:text-5xl lg:text-[4.375rem]"
              )}
            >
              MIIETF
            </h1>
            <H2
              weight="medium"
              className="text-text-primary text-2xl sm:text-3xl lg:text-[3.5rem]"
            >
              Mahaana Islamic
              <br aria-hidden />
              Index ETF
            </H2>
          </div>

          {/* Right: stats grid */}
          <div className="grid min-w-0 flex-1 grid-cols-1 gap-y-8 gap-x-10 sm:grid-cols-2">
            {/* NAV */}
            <div className="flex flex-col gap-1">
              <TextSmall weight="medium" className="text-text-tertiary">
                NAV
              </TextSmall>
              <TextMedium weight="semibold" className="text-text-primary text-[1.25rem] leading-[1.2]">
                16.6325
              </TextMedium>
              <TextTiny className="text-text-tertiary">as of 1 Mar 2026</TextTiny>
            </div>

            {/* Risk / Reward scale */}
            <div className="flex flex-col gap-1">
              <TextSmall weight="medium" className="text-text-tertiary">
                Risk / Reward scale
              </TextSmall>
              <TextMedium weight="semibold" className="text-text-primary text-[1.25rem] leading-[1.2]">
                Low Risk
              </TextMedium>
            </div>

            {/* Asset class */}
            <div className="flex flex-col gap-1">
              <TextSmall weight="medium" className="text-text-tertiary">
                Asset class
              </TextSmall>
              <TextMedium weight="semibold" className="text-text-primary text-[1.25rem] leading-[1.2]">
                Open-end Shariah Compliant Money Market Fund
              </TextMedium>
            </div>

            {/* MTD */}
            <div className="flex flex-col gap-1">
              <TextSmall weight="medium" className="text-text-tertiary">
                MTD
              </TextSmall>
              <TextMedium weight="semibold" className="text-text-primary text-[1.25rem] leading-[1.2]">
                9.58%
              </TextMedium>
              <TextTiny className="text-text-tertiary">As of 22 Feb 2026</TextTiny>
            </div>

            {/* Management style */}
            <div className="flex flex-col gap-1">
              <TextSmall weight="medium" className="text-text-tertiary">
                Management style
              </TextSmall>
              <TextMedium weight="semibold" className="text-text-primary text-[1.25rem] leading-[1.2]">
                Active
              </TextMedium>
            </div>

            {/* Expense ratio */}
            <div className="flex flex-col gap-1">
              <TextSmall weight="medium" className="text-text-tertiary">
                Expense ratio
              </TextSmall>
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <TextMedium weight="semibold" className="text-text-primary text-[1.25rem] leading-[1.2]">
                    0.9% (MTD)
                  </TextMedium>
                  <span className="h-4 w-px shrink-0 bg-gray-200" aria-hidden />
                  <TextMedium weight="semibold" className="text-text-primary text-[1.25rem] leading-[1.2]">
                    0.83% (YTD)
                  </TextMedium>
                </div>
                <TextTiny className="text-text-tertiary">As of 31 Jan 2026</TextTiny>
              </div>
            </div>
          </div>
        </div>

        {/* Tab bar — sticky, tabs evenly distributed */}
        <div
          className="sticky top-[calc(4.5rem+env(safe-area-inset-top,0px))] z-10 flex w-full min-h-[44px] flex-wrap justify-center gap-1 rounded-full bg-gray-100 p-1.5 sm:flex-nowrap sm:overflow-x-auto sm:snap-x sm:snap-mandatory"
          role="tablist"
          aria-label="Fund sections"
        >
          {MIIETF_HERO_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={selectedTab === tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={cx(
                "min-h-[44px] min-w-0 flex-1 snap-center rounded-full px-4 py-3 text-center font-body text-base font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system-brand sm:px-5",
                selectedTab === tab.id
                  ? "bg-white text-text-primary shadow-sm"
                  : "text-text-tertiary hover:bg-white/80 hover:text-text-primary"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </Container>
    </motion.section>
  );
}
