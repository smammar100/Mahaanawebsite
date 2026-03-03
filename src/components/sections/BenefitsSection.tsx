"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { Cell, LabelList, Pie, PieChart, ResponsiveContainer } from "recharts";
import { Container } from "@/components/layout/Container";
import { H2, TextRegular } from "@/components/ui/Typography";
import { sectionFadeInUp, sectionViewport } from "@/lib/sectionMotion";
import { cx } from "@/utils/cx";

/** Risk profiles for the allocation doughnut chart (card with hasRiskButtons). */
const RISK_ALLOCATION_OPTIONS = [
  "Conservative",
  "Low risk",
  "Balanced",
  "Medium risk",
  "Aggressive",
] as const;

type AssetName = "Money Market" | "Debt" | "Equity";

interface AllocationSegment {
  name: AssetName;
  value: number;
}

const RISK_ALLOCATION_COMPOSITION: Record<string, AllocationSegment[]> = {
  Conservative: [{ name: "Money Market", value: 100 }],
  "Low risk": [
    { name: "Money Market", value: 70 },
    { name: "Debt", value: 30 },
  ],
  Balanced: [
    { name: "Money Market", value: 40 },
    { name: "Debt", value: 30 },
    { name: "Equity", value: 30 },
  ],
  "Medium risk": [
    { name: "Money Market", value: 20 },
    { name: "Debt", value: 30 },
    { name: "Equity", value: 50 },
  ],
  Aggressive: [
    { name: "Equity", value: 90 },
    { name: "Debt", value: 10 },
  ],
};

const ALLOCATION_COLORS: Record<AssetName, string> = {
  "Money Market": "#14b8a6",
  Debt: "#f59e0b",
  Equity: "#6366f1",
};

const benefitsCards = [
  {
    label: "SAVE TAX, SAVE MORE",
    headline: "Unlock tax savings for your future",
    body: "According to VPS Rules 2005, Mahaana Retirement offers up to a 20% tax credit on your contributions, reducing your monthly tax liability. This unique benefit allows you to save more while building a solid financial foundation for retirement.",
    items: [
      "Up to 20% tax credit on contributions",
      "Reduce your monthly tax liability",
      "Build a solid financial foundation for retirement",
    ],
    hasRiskButtons: false,
    image: "/images/invest/20-percent-tax.png",
  },
  {
    label: "DIVERSIFIED BY EXPERTS",
    headline: "Expert built, curated portfolios",
    body: "We've curated diversified portfolios with different risk/return profiles ranging from conservative to growth to fit your risk appetite & goals.",
    items: [
      "Curated risk/return profiles",
      "Conservative to growth options",
      "Fit your risk appetite and goals",
    ],
    hasRiskButtons: true,
  },
  {
    label: "RETIREMENT, SIMPLIFIED",
    headline: "Stay focused with Mahaana Retirement",
    body: "With Mahaana Retirement, your long-term goals get dedicated attention. Our focused approach ensures a clear, simplified financial strategy that grows your wealth steadily toward the retirement you deserve.",
    items: [
      "Dedicated attention to long-term goals",
      "Clear, simplified financial strategy",
      "Steady growth toward the retirement you deserve",
    ],
    hasRiskButtons: false,
    image: "/images/invest/Focused.png",
  },
  {
    label: "INVEST WITH PROTECTION",
    headline: "Your retirement account in partnership with IGI Life Insurance",
    body: "Mahaana Wealth partners with IGI Life Insurance to bring you a comprehensive retirement solution that combines expert investment management with trusted insurance protection.",
    items: [
      "Partnership with IGI Life Insurance",
      "Expert investment management",
      "Trusted insurance protection",
    ],
    hasRiskButtons: false,
    image: "/images/invest/Partnership.png",
  },
];

function BenefitsCard({
  headline,
  body,
  hasRiskButtons,
  imageFirst,
  index,
  image,
}: {
  headline: string;
  body: string;
  hasRiskButtons: boolean;
  imageFirst: boolean;
  index: number;
  image?: string;
}) {
  const [selectedRisk, setSelectedRisk] = useState<string>(RISK_ALLOCATION_OPTIONS[0]);

  const allocationData =
    RISK_ALLOCATION_COMPOSITION[selectedRisk] ?? RISK_ALLOCATION_COMPOSITION.Conservative;

  const allocationDataWithLabels = allocationData.map((d) => ({
    ...d,
    label: `${d.name} – ${d.value}%`,
  }));

  return (
    <div
      className={cx(
        "flex flex-col w-full gap-8 sm:gap-10 lg:gap-12 lg:flex-row lg:items-stretch",
        imageFirst && "lg:flex-row-reverse"
      )}
    >
      {/* Content column: headline, list — 50% on lg */}
      <div className="flex min-w-0 w-full flex-col lg:w-1/2 lg:flex-[1_1_0%] justify-center items-start">
        <H2
          id={index === 0 ? "benefits-heading" : undefined}
          className="font-heading text-[1.75rem] font-semibold leading-[1.2] tracking-heading text-text-primary sm:text-[2rem] lg:text-[2.25rem]"
        >
          {headline}
        </H2>
        {body && (
          <TextRegular className="mt-4 text-text-secondary">
            {body}
          </TextRegular>
        )}
      </div>

      {/* Graphic column: illustration, placeholder, or risk allocation chart */}
      <div
        className="flex min-w-0 w-full flex-col lg:w-1/2 lg:flex-[1_1_0%] lg:min-h-0"
        aria-hidden={!hasRiskButtons}
        aria-label={hasRiskButtons ? "Risk profile allocation" : undefined}
      >
        <div className="flex min-h-[200px] flex-1 flex-col lg:min-h-0">
          {hasRiskButtons ? (
            <div className="flex min-h-[400px] w-full flex-col gap-3 rounded-xl border border-surface-stroke bg-surface-card overflow-hidden p-3 sm:p-4">
              <div
                className="flex flex-wrap gap-1.5"
                role="group"
                aria-label="Risk profile"
              >
                {RISK_ALLOCATION_OPTIONS.map((risk) => (
                  <button
                    key={risk}
                    type="button"
                    onClick={() => setSelectedRisk(risk)}
                    className={cx(
                      "rounded-lg px-2.5 py-1.5 font-body text-tiny font-medium transition-colors sm:px-3 sm:py-2 sm:text-small",
                      selectedRisk === risk
                        ? "bg-primary-200 text-white dark:bg-system-brand dark:text-white"
                        : "bg-gray-100 text-text-primary hover:bg-gray-200 dark:bg-gray-700 dark:text-text-primary dark:hover:bg-gray-600"
                    )}
                  >
                    {risk}
                  </button>
                ))}
              </div>
              <div className="min-h-[320px] min-w-0 flex-1 w-full sm:min-h-[360px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={allocationDataWithLabels}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius="55%"
                      outerRadius="85%"
                      paddingAngle={0}
                      stroke="none"
                    >
                      {allocationDataWithLabels.map((entry) => (
                        <Cell
                          key={entry.name}
                          fill={ALLOCATION_COLORS[entry.name]}
                        />
                      ))}
                      <LabelList
                        dataKey="label"
                        position="outside"
                        className="fill-text-secondary font-body text-tiny"
                      />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          ) : image ? (
            <div className="flex h-[400px] min-h-0 w-full flex-col gap-0 rounded-xl border border-surface-stroke bg-surface-card overflow-hidden">
              <div className="relative h-full min-h-0 w-full rounded-xl overflow-hidden bg-surface-bg">
                <Image
                src={image}
                alt=""
                width={245}
                height={205}
                className="h-full w-full rounded-xl object-contain"
              />
            </div>
            </div>
          ) : (
            <div className="h-full min-h-0 w-full rounded-xl bg-surface-stroke/30 dark:bg-surface-stroke/20" />
          )}
        </div>
      </div>
    </div>
  );
}

export function BenefitsSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeInUp}
      className="border-t border-surface-stroke py-8 sm:py-10 md:py-12 lg:py-14 xl:py-16"
      aria-labelledby="benefits-heading"
    >
      <Container className="flex flex-col gap-16 px-4 sm:px-6 md:px-8 lg:px-16">
        {benefitsCards.map((card, index) => (
          <BenefitsCard
            key={index}
            headline={card.headline}
            body={card.body}
            hasRiskButtons={card.hasRiskButtons}
            imageFirst={index % 2 === 1}
            index={index}
            image={card.image}
          />
        ))}
      </Container>
    </motion.section>
  );
}
