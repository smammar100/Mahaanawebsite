"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { Cell, Label, LabelList, Pie, PieChart, ResponsiveContainer } from "recharts";
import { Container } from "@/components/layout/Container";
import { H3, TextRegular } from "@/components/ui/Typography";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { sectionFadeInUp, sectionViewport } from "@/lib/sectionMotion";
import { cx } from "@/utils/cx";

/** Shape of one benefits card for the section (used by retirement and save-plus pages). */
export interface BenefitsCardItem {
  label: string;
  headline: string;
  body: string;
  items: string[];
  hasRiskButtons: boolean;
  image?: string;
  showPortfolioChart?: boolean;
}

/** Risk profile tabs and allocation data for the portfolio pie chart. */
const PORTFOLIO_TABS = [
  "Conservative",
  "Low risk",
  "Balanced",
  "Medium risk",
  "Aggressive",
] as const;

const PORTFOLIO_ALLOCATION: Record<string, { name: string; value: number; fill: string }[]> = {
  Conservative: [{ name: "Money Market", value: 100, fill: "#14b8a6" }],
  "Low risk": [
    { name: "Money Market", value: 70, fill: "#14b8a6" },
    { name: "Debt", value: 30, fill: "#f59e0b" },
  ],
  Balanced: [
    { name: "Money Market", value: 40, fill: "#14b8a6" },
    { name: "Debt", value: 30, fill: "#f59e0b" },
    { name: "Equity", value: 30, fill: "#6366f1" },
  ],
  "Medium risk": [
    { name: "Money Market", value: 20, fill: "#14b8a6" },
    { name: "Debt", value: 30, fill: "#f59e0b" },
    { name: "Equity", value: 50, fill: "#6366f1" },
  ],
  Aggressive: [
    { name: "Equity", value: 90, fill: "#6366f1" },
    { name: "Debt", value: 10, fill: "#f59e0b" },
  ],
};

const portfolioChartConfig = {
  value: { label: "Value" },
  "Money Market": { label: "Money Market", color: "#14b8a6" },
  Debt: { label: "Debt", color: "#f59e0b" },
  Equity: { label: "Equity", color: "#6366f1" },
} satisfies ChartConfig;

function PortfolioPieChartTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: ReadonlyArray<{ name: string; value: number; payload: { name: string; value: number } }>;
}) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  const name = item.payload?.name ?? item.name;
  const value = item.value;
  return (
    <div className="rounded-lg border border-surface-stroke bg-white px-2.5 py-1.5 shadow-lg dark:bg-surface-card dark:border-surface-stroke">
      <p className="text-[11px] font-medium text-text-primary sm:text-tiny">
        {name}: {value}%
      </p>
    </div>
  );
}

function PortfolioPieChart() {
  const [selectedTab, setSelectedTab] = useState<string>(PORTFOLIO_TABS[0]);
  const pieData = PORTFOLIO_ALLOCATION[selectedTab] ?? PORTFOLIO_ALLOCATION.Conservative;
  const id = "benefits-portfolio-pie";

  return (
    <div className="w-full max-w-xl rounded-xl border border-surface-stroke bg-surface-card p-4">
      <div
        className="mb-4 grid grid-cols-3 grid-rows-1 gap-1.5"
        role="tablist"
        aria-label="Risk profile"
      >
        {PORTFOLIO_TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={selectedTab === tab}
            onClick={() => setSelectedTab(tab)}
            className={cx(
              "rounded-lg px-2.5 py-1.5 font-body text-tiny font-medium transition-colors sm:px-3 sm:py-2 sm:text-small",
              selectedTab === tab
                ? "bg-primary-200 text-white dark:bg-system-brand dark:text-white"
                : "bg-gray-100 text-text-primary hover:bg-gray-200 dark:bg-gray-700 dark:text-text-primary dark:hover:bg-gray-600"
            )}
          >
            {tab}
          </button>
        ))}
      </div>
      <ChartContainer
        className="mx-auto aspect-square w-full max-w-[280px]"
        config={portfolioChartConfig}
        id={id}
      >
        <PieChart>
          <ChartTooltip content={<PortfolioPieChartTooltip />} cursor={false} />
          <Pie
            data={pieData}
            dataKey="value"
            innerRadius={60}
            nameKey="name"
            strokeWidth={5}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      dominantBaseline="middle"
                      textAnchor="middle"
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-text-tertiary text-[11px] sm:text-xs"
                    >
                      Portfolio
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </div>
  );
}

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

function BenefitsCard({
  headline,
  body,
  hasRiskButtons,
  imageFirst,
  index,
  image,
  showPortfolioChart,
}: {
  headline: string;
  body: string;
  hasRiskButtons: boolean;
  imageFirst: boolean;
  index: number;
  image?: string;
  showPortfolioChart?: boolean;
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
        <H3
          id={index === 0 ? "benefits-heading" : undefined}
          className="font-heading text-[1.75rem] font-semibold leading-[1.2] tracking-heading text-text-primary sm:text-[2rem] lg:text-[2.25rem]"
        >
          {headline}
        </H3>
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
        <div
          className={cx(
            "flex min-h-[200px] flex-1 flex-col lg:min-h-0",
            hasRiskButtons ? "justify-center items-center" : "min-h-0"
          )}
        >
          {hasRiskButtons ? (
            <div className="flex min-h-[400px] w-full flex-col gap-3 rounded-xl overflow-visible p-3 sm:p-4">
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
              <div className="min-h-[320px] min-w-0 flex-1 w-full overflow-visible sm:min-h-[360px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
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
                        position="inside"
                        className="fill-text-primary font-body text-small font-medium"
                      />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          ) : showPortfolioChart ? (
            <div className="flex min-h-0 flex-1 w-full flex-col items-center justify-center rounded-xl">
              <PortfolioPieChart />
            </div>
          ) : image ? (
            <div className="flex min-h-0 flex-1 w-full flex-col gap-0 rounded-xl border border-surface-stroke bg-surface-card overflow-hidden">
              <div className="relative h-full min-h-0 w-full flex-1 rounded-xl overflow-hidden bg-surface-bg">
                <Image
                src={image}
                alt=""
                width={640}
                height={360}
                className="h-full w-full rounded-xl object-cover"
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

export function BenefitsSection({ cards }: { cards: BenefitsCardItem[] }) {
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
        {cards.map((card, index) => (
          <BenefitsCard
            key={index}
            headline={card.headline}
            body={card.body}
            hasRiskButtons={card.hasRiskButtons}
            imageFirst={index % 2 === 1}
            index={index}
            image={card.image}
            showPortfolioChart={card.showPortfolioChart}
          />
        ))}
      </Container>
    </motion.section>
  );
}
