"use client";

import { motion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { H3, H4, TextRegular } from "@/components/ui/Typography";
import type { MiietfOverviewFundData } from "@/lib/miietf-fund-api";
import {
  fundPageSectionScrollMargin,
  sectionFadeInUp,
  sectionViewport,
} from "@/lib/sectionMotion";
import { KeyFactsGrid } from "@/components/ui/KeyFactsGrid";
import { cx } from "@/utils/cx";

const FUND_DETAILS_LEFT = [
  { label: "Net assets", value: "PKR 1191.7 mn" },
  { label: "Launch date", value: "Mar 11, 2024" },
  { label: "Fund category", value: "Open-end Shariah Compliant Equity ETF" },
  { label: "Benchmark", value: "Mahaana Islamic Index" },
  { label: "Fund auditors", value: "BDO Ebrahim & Co." },
  { label: "Fund stability rating", value: "N/A" },
] as const;

const FUND_DETAILS_RIGHT = [
  { label: "Fund manager", value: "Mahaana Wealth Limited" },
  { label: "Management fee", value: "0.75% per annum" },
  { label: "Authorized participant", value: "JS Global Capital Limited Adam Securities" },
  { label: "Total expense ratio (without govt. levy)", value: "0.90% (MTD) | 0.83% (YTD)" },
  { label: "Total expense ratio (with govt. levy)", value: "1.17% (MTD) | 1.14% (YTD)" },
] as const;

const DEFAULT_SUMMARY =
  "MIIETF is a Shariah compliant equity index fund that primarily invests in the top 30, free float weighted Islamic stocks that have an annual average turnover of more than PKR 10 million. MIIETF provides investors the long term benefits of equity markets.";
const DEFAULT_OBJECTIVE =
  "Investment objective is to provide competitive equity market returns with maximum coverage of the broader Islamic index at lowest possible cost.";

export function MIIETFOverviewSection({ fundData }: { fundData?: MiietfOverviewFundData | null }) {
  const summary = fundData == null ? DEFAULT_SUMMARY : fundData.summary;
  const investmentObjective = fundData == null ? DEFAULT_OBJECTIVE : fundData.investmentObjective;
  const keyFactsLeft = fundData == null ? [...FUND_DETAILS_LEFT] : fundData.keyFactsLeft;
  const keyFactsRight = fundData == null ? [...FUND_DETAILS_RIGHT] : fundData.keyFactsRight;
  const keyFactsItems = [...keyFactsLeft, ...keyFactsRight];

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeInUp}
      className={cx(
        "relative overflow-hidden bg-surface-bg section-y",
        fundPageSectionScrollMargin
      )}
      aria-labelledby="overview-section-heading"
    >
      <Container className="flex flex-col gap-10 px-4 sm:px-6 md:px-8 lg:gap-10 lg:px-12 xl:px-16">
        <H3
          id="overview-section-heading"
          weight="semibold"
          className="text-text-primary"
        >
          Overview
        </H3>

        <div className="flex flex-col gap-10 lg:gap-10">
          {/* Product summary + Investment objective — two columns on lg */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-20">
            <div className="flex flex-col gap-4">
              <H4 className="text-stat text-text-primary">
                Product summary
              </H4>
              <TextRegular className="text-text-tertiary leading-[150%]">
                {summary}
              </TextRegular>
            </div>
            <div className="flex flex-col gap-4">
              <H4 className="text-stat text-text-primary">
                Investment objective
              </H4>
              <TextRegular className="text-text-tertiary leading-[150%]">
                {investmentObjective}
              </TextRegular>
            </div>
          </div>

          {/* Fund details — 2-column grid; long rows span full width */}
          <KeyFactsGrid
            items={keyFactsItems}
            labelWidthClassName="sm:w-[150px]"
            valueFallback="N/A"
          />
        </div>
      </Container>
    </motion.section>
  );
}
