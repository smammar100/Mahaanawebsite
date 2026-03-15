"use client";

import { motion } from "motion/react";
import { Container } from "@/components/layout/Container";
import {
  H3,
  H4,
  TextRegular,
  TextSmall,
  TextMedium,
} from "@/components/ui/Typography";
import type { MicfOverviewFundData } from "@/lib/micf-fund-api";
import { sectionFadeInUp, sectionViewport } from "@/lib/sectionMotion";

const KEY_FACTS_LEFT = [
  { label: "Net Assets", value: "PKR 3504.4 mn" },
  { label: "Launch Date", value: "Mar 29, 2023" },
  { label: "Fund Category", value: "Open-end Shariah Compliant Money Market Fund" },
  {
    label: "Benchmark",
    value:
      "90% three (3) month PKISRV rates+10% three (3) months average of the highest rates on savings account of three (3) AA rated scheduled Islamic banks or Islamic Windows of Conventional Banks as selected by MUFAP",
  },
  { label: "Fund Auditors", value: "BDO Ebrahim & Co." },
  { label: "Custodian", value: "Central Depository Company of Pakistan Limited" },
  { label: "Shariah Advisors", value: "Al Hilal Shariah Advisors" },
] as const;

const KEY_FACTS_RIGHT = [
  { label: "Fund Stability Rating", value: "AA+" },
  { label: "Fund Manager", value: "Mubashir Zuberi, CFA" },
  { label: "Management Fee", value: "0.60% p.a" },
  {
    label: "Total Expense Ratio (without govt. levy)",
    value: "0.74% (MTD) | 0.66% (YTD)",
  },
  {
    label: "Total Expense Ratio (with govt. levy)",
    value: "0.91% (MTD) | 0.83% (YTD)",
  },
  { label: "Weighted Average Time to Maturity (Days)", value: "74" },
  { label: "Sales Load", value: "Upto 1.5%" },
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

const DEFAULT_SUMMARY =
  "MICF is a Shariah-compliant fund that primarily invests in cash and cash equivalents, such as short-term government bonds and money market instruments. Cash funds are often used as a short-term investment vehicle or as a way to preserve capital while earning a low return. They are typically considered low-risk investments, as they are invested in highly liquid assets, such as islamic sukuks, that are not subject to significant price fluctuations. Through MICF, our clients gain direct exposure to government Sukuks at a fraction of the cost compared to banks.";

const DEFAULT_OBJECTIVE =
  "Investment objective is to provide competitive returns with maximum possible capital preservation by Investing in low risk and liquid Shariah-compliant authorized instruments.";

export function MICFOverviewSection({
  fundData,
}: {
  fundData?: MicfOverviewFundData | null;
}) {
  const summary = fundData?.summary ?? DEFAULT_SUMMARY;
  const investmentObjective = fundData?.investmentObjective ?? DEFAULT_OBJECTIVE;
  const keyFactsLeft = fundData?.keyFactsLeft ?? [...KEY_FACTS_LEFT];
  const keyFactsRight = fundData?.keyFactsRight ?? [...KEY_FACTS_RIGHT];

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeInUp}
      className="relative overflow-hidden bg-surface-bg py-8 sm:py-10"
      aria-labelledby="micf-overview-section-heading"
    >
      <Container className="flex flex-col gap-10 px-4 sm:px-6 md:px-8 lg:gap-10 lg:px-12 xl:px-16">
        <H3
          id="micf-overview-section-heading"
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
                Product summary
              </H4>
              <TextRegular className="text-text-secondary leading-[150%]">
                {summary}
              </TextRegular>
            </div>
            <div className="flex flex-col gap-4">
              <H4 className="text-stat text-text-primary">
                Investment objective
              </H4>
              <TextRegular className="text-text-secondary leading-[150%]">
                {investmentObjective}
              </TextRegular>
            </div>
          </div>

          {/* Fund details grid — two columns on lg */}
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
      </Container>
    </motion.section>
  );
}
