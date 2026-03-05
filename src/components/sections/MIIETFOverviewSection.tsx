"use client";

import { motion } from "motion/react";
import { Container } from "@/components/layout/Container";
import {
  H2,
  H4,
  TextRegular,
  TextSmall,
  TextMedium,
} from "@/components/ui/Typography";
import { sectionFadeInUp, sectionViewport } from "@/lib/sectionMotion";

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
  { label: "Total expense ratio (without govt. levy)", value: "0.95% (MTD) | 0.93% (YTD)" },
  { label: "Total expense ratio (with govt. levy)", value: "1.17% (MTD) | 1.14% (YTD)" },
] as const;

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:gap-6 sm:items-start">
      <TextSmall
        weight="medium"
        className="shrink-0 text-text-tertiary sm:w-[150px]"
      >
        {label}
      </TextSmall>
      <TextMedium
        weight="semibold"
        className="min-w-0 text-text-primary"
      >
        {value}
      </TextMedium>
    </div>
  );
}

export function MIIETFOverviewSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeInUp}
      className="relative overflow-hidden bg-surface-bg py-10"
      aria-labelledby="overview-section-heading"
    >
      <Container className="flex flex-col gap-10 px-4 sm:px-6 md:px-8 lg:gap-10 lg:px-12 xl:px-16">
        <H2
          id="overview-section-heading"
          weight="bold"
          className="text-text-primary text-2xl sm:text-3xl lg:text-h2"
        >
          Overview
        </H2>

        <div className="flex flex-col gap-10 lg:gap-10">
          {/* Product summary + Investment objective — two columns on lg */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-20">
            <div className="flex flex-col gap-4">
              <H4 className="text-text-primary text-lg sm:text-xl">
                Product summary
              </H4>
              <TextRegular className="text-text-secondary leading-[150%]">
                MIIETF is a Shariah-compliant equity index fund that primarily
                invests in the top 30, free float weighted Islamic stocks that
                have an annual average turnover of more than PKR 10 million.
                MIIETF provides investors the long term benefits of equity
                markets.
              </TextRegular>
            </div>
            <div className="flex flex-col gap-4">
              <H4 className="text-text-primary text-lg sm:text-xl">
                Investment objective
              </H4>
              <TextRegular className="text-text-secondary leading-[150%]">
                Investment objective is to provide competitive equity market
                returns with maximum coverage of the broader Islamic index at
                lowest possible cost.
              </TextRegular>
            </div>
          </div>

          {/* Fund details grid — two columns on lg */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-20">
            <div className="flex flex-col gap-6">
              {FUND_DETAILS_LEFT.map(({ label, value }) => (
                <DetailRow key={label} label={label} value={value} />
              ))}
            </div>
            <div className="flex flex-col gap-6">
              {FUND_DETAILS_RIGHT.map(({ label, value }) => (
                <DetailRow key={label} label={label} value={value} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </motion.section>
  );
}
