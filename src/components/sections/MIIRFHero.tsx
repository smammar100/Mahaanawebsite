"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { sectionFadeInUp, sectionViewport } from "@/lib/sectionMotion";
import { cx } from "@/utils/cx";

const MIIRF_HERO_TABS = [
  { id: "overview", label: "Overview" },
  { id: "performance", label: "Performance" },
  { id: "subfunds", label: "Subfunds" },
  { id: "fund-literature", label: "Fund literature" },
] as const;

const TAB_TO_SECTION_ID: Record<(typeof MIIRF_HERO_TABS)[number]["id"], string> = {
  overview: "miirf-overview-section-heading",
  performance: "miirf-performance-section-heading",
  subfunds: "miirf-subfunds-section-heading",
  "fund-literature": "miirf-fund-literature-section-heading",
};

export function MIIRFHero() {
  const [selectedTab, setSelectedTab] = useState<(typeof MIIRF_HERO_TABS)[number]["id"]>("overview");

  function handleTabClick(tabId: (typeof MIIRF_HERO_TABS)[number]["id"]) {
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
      className="relative overflow-hidden bg-surface-bg pt-[120px] pb-10"
      aria-labelledby="miirf-hero-heading"
    >
      <Container className="flex flex-col gap-12 px-4 sm:px-6 md:px-8 lg:gap-[88px] lg:px-12 xl:px-16">
        {/* Content row: left (title + partners) | right (subtitle + partners) */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-20 xl:gap-[80px]">
          {/* Left: MIIRF title + WITH OUR PARTNERS + IGI logo */}
          <div className="flex max-w-[550px] flex-col gap-6">
            <h1
              id="miirf-hero-heading"
              className={cx(
                "font-heading font-extrabold tracking-heading",
                "bg-gradient-brand-text",
                "text-[2.5rem] leading-[1.1] sm:text-5xl sm:leading-[68px] lg:text-[4.375rem] xl:text-[70px] xl:leading-[68px] xl:tracking-[-2.625px]"
              )}
            >
              MIIRF
            </h1>
            <div className="flex flex-wrap items-center gap-4">
              <p className="font-body text-base font-bold uppercase tracking-wide text-system-brand">
                With our partners
              </p>
              <div className="relative h-12 w-[108px] shrink-0">
                <img
                  src="/images/invest/IGI%20Life%20Logo.webp"
                  alt="IGI Life"
                  className="h-full w-full object-contain object-left"
                />
              </div>
            </div>
          </div>

          {/* Right: full name */}
          <div className="flex min-w-0 flex-1 flex-col gap-6 justify-start items-start lg:items-end">
            <h2
              className={cx(
                "font-heading font-medium tracking-heading text-text-primary text-left lg:text-right",
                "text-3xl leading-tight sm:text-4xl lg:text-5xl lg:leading-[60px] xl:text-[56px] xl:leading-[60px] xl:tracking-[-1.12px]"
              )}
            >
              Mahaana Islamic IGI Retirement Fund
            </h2>
          </div>
        </div>

        {/* Tab bar — sticky, horizontally scrollable on mobile */}
        <div
          className="fund-tab-list sticky top-[calc(4.5rem+env(safe-area-inset-top,0px))] z-10 flex w-full min-h-[44px] max-w-full flex-nowrap justify-start overflow-x-auto snap-x snap-mandatory gap-1 rounded-full bg-gray-100 p-1.5 sm:justify-between"
          role="tablist"
          aria-label="Fund sections"
        >
          {MIIRF_HERO_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={selectedTab === tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={cx(
                "min-h-[44px] shrink-0 snap-start rounded-full px-4 py-3 text-center font-body text-base font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system-brand sm:flex-1 sm:min-w-0 sm:px-5",
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
