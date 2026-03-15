"use client";

import { motion } from "motion/react";
import type { MiirfOverviewFundData } from "@/lib/miirf-fund-api";
import { Container } from "@/components/layout/Container";
import {
  H3,
  H4,
  TextRegular,
  TextSmall,
  TextMedium,
} from "@/components/ui/Typography";
import { sectionFadeInUp, sectionViewport } from "@/lib/sectionMotion";

const KEY_FACTS_FALLBACK = [
  { label: "Net Assets", value: "PKR 371.7mn" },
  { label: "Launch Date", value: "May 26, 2025" },
  { label: "Fund Auditors", value: "A.F. Ferguson & Co." },
  { label: "Fund Manager", value: "IGI Life Insurance Limited" },
  { label: "Fund Type", value: "Open-end Shariah Compliant Voluntary Pension Scheme" },
  { label: "Trustee", value: "Central Depository Company of Pakistan Limited" },
] as const;

const SUMMARY_FALLBACK =
  "Mahaana IGI Islamic Retirement Fund (MIIRF) is a Shariah-compliant voluntary pension scheme designed to provide secure retirement savings for participants. The fund primarily invests across three sub-funds: Equity, Debt, and Money Market, offering diverse allocation options to suit different risk preferences. It is a long-term investment vehicle for individuals seeking to build wealth for their retirement. Through MIIRF, participants gain exposure to a range of Islamic assets, including equities, sukuks, and money market instruments, providing them with a reliable source of income during retirement.";

const OBJECTIVE_FALLBACK =
  "Investment objective is to provide secure retirement savings and regular income after retirement, by investing in a diversified portfolio of Shariah-compliant assets, with a focus on long-term growth and risk mitigation.";

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

export function MIIRFOverviewSection({ fundData }: { fundData?: MiirfOverviewFundData | null }) {
  const summary = fundData?.summary ?? SUMMARY_FALLBACK;
  const objective = fundData?.investmentObjective ?? OBJECTIVE_FALLBACK;
  const keyFactsLeft = fundData?.keyFactsLeft ?? KEY_FACTS_FALLBACK.slice(0, 3);
  const keyFactsRight = fundData?.keyFactsRight ?? KEY_FACTS_FALLBACK.slice(3, 6);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeInUp}
      className="relative overflow-hidden bg-surface-bg pt-[40px] pb-10"
      aria-labelledby="miirf-overview-section-heading"
    >
      <Container className="flex flex-col gap-10 px-4 sm:px-6 md:px-8 lg:gap-10 lg:px-12 xl:px-16">
        <H3
          id="miirf-overview-section-heading"
          weight="bold"
          className="text-text-primary"
        >
          Overview
        </H3>

        <div className="flex flex-col gap-10 lg:gap-10">
          {/* Product summary + Investment objective — two columns on lg */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-20">
            <div className="flex flex-col gap-4">
              <H4 className="text-stat text-text-primary">
                Product Summary
              </H4>
              <TextRegular className="text-text-secondary leading-[150%]">
                {summary}
              </TextRegular>
            </div>
            <div className="flex flex-col gap-4">
              <H4 className="text-stat text-text-primary">
                Investment Objective
              </H4>
              <TextRegular className="text-text-secondary leading-[150%]">
                {objective}
              </TextRegular>
            </div>
          </div>

          {/* Key Facts — two columns on lg */}
          <div className="flex flex-col gap-6">
            <H4 className="text-stat text-text-primary">
              Key Facts
            </H4>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-20">
              <div className="flex flex-col gap-6">
                {keyFactsLeft.map(({ label, value }) => (
                  <DetailRow key={label} label={label} value={value} />
                ))}
              </div>
              <div className="flex flex-col gap-6">
                {keyFactsRight.map(({ label, value }) => (
                  <DetailRow key={label} label={label} value={value} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </motion.section>
  );
}
