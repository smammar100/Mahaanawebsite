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
import { cleanCopy } from "@/lib/copy-utils";
import type { MiietfHeroFundData } from "@/lib/miietf-fund-api";
import { sectionFadeInUp, sectionViewport } from "@/lib/sectionMotion";
import { cx } from "@/utils/cx";

const DEFAULT_NAV = "15.5773";
const DEFAULT_NAV_DATE = "as of 12 Mar 2026";
const DEFAULT_MTD = "-6.34%";
const DEFAULT_MTD_DATE = "12 Mar 2026";
const DEFAULT_ASSET_CLASS = "Open-end Shariah Compliant Equity ETF";
const DEFAULT_EXPENSE_MTD = "0.90% (MTD)";
const DEFAULT_EXPENSE_YTD = "0.83% (YTD)";
const DEFAULT_EXPENSE_DATE = "As of 31 Jan 2026";

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

export function MIIETFHero({ fundData }: { fundData?: MiietfHeroFundData | null }) {
  const [selectedTab, setSelectedTab] = useState<(typeof MIIETF_HERO_TABS)[number]["id"]>("overview");
  const nav = fundData?.nav ?? DEFAULT_NAV;
  const navDate = fundData?.navDate ? `as of ${fundData.navDate}` : DEFAULT_NAV_DATE;
  const mtd = fundData?.mtd ?? DEFAULT_MTD;
  const mtdAsOfDate = fundData?.navDate ?? DEFAULT_MTD_DATE;
  const assetClass = fundData?.assetClass ?? DEFAULT_ASSET_CLASS;
  const expenseMtd = fundData?.expenseRatioMtd?.trim() || DEFAULT_EXPENSE_MTD;
  const expenseYtd = fundData?.expenseRatioYtd?.trim() || DEFAULT_EXPENSE_YTD;
  const expenseDate = fundData?.expenseRatioDate
    ? `As of ${fundData.expenseRatioDate}`
    : DEFAULT_EXPENSE_DATE;

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
              className="text-system-brand"
            >
              {cleanCopy("MIIETF")}
            </h1>
            <H2 className="text-text-primary">
              {cleanCopy("Mahaana Islamic")}
              <br aria-hidden />
              {cleanCopy("Index ETF")}
            </H2>
          </div>

          {/* Right: stats grid */}
          <div className="grid min-w-0 flex-1 grid-cols-1 gap-y-8 gap-x-10 sm:grid-cols-2">
            {/* NAV */}
            <div className="flex flex-col gap-1">
              <TextSmall weight="medium" className="text-text-tertiary">
                NAV
              </TextSmall>
              <TextMedium className="text-stat text-text-primary">
                {nav}
              </TextMedium>
              <TextTiny className="text-text-tertiary">{navDate}</TextTiny>
            </div>

            {/* Risk / Reward scale */}
            <div className="flex flex-col gap-1">
              <TextSmall weight="medium" className="text-text-tertiary">
                Risk / Reward scale
              </TextSmall>
              <TextMedium className="text-stat text-text-primary">
                Low Risk
              </TextMedium>
            </div>

            {/* Asset class */}
            <div className="flex flex-col gap-1">
              <TextSmall weight="medium" className="text-text-tertiary">
                Asset class
              </TextSmall>
              <TextMedium className="text-stat text-text-primary">
                {assetClass}
              </TextMedium>
            </div>

            {/* MTD */}
            <div className="flex flex-col gap-1">
              <TextSmall weight="medium" className="text-text-tertiary">
                MTD
              </TextSmall>
              <TextMedium className="text-stat text-text-primary">
                {mtd}
              </TextMedium>
              <TextTiny className="text-text-tertiary">As of {mtdAsOfDate}</TextTiny>
            </div>

            {/* Management style */}
            <div className="flex flex-col gap-1">
              <TextSmall weight="medium" className="text-text-tertiary">
                Management style
              </TextSmall>
              <TextMedium className="text-stat text-text-primary">
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
                  <TextMedium className="text-stat text-text-primary">
                    {expenseMtd}
                  </TextMedium>
                  <span className="h-4 w-px shrink-0 bg-gray-200" aria-hidden />
                  <TextMedium className="text-stat text-text-primary">
                    {expenseYtd}
                  </TextMedium>
                </div>
                <TextTiny className="text-text-tertiary">{expenseDate}</TextTiny>
              </div>
            </div>
          </div>
        </div>

        {/* Tab bar — sticky, tabs horizontally scrollable on mobile */}
        <div
          className="fund-tab-list sticky top-[calc(4.5rem+env(safe-area-inset-top,0px))] z-10 flex w-full min-h-[44px] max-w-full flex-nowrap justify-start overflow-x-auto snap-x snap-mandatory gap-1 rounded-full bg-gray-100 p-1.5 sm:justify-between"
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
                "min-h-[44px] shrink-0 snap-start rounded-full px-4 py-3 text-center whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system-brand sm:flex-1 sm:min-w-0 sm:px-5",
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
