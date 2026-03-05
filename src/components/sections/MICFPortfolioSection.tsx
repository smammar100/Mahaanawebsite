"use client";

import { useState } from "react";
import { Bar, BarChart, Cell, CartesianGrid, Legend, Pie, PieChart, XAxis, YAxis } from "recharts";
import { motion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { H2, H4, TextMedium, TextSmall } from "@/components/ui/Typography";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { sectionFadeInUp, sectionViewport } from "@/lib/sectionMotion";
import { cx } from "@/utils/cx";

const ASSET_COLORS = {
  bankDeposits: "var(--color-info-200)",
  musharaka: "var(--color-teal-200)",
  govtSecurities: "var(--color-error-200)",
  shortTermSukuk: "var(--color-warning-200)",
  baiMuajjal: "var(--color-primary-200)",
  otherAssets: "var(--color-info-150)",
} as const;

const assetAllocationChartData = [
  { item: "Bank Deposits", previousMonth: 37.53, currentMonth: 14.61, fill: ASSET_COLORS.bankDeposits },
  { item: "Musharaka", previousMonth: 12, currentMonth: 18, fill: ASSET_COLORS.musharaka },
  { item: "Govt Securities (GOP ijarah)", previousMonth: 8, currentMonth: 22, fill: ASSET_COLORS.govtSecurities },
  { item: "Short Term Sukuk", previousMonth: 15, currentMonth: 20, fill: ASSET_COLORS.shortTermSukuk },
  { item: "Bai Muajjal", previousMonth: 10, currentMonth: 12, fill: ASSET_COLORS.baiMuajjal },
  { item: "Other Assets", previousMonth: 17.47, currentMonth: 13.39, fill: ASSET_COLORS.otherAssets },
];

const ASSET_ALLOCATION_ROWS = [
  { item: "Bank Deposits", currentMonth: "14.61%", previousMonth: "37.53%", color: ASSET_COLORS.bankDeposits },
  { item: "Musharaka", currentMonth: "18.00%", previousMonth: "12.00%", color: ASSET_COLORS.musharaka },
  { item: "Govt Securities (GOP ijarah)", currentMonth: "22.00%", previousMonth: "8.00%", color: ASSET_COLORS.govtSecurities },
  { item: "Short Term Sukuk", currentMonth: "20.00%", previousMonth: "15.00%", color: ASSET_COLORS.shortTermSukuk },
  { item: "Bai Muajjal", currentMonth: "12.00%", previousMonth: "10.00%", color: ASSET_COLORS.baiMuajjal },
  { item: "Other Assets", currentMonth: "13.39%", previousMonth: "17.47%", color: ASSET_COLORS.otherAssets },
];

const assetAllocationChartConfig: ChartConfig = {
  previousMonth: { label: "Previous month", color: "var(--color-info-200)" },
  currentMonth: { label: "Current month", color: "var(--color-teal-200)" },
};

const CREDIT_QUALITY_COLORS = {
  aaa: "var(--color-info-200)",
  aaPlus: "var(--color-teal-200)",
  aa: "var(--color-error-200)",
  a1: "var(--color-warning-200)",
} as const;

const CREDIT_QUALITY_ROWS = [
  { item: "AAA", percentage: "45.68%", color: CREDIT_QUALITY_COLORS.aaa, value: 45.68 },
  { item: "AA+", percentage: "27.98%", color: CREDIT_QUALITY_COLORS.aaPlus, value: 27.98 },
  { item: "AA", percentage: "12.79%", color: CREDIT_QUALITY_COLORS.aa, value: 12.79 },
  { item: "A1", percentage: "13.29%", color: CREDIT_QUALITY_COLORS.a1, value: 13.29 },
];

const creditQualityChartData = CREDIT_QUALITY_ROWS.map((row) => ({
  name: row.item,
  value: row.value,
  fill: row.color,
}));

const creditQualityChartConfig: ChartConfig = Object.fromEntries(
  CREDIT_QUALITY_ROWS.map((row) => [row.item, { label: row.item, color: row.color }])
);

const HOLDINGS_COLORS = {
  sadaqat: "var(--color-info-200)",
  zarea: "var(--color-teal-200)",
  goPetroleum: "var(--color-error-200)",
  other1: "var(--color-warning-200)",
  other2: "var(--color-primary-200)",
  other3: "var(--color-info-150)",
} as const;

const TOP_HOLDINGS_ROWS = [
  { name: "Sadaqat Limited STS 1", percentage: "18.50%", color: HOLDINGS_COLORS.sadaqat, value: 18.5 },
  { name: "Zarea Limited STS 1", percentage: "15.20%", color: HOLDINGS_COLORS.zarea, value: 15.2 },
  { name: "Go Petroleum STS 1", percentage: "12.80%", color: HOLDINGS_COLORS.goPetroleum, value: 12.8 },
  { name: "Other holdings", percentage: "28.40%", color: HOLDINGS_COLORS.other1, value: 28.4 },
  { name: "Other instruments", percentage: "15.10%", color: HOLDINGS_COLORS.other2, value: 15.1 },
  { name: "Additional", percentage: "10.00%", color: HOLDINGS_COLORS.other3, value: 10 },
] as const;

const holdingsChartData = TOP_HOLDINGS_ROWS.map((row) => ({
  name: row.name,
  value: row.value,
  fill: row.color,
}));

const holdingsChartConfig: ChartConfig = Object.fromEntries(
  TOP_HOLDINGS_ROWS.map((row) => [row.name, { label: row.name, color: row.color }])
);

function DonutChart({
  data,
  config,
  ariaLabel,
  onSegmentHover,
}: {
  data: { name: string; value: number; fill: string }[];
  config: ChartConfig;
  ariaLabel: string;
  onSegmentHover: (index: number | null) => void;
}) {
  return (
    <div
      className="flex min-h-0 w-full items-center justify-center lg:min-h-[280px]"
      role="img"
      aria-label={ariaLabel}
    >
      <ChartContainer
        config={config}
        className="aspect-square w-full max-w-[280px]"
      >
        <PieChart>
          <ChartTooltip
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              const item = payload[0];
              const name = (item.payload as { name?: string }).name ?? item.name;
              const value = Number(item.value).toFixed(2);
              const color = (item.payload as { fill?: string }).fill ?? item.color;
              return (
                <div className="rounded-lg border border-surface-stroke bg-white p-3 shadow-lg">
                  <p className="flex items-center gap-2 text-tiny font-medium text-text-primary">
                    <span
                      className="h-3.5 w-3.5 shrink-0 rounded"
                      style={{ backgroundColor: color }}
                      aria-hidden
                    />
                    {name}: {value}%
                  </p>
                </div>
              );
            }}
            cursor={false}
          />
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius="60%"
            outerRadius="90%"
            strokeWidth={0}
            paddingAngle={0}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={data[index].fill}
                onMouseEnter={() => onSegmentHover(index)}
                onMouseLeave={() => onSegmentHover(null)}
              />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
    </div>
  );
}

export function MICFPortfolioSection() {
  const [hoveredCreditIndex, setHoveredCreditIndex] = useState<number | null>(null);
  const [hoveredHoldingsIndex, setHoveredHoldingsIndex] = useState<number | null>(null);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeInUp}
      className="relative overflow-hidden bg-surface-bg py-12 sm:py-16 lg:py-16"
      aria-labelledby="micf-portfolio-section-heading"
    >
      <Container className="flex flex-col gap-10 px-4 sm:px-6 md:px-8 lg:gap-10 lg:px-12 xl:px-16">
        <H2
          id="micf-portfolio-section-heading"
          weight="bold"
          className="text-text-primary text-2xl sm:text-3xl lg:text-h2"
        >
          Portfolio
        </H2>

        <div className="flex flex-col gap-10 lg:gap-10">
          {/* 1. Asset Allocation: bar chart + table */}
          <div className="flex flex-col gap-6">
            <H4 className="text-text-primary text-xl lg:text-2xl" weight="semibold">
              Asset Allocation
            </H4>
            <div className="flex flex-col gap-6">
              <div
                className="h-56 w-full min-w-0 sm:h-64 lg:h-80 rounded-2xl border border-surface-stroke bg-white p-4 sm:p-6"
                role="img"
                aria-label="Asset allocation: previous month vs current month by category"
              >
                <ChartContainer config={assetAllocationChartConfig} className="h-full">
                  <BarChart
                    accessibilityLayer
                    data={assetAllocationChartData}
                    margin={{ top: 10, right: 12, left: 8, bottom: 60 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="var(--color-surface-stroke)"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="item"
                      axisLine={false}
                      tickLine={false}
                      tickMargin={8}
                      tick={{ fontSize: 11, fill: "var(--color-text-secondary)" }}
                      angle={-35}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tickMargin={8}
                      tickCount={6}
                      domain={[0, 50]}
                      tick={{ fontSize: 12, fill: "var(--color-text-secondary)" }}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <ChartTooltip
                      content={({ active, payload }) => {
                        if (!active || !payload?.length) return null;
                        const p = payload[0].payload as (typeof assetAllocationChartData)[0];
                        return (
                          <div className="rounded-lg border border-surface-stroke bg-white p-3 shadow-lg">
                            <p className="text-tiny font-medium text-text-primary">{p.item}</p>
                            <p className="text-tiny text-text-secondary">Previous: {p.previousMonth}%</p>
                            <p className="text-tiny text-text-secondary">Current: {p.currentMonth}%</p>
                          </div>
                        );
                      }}
                      cursor={false}
                    />
                    <Legend />
                    <Bar dataKey="previousMonth" fill="var(--color-info-200)" name="Previous month" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="currentMonth" fill="var(--color-teal-200)" name="Current month" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              </div>
              <div className="overflow-x-auto rounded-2xl border border-surface-stroke bg-white">
                <table
                  className="w-full min-w-[400px] border-collapse"
                  role="table"
                  aria-label="Asset allocation by category"
                >
                  <thead>
                    <tr>
                      <th scope="col" className="bg-gray-100 px-4 py-4 text-left sm:px-6">
                        <TextSmall weight="semibold" className="text-text-tertiary text-sm">
                          Items
                        </TextSmall>
                      </th>
                      <th scope="col" className="bg-gray-100 px-4 py-4 text-center sm:px-6">
                        <TextSmall weight="semibold" className="text-text-tertiary text-sm">
                          Current month
                        </TextSmall>
                      </th>
                      <th scope="col" className="bg-gray-100 px-4 py-4 text-center sm:px-6">
                        <TextSmall weight="semibold" className="text-text-tertiary text-sm">
                          Previous month
                        </TextSmall>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {ASSET_ALLOCATION_ROWS.map((row) => (
                      <tr key={row.item} className="border-b border-surface-stroke last:border-b-0">
                        <td className="px-4 py-5 sm:px-6">
                          <div className="flex items-center gap-3">
                            <span
                              className="h-3.5 w-3.5 shrink-0 rounded"
                              style={{ backgroundColor: row.color }}
                              aria-hidden
                            />
                            <TextMedium weight="semibold" className="text-text-primary text-base">
                              {row.item}
                            </TextMedium>
                          </div>
                        </td>
                        <td className="px-4 py-5 text-center sm:px-6">
                          <TextMedium weight="semibold" className="text-text-primary text-base">
                            {row.currentMonth}
                          </TextMedium>
                        </td>
                        <td className="px-4 py-5 text-center sm:px-6">
                          <TextMedium weight="semibold" className="text-text-primary text-base">
                            {row.previousMonth}
                          </TextMedium>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* 2. Credit quality: table (left) + donut (right) */}
          <div className="flex flex-col gap-6">
            <H4 className="text-text-primary text-xl lg:text-2xl" weight="semibold">
              Credit quality
            </H4>
            <div className="flex min-w-0 flex-col gap-6 lg:flex-row lg:gap-6">
              <div className="min-w-0 flex-1 lg:w-1/2">
                <div className="overflow-x-auto rounded-2xl border border-surface-stroke bg-white">
                  <table
                    className="w-full min-w-[320px] border-collapse"
                    role="table"
                    aria-label="Credit quality by rating"
                  >
                    <thead>
                      <tr>
                        <th scope="col" className="bg-gray-100 px-4 py-4 text-left sm:px-6">
                          <TextSmall weight="semibold" className="text-text-tertiary text-sm">
                            Items
                          </TextSmall>
                        </th>
                        <th scope="col" className="bg-gray-100 px-4 py-4 text-center sm:px-6">
                          <TextSmall weight="semibold" className="text-text-tertiary text-sm">
                            Percentage
                          </TextSmall>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {CREDIT_QUALITY_ROWS.map((row, index) => (
                        <tr
                          key={row.item}
                          className={cx(
                            "border-b border-surface-stroke last:border-b-0 transition-colors",
                            hoveredCreditIndex === index && "bg-gray-100"
                          )}
                        >
                          <td className="px-4 py-5 sm:px-6">
                            <div className="flex items-center gap-3">
                              <span
                                className="h-3.5 w-3.5 shrink-0 rounded"
                                style={{ backgroundColor: row.color }}
                                aria-hidden
                              />
                              <TextMedium weight="semibold" className="text-text-primary text-base">
                                {row.item}
                              </TextMedium>
                            </div>
                          </td>
                          <td className="px-4 py-5 text-center sm:px-6">
                            <TextMedium weight="semibold" className="text-text-primary text-base">
                              {row.percentage}
                            </TextMedium>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center min-w-0 flex-1 lg:w-1/2">
                <DonutChart
                  data={creditQualityChartData}
                  config={creditQualityChartConfig}
                  ariaLabel="Credit quality by rating"
                  onSegmentHover={setHoveredCreditIndex}
                />
              </div>
            </div>
          </div>

          {/* 3. Top holdings: donut (left) + table (right) */}
          <div className="flex flex-col gap-6">
            <H4 className="text-text-primary text-xl lg:text-2xl" weight="semibold">
              Top holdings
            </H4>
            <div className="flex min-w-0 flex-col gap-6 lg:flex-row lg:gap-6">
              <div className="flex flex-col justify-center items-center min-w-0 flex-1 lg:w-1/2">
                <DonutChart
                  data={holdingsChartData}
                  config={holdingsChartConfig}
                  ariaLabel="Top holdings by percentage"
                  onSegmentHover={setHoveredHoldingsIndex}
                />
              </div>
              <div className="min-w-0 flex-1 lg:w-1/2">
                <div className="overflow-x-auto rounded-2xl border border-surface-stroke bg-white">
                  <table
                    className="w-full min-w-[320px] border-collapse"
                    role="table"
                    aria-label="Top holdings by percentage"
                  >
                    <thead>
                      <tr>
                        <th scope="col" className="bg-gray-100 px-4 py-4 text-left sm:px-6">
                          <TextSmall weight="semibold" className="text-text-tertiary text-sm">
                            Instrument
                          </TextSmall>
                        </th>
                        <th scope="col" className="bg-gray-100 px-4 py-4 text-center sm:px-6">
                          <TextSmall weight="semibold" className="text-text-tertiary text-sm">
                            Percentage
                          </TextSmall>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {TOP_HOLDINGS_ROWS.map((row, index) => (
                        <tr
                          key={row.name}
                          className={cx(
                            "border-b border-surface-stroke last:border-b-0 transition-colors",
                            hoveredHoldingsIndex === index && "bg-gray-100"
                          )}
                        >
                          <td className="px-4 py-5 sm:px-6">
                            <div className="flex items-center gap-3">
                              <span
                                className="h-3.5 w-3.5 shrink-0 rounded"
                                style={{ backgroundColor: row.color }}
                                aria-hidden
                              />
                              <TextMedium weight="semibold" className="text-text-primary text-base">
                                {row.name}
                              </TextMedium>
                            </div>
                          </td>
                          <td className="px-4 py-5 text-center sm:px-6">
                            <TextMedium weight="semibold" className="text-text-primary text-base">
                              {row.percentage}
                            </TextMedium>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </motion.section>
  );
}
