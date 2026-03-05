"use client";

import { useState } from "react";
import { Cell, Pie, PieChart } from "recharts";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
import { motion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { H2, H4, TextMedium, TextRegular, TextSmall } from "@/components/ui/Typography";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { sectionFadeInUp, sectionViewport } from "@/lib/sectionMotion";
import { cx } from "@/utils/cx";

// ─── Data: update this object to change all content on this section ───
const SUBFUND_TABS = [
  { id: "money-market", label: "Money market" },
  { id: "debt", label: "Debt" },
  { id: "equity", label: "Equity" },
] as const;

const SUBFUND_DEBT_DATA = {
  navLabel: "NAV" as const,
  nav: { value: "10.8977", asOf: "As of 27 Feb 2026" },
  riskReward: "Medium Risk",
  mtd: { value: "8.44%", asOf: "As of 22 Feb 2026" },
  expenseRatio: {
    mtd: "0.9% (MTD)",
    ytd: "0.83% (YTD)",
    asOf: "As of 31 Jan 2026",
  },
  productSummary:
    "Debt Sub-Fund invests in Shariah-compliant fixed-income instruments, including corporate sukuks and government bonds with a longer duration, offering moderate returns with a balanced risk profile.",
  investmentObjective:
    "Investment objective is to generate moderate returns with controlled risk exposure, by investing in Shariah-compliant fixed-income instruments, including sukuks and government bonds, aimed at providing income and preserving capital.",
  keyFacts: [
    { label: "Net assets", value: "PKR 83.7mn" },
    { label: "Launch date", value: "May 26, 2025" },
    { label: "Fund category", value: "Debt" },
    { label: "Fund auditors", value: "A.F. Ferguson & Co." },
    { label: "Fund manager", value: "IGI Life Insurance Limited" },
    { label: "Trustee", value: "Central Depository Company of Pakistan Limited" },
    { label: "Management fee", value: "1.0% p.a" },
    {
      label: "Total Expense Ratio (without govt. levy)",
      value: "2.10% (MTD) | 1.15% (YTD)",
    },
    {
      label: "Total Expense Ratio (with govt. levy)",
      value: "2.31% (MTD) | 1.31% (YTD)",
    },
    { label: "Sales load", value: "NIL" },
    {
      label: "Benchmark",
      value:
        "75% twelve (12) months PKISRV +25% six (6) months average of highest rates on savings account of three (3) AA rated scheduled Islamic Banks or Islamic windows of Conventional Banks as selected by MUFAP",
    },
  ],
  topHoldings: [
    { name: "Sadaqat Limited STS 1", percentage: "6.25%", color: "var(--color-info-200)", value: 6.25 },
    { name: "GO Petroleum STS 1", percentage: "3.61%", color: "var(--color-teal-200)", value: 3.61 },
    { name: "Airlink Limited STS 7", percentage: "2.40%", color: "var(--color-error-200)", value: 2.4 },
  ],
  performanceChartData: [
    { date: "Apr 2023", subfund: 0, benchmark: 0 },
    { date: "Jul 2023", subfund: 1.5, benchmark: 1.4 },
    { date: "Jan 2024", subfund: 3.5, benchmark: 3.2 },
    { date: "Jul 2024", subfund: 6, benchmark: 5.8 },
    { date: "Oct 2024", subfund: 7.5, benchmark: 7.2 },
    { date: "Jan 2025", subfund: 9, benchmark: 8.6 },
    { date: "Apr 2025", subfund: 10.5, benchmark: 10 },
    { date: "Jul 2025", subfund: 12, benchmark: 11.5 },
    { date: "Oct 2025", subfund: 13.5, benchmark: 12.8 },
    { date: "Jan 2026", subfund: 15, benchmark: 14 },
  ],
  performanceChartDomain: [0, 20] as [number, number],
  performanceChartFormatter: (v: number | string) => `${Number(v).toFixed(2)}%`,
  performanceTable: {
    subfundLabel: "MIIRF (Debt)",
    benchmarkLabel: "Benchmark",
    subfundColor: "var(--color-info-200)",
    benchmarkColor: "var(--color-teal-200)",
    rows: [
      { period: "MTD", subfund: "9.58%", benchmark: "9.54%" },
      { period: "YTD", subfund: "10.03%", benchmark: "9.86%" },
      { period: "30D", subfund: "9.13%", benchmark: "9.55%" },
      { period: "90D", subfund: "9.74%", benchmark: "9.63%" },
      { period: "1Y", subfund: "10.31%", benchmark: "10.23%" },
      { period: "Since inception", subfund: "19.68%", benchmark: "11.3%" },
    ],
  },
} as const;

const SUBFUND_MONEY_MARKET_DATA = {
  navLabel: "iNAV" as const,
  nav: { value: "10.779", asOf: "As of 4 Mar 2026" },
  riskReward: "Low Risk",
  mtd: { value: "8.64%", asOf: "As of 4 Mar 2026" },
  expenseRatio: {
    mtd: "2.37% (MTD)",
    ytd: "1.33% (YTD)",
    asOf: "As of 31 Jan 2026",
  },
  productSummary:
    "Money Market Sub-Fund focuses on low-risk, liquid investments such as Islamic sukuks, corporate sukuks and short-term treasury instruments, providing stable returns with minimal volatility.",
  investmentObjective:
    "Investment objective is to provide stable returns with a high level of capital preservation, by investing in low-risk, liquid Shariah-compliant instruments, such as short-term government sukuks and money market instruments.",
  keyFacts: [
    { label: "Net assets", value: "PKR 74.5mn" },
    { label: "Launch date", value: "May 26, 2025" },
    { label: "Fund category", value: "Money Market" },
    { label: "Fund auditors", value: "A.F. Ferguson & Co." },
    { label: "Fund manager", value: "IGI Life Insurance Limited" },
    { label: "Trustee", value: "Central Depository Company of Pakistan Limited" },
    { label: "Management fee", value: "1.0% p.a" },
    {
      label: "Total Expense Ratio (without govt. levy)",
      value: "2.16% (MTD) | 1.17% (YTD)",
    },
    {
      label: "Total Expense Ratio (with govt. levy)",
      value: "2.37% (MTD) | 1.33% (YTD)",
    },
    { label: "Sales load", value: "NIL" },
    {
      label: "Benchmark",
      value:
        "90% three (3) months PKISRV +10% three (3) months average of highest rates on savings account of three (3) AA rated scheduled Islamic Banks or Islamic windows of Conventional Banks as selected by MUFAP",
    },
  ],
  topHoldings: [
    { name: "—", percentage: "—", color: "var(--color-info-200)", value: 1 },
    { name: "—", percentage: "—", color: "var(--color-teal-200)", value: 1 },
  ],
  performanceChartData: [
    { date: "Jun 2025", subfund: 9.9, benchmark: 9.85 },
    { date: "Jul 2025", subfund: 10.0, benchmark: 9.95 },
    { date: "Aug 2025", subfund: 10.23, benchmark: 10.19 },
    { date: "Sep 2025", subfund: 10.35, benchmark: 10.28 },
    { date: "Oct 2025", subfund: 10.42, benchmark: 10.35 },
    { date: "Nov 2025", subfund: 10.5, benchmark: 10.42 },
    { date: "Dec 2025", subfund: 10.58, benchmark: 10.5 },
    { date: "Jan 2026", subfund: 10.65, benchmark: 10.58 },
    { date: "Feb 2026", subfund: 10.72, benchmark: 10.65 },
    { date: "Mar 2026", subfund: 10.78, benchmark: 10.72 },
  ],
  performanceChartDomain: [9.5, 11] as [number, number],
  performanceChartFormatter: (v: number | string) => String(Number(v).toFixed(2)),
  performanceTable: {
    subfundLabel: "MIIRF (Money Market)",
    benchmarkLabel: "Benchmark",
    subfundColor: "var(--color-info-200)",
    benchmarkColor: "var(--color-teal-200)",
    rows: [
      { period: "MTD", subfund: "8.64%", benchmark: "8.67%" },
      { period: "YTD", subfund: "9.66%", benchmark: "9.55%" },
      { period: "30D", subfund: "8.81%", benchmark: "8.71%" },
      { period: "90D", subfund: "8.51%", benchmark: "8.96%" },
      { period: "1Y", subfund: "—", benchmark: "—" },
      { period: "Since inception", subfund: "10.08%", benchmark: "9.54%" },
    ],
  },
} as const;

const SUBFUND_EQUITY_DATA = {
  navLabel: "iNAV" as const,
  nav: { value: "11.4364", asOf: "As of 4 Mar 2026" },
  riskReward: "High Risk",
  mtd: { value: "-6.78%", asOf: "As of 4 Mar 2026" },
  expenseRatio: {
    mtd: "3.05% (MTD)",
    ytd: "2.35% (YTD)",
    asOf: "As of 31 Jan 2026",
  },
  productSummary:
    "Equity Sub-Fund targets Shariah-compliant stocks and equities in leading industries, aiming for higher returns through capital appreciation and attractive dividend yields while adhering to Islamic investment principles.",
  investmentObjective:
    "Investment objective is to achieve long-term capital growth by investing in Shariah-compliant equity securities, with a focus on high-quality companies and industries, while managing risk through diversification.",
  keyFacts: [
    { label: "Net assets", value: "PKR 213.5mn" },
    { label: "Launch date", value: "May 26, 2025" },
    { label: "Fund category", value: "Equity" },
    { label: "Fund auditors", value: "A.F. Ferguson & Co." },
    { label: "Fund manager", value: "IGI Life Insurance Limited" },
    { label: "Trustee", value: "Central Depository Company of Pakistan Limited" },
    { label: "Management fee", value: "2.0% p.a" },
    {
      label: "Total Expense Ratio (without govt. levy)",
      value: "2.64% (MTD) | 2.04% (YTD)",
    },
    {
      label: "Total Expense Ratio (with govt. levy)",
      value: "3.05% (MTD) | 2.35% (YTD)",
    },
    { label: "Sales load", value: "NIL" },
    { label: "Benchmark", value: "KMI-30" },
  ],
  topHoldings: [
    { name: "Mahaana Islamic Index Exchange Traded Fund", percentage: "11.39%", color: "var(--color-info-200)", value: 11.39 },
    { name: "Fauji Fertilizer Company", percentage: "9.12%", color: "var(--color-primary-200)", value: 9.12 },
    { name: "Engro Holdings", percentage: "8.65%", color: "var(--color-teal-200)", value: 8.65 },
    { name: "Oil & Gas Development Company Limited", percentage: "6.65%", color: "var(--color-warning-200)", value: 6.65 },
    { name: "Lucky Cement Limited", percentage: "6.84%", color: "var(--color-error-200)", value: 6.84 },
    { name: "Pakistan Petroleum Limited", percentage: "5.58%", color: "var(--color-info-150)", value: 5.58 },
    { name: "Hub Power Company Limited", percentage: "6.38%", color: "var(--color-teal-150)", value: 6.38 },
    { name: "Meezan Bank Limited", percentage: "5.35%", color: "var(--color-error-150)", value: 5.35 },
    { name: "Systems Limited", percentage: "4.38%", color: "var(--color-warning-200)", value: 4.38 },
    { name: "Mari Energies", percentage: "4.30%", color: "var(--color-primary-150)", value: 4.3 },
  ],
  performanceChartData: [
    { date: "Jun 2025", subfund: 10, benchmark: 10 },
    { date: "Jul 2025", subfund: 9.5, benchmark: 9.5 },
    { date: "Aug 2025", subfund: 10.2, benchmark: 10.3 },
    { date: "Sep 2025", subfund: 11, benchmark: 11.2 },
    { date: "Oct 2025", subfund: 11.8, benchmark: 12 },
    { date: "Nov 2025", subfund: 12.5, benchmark: 12.8 },
    { date: "Dec 2025", subfund: 13.2, benchmark: 13.5 },
    { date: "Jan 2026", subfund: 14, benchmark: 14.2 },
    { date: "Feb 2026", subfund: 13.8, benchmark: 14.5 },
    { date: "Mar 2026", subfund: 11.5, benchmark: 12.5 },
  ],
  performanceChartDomain: [9, 16] as [number, number],
  performanceChartFormatter: (v: number | string) => String(Number(v).toFixed(2)),
  performanceTable: {
    subfundLabel: "MIIRF (Equity)",
    benchmarkLabel: "Benchmark",
    subfundColor: "var(--color-info-200)",
    benchmarkColor: "var(--color-teal-200)",
    rows: [
      { period: "MTD", subfund: "-6.78%", benchmark: "-6.51%" },
      { period: "YTD", subfund: "14.56%", benchmark: "19.00%" },
      { period: "30D", subfund: "-15.98%", benchmark: "-16.28%" },
      { period: "90D", subfund: "-8.84%", benchmark: "-7.59%" },
      { period: "1Y", subfund: "—", benchmark: "—" },
      { period: "Since inception", subfund: "14.80%", benchmark: "23.90%" },
    ],
  },
} as const;

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:gap-6 sm:items-start">
      <TextSmall
        weight="medium"
        className="shrink-0 text-text-tertiary sm:w-[180px]"
      >
        {label}
      </TextSmall>
      <TextMedium weight="semibold" className="min-w-0 text-text-primary">
        {value}
      </TextMedium>
    </div>
  );
}

function SubfundDonutChart({
  holdings,
}: {
  holdings: ReadonlyArray<{ name: string; percentage: string; color: string; value: number }>;
}) {
  const chartData = holdings.map((row) => ({
    name: row.name,
    value: row.value,
    fill: row.color,
  }));
  const chartConfig: ChartConfig = Object.fromEntries(
    holdings.map((row) => [row.name, { label: row.name, color: row.color }])
  );
  return (
    <div
      className="flex min-h-0 w-full items-center justify-center lg:min-h-[280px]"
      role="img"
      aria-label="Top holdings by percentage"
    >
      <ChartContainer
        config={chartConfig}
        className="aspect-square w-full max-w-[280px] sm:max-w-[306px]"
      >
        <PieChart>
          <ChartTooltip
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              const item = payload[0];
              const name = (item.payload as { name?: string }).name ?? item.name;
              const val = item.value;
              const displayValue = typeof val === "number" ? val.toFixed(2) : String(val);
              const color = (item.payload as { fill?: string }).fill ?? item.color;
              return (
                <div className="rounded-lg border border-surface-stroke bg-white p-3 shadow-lg">
                  <p className="flex items-center gap-2 text-tiny font-medium text-text-primary">
                    <span
                      className="h-3.5 w-3.5 shrink-0 rounded"
                      style={{ backgroundColor: color }}
                      aria-hidden
                    />
                    {name}: {displayValue}{name === "—" ? "" : "%"}
                  </p>
                </div>
              );
            }}
            cursor={false}
          />
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            innerRadius="60%"
            outerRadius="90%"
            strokeWidth={0}
            paddingAngle={0}
          >
            {chartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={chartData[index].fill} />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
    </div>
  );
}

export function MIIRFSubfundsSection() {
  const [activeTab, setActiveTab] = useState<"money-market" | "debt" | "equity">("debt");
  const data =
    activeTab === "money-market"
      ? SUBFUND_MONEY_MARKET_DATA
      : activeTab === "equity"
        ? SUBFUND_EQUITY_DATA
        : SUBFUND_DEBT_DATA;

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeInUp}
      className="relative overflow-hidden bg-surface-bg py-12 sm:py-16 lg:py-16 pb-10"
      aria-labelledby="miirf-subfunds-section-heading"
    >
      <Container className="flex flex-col gap-10 px-4 sm:px-6 md:px-8 lg:gap-10 lg:px-12 xl:px-16">
        <H2
          id="miirf-subfunds-section-heading"
          weight="bold"
          className="text-text-primary text-2xl sm:text-3xl lg:text-h2"
        >
          Subfunds
        </H2>

        {/* Tabs */}
        <div
          className="flex w-full flex-wrap justify-center gap-1 rounded-full bg-surface-card p-1"
          role="tablist"
          aria-label="Subfund type"
        >
          {SUBFUND_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cx(
                "flex min-h-[40px] min-w-0 flex-1 items-center justify-center rounded-full px-5 py-3 text-center font-body text-base transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system-brand sm:min-h-[44px]",
                activeTab === tab.id
                  ? "bg-white text-text-primary font-semibold shadow-sm border border-white"
                  : "font-medium text-text-tertiary hover:bg-white/80 hover:text-text-primary"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-10 lg:gap-6">
          {/* Metrics: 4 columns, 1 row */}
          <div className="grid grid-cols-4 grid-rows-1 gap-6 lg:gap-8">
            <div className="flex flex-col gap-1">
              <TextSmall weight="medium" className="text-text-tertiary text-sm">
                {data.navLabel ?? "NAV"}
              </TextSmall>
              <TextMedium weight="semibold" className="text-text-primary text-lg sm:text-xl">
                {data.nav.value}
              </TextMedium>
              <TextSmall weight="medium" className="text-text-tertiary text-xs">
                {data.nav.asOf}
              </TextSmall>
            </div>
            <div className="flex flex-col gap-1">
              <TextSmall weight="medium" className="text-text-tertiary text-sm">
                Risk / Reward scale
              </TextSmall>
              <TextMedium weight="semibold" className="text-text-primary text-lg sm:text-xl">
                {data.riskReward}
              </TextMedium>
            </div>
            <div className="flex flex-col gap-1">
              <TextSmall weight="medium" className="text-text-tertiary text-sm">
                MTD
              </TextSmall>
              <TextMedium weight="semibold" className="text-text-primary text-lg sm:text-xl">
                {data.mtd.value}
              </TextMedium>
              <TextSmall weight="medium" className="text-text-tertiary text-xs">
                {data.mtd.asOf}
              </TextSmall>
            </div>
            <div className="flex flex-col gap-1">
              <TextSmall weight="medium" className="text-text-tertiary text-sm">
                Expense ratio
              </TextSmall>
              <div className="flex flex-wrap items-center gap-2">
                <TextMedium weight="semibold" className="text-text-primary text-lg sm:text-xl">
                  {data.expenseRatio.mtd}
                </TextMedium>
                <span className="h-[18px] w-px shrink-0 rounded-full bg-surface-stroke" aria-hidden />
                <TextMedium weight="semibold" className="text-text-primary text-lg sm:text-xl">
                  {data.expenseRatio.ytd}
                </TextMedium>
              </div>
              <TextSmall weight="medium" className="text-text-tertiary text-xs">
                {data.expenseRatio.asOf}
              </TextSmall>
            </div>
          </div>

          {/* Product summary + Investment objective */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-20">
            <div className="flex flex-col gap-4">
              <H4 className="text-text-primary text-lg sm:text-xl">
                Product summary
              </H4>
              <TextRegular className="text-text-secondary leading-[150%]">
                {data.productSummary}
              </TextRegular>
            </div>
            <div className="flex flex-col gap-4">
              <H4 className="text-text-primary text-lg sm:text-xl">
                Investment objective
              </H4>
              <TextRegular className="text-text-secondary leading-[150%]">
                {data.investmentObjective}
              </TextRegular>
            </div>
          </div>

          {/* Key facts */}
          <div className="flex flex-col gap-6">
            <H4 className="text-text-primary text-lg sm:text-xl">
              Key facts
            </H4>
            <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-x-6 lg:gap-y-6">
              <div className="flex flex-col gap-6">
                {data.keyFacts.slice(0, 6).map(({ label, value }) => (
                  <DetailRow key={label} label={label} value={value} />
                ))}
              </div>
              <div className="flex flex-col gap-6">
                {data.keyFacts.slice(6).map(({ label, value }) => (
                  <DetailRow key={label} label={label} value={value} />
                ))}
              </div>
            </div>
          </div>

          {/* Top holdings: chart + table */}
          <div className="flex flex-col gap-6">
            <H4 className="text-text-primary text-xl lg:text-2xl" weight="semibold">
              Top holdings
            </H4>
            <div className="flex min-w-0 flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
              <div className="flex flex-col justify-center items-center min-w-0 flex-1 lg:max-w-[306px]">
                <SubfundDonutChart holdings={data.topHoldings} />
              </div>
              <div className="min-w-0 flex-1 overflow-x-auto">
                <div className="rounded-2xl border border-surface-stroke bg-white min-w-[280px]">
                  <table
                    className="w-full border-collapse"
                    role="table"
                    aria-label="Top holdings by percentage"
                  >
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="bg-gray-100 px-4 py-4 text-left sm:px-6"
                        >
                          <TextSmall
                            weight="semibold"
                            className="text-text-tertiary text-sm"
                          >
                            Holdings
                          </TextSmall>
                        </th>
                        <th
                          scope="col"
                          className="bg-gray-100 px-4 py-4 text-center sm:px-6"
                        >
                          <TextSmall
                            weight="semibold"
                            className="text-text-tertiary text-sm"
                          >
                            Percentage
                          </TextSmall>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.topHoldings.map((row, index) => (
                        <tr
                          key={`holding-${index}`}
                          className="border-b border-surface-stroke last:border-b-0"
                        >
                          <td className="px-4 py-5 sm:px-6">
                            <div className="flex items-center gap-3">
                              <span
                                className="h-3.5 w-3.5 shrink-0 rounded"
                                style={{ backgroundColor: row.color }}
                                aria-hidden
                              />
                              <TextMedium
                                weight="semibold"
                                className="text-text-primary text-base"
                              >
                                {row.name}
                              </TextMedium>
                            </div>
                          </td>
                          <td className="px-4 py-5 text-center sm:px-6">
                            <TextMedium
                              weight="semibold"
                              className="text-text-primary text-base"
                            >
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

          {/* Historical performance: line chart + table */}
          <div className="flex flex-col gap-6">
            <H4 className="text-text-primary text-xl lg:text-2xl" weight="semibold">
              Historical performance
            </H4>
            <div className="rounded-2xl border border-surface-stroke bg-white p-4 sm:p-6">
              <div
                className="h-56 w-full min-w-0 sm:h-64 lg:h-80"
                role="img"
                aria-label={`Historical performance: ${data.performanceTable.subfundLabel} vs ${data.performanceTable.benchmarkLabel}`}
              >
                <ChartContainer
                  config={{
                    subfund: {
                      label: data.performanceTable.subfundLabel,
                      color: data.performanceTable.subfundColor,
                    },
                    benchmark: {
                      label: data.performanceTable.benchmarkLabel,
                      color: data.performanceTable.benchmarkColor,
                    },
                  }}
                  className="h-full"
                >
                  <LineChart
                    accessibilityLayer
                    data={data.performanceChartData}
                    margin={{ top: 10, right: 12, left: -20, bottom: 8 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="var(--color-surface-stroke)"
                      vertical={false}
                    />
                    <XAxis
                      axisLine={false}
                      dataKey="date"
                      tickLine={false}
                      tickMargin={8}
                      tick={{ fontSize: 12, fill: "var(--color-text-secondary)" }}
                      tickFormatter={(value) => value}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tickMargin={8}
                      tickCount={6}
                      domain={data.performanceChartDomain}
                      tick={{ fontSize: 12, fill: "var(--color-text-secondary)" }}
                      tickFormatter={(value) =>
                        data.performanceChartFormatter
                          ? data.performanceChartFormatter(value)
                          : `${value}%`
                      }
                    />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          formatter={(value) =>
                            data.performanceChartFormatter
                              ? data.performanceChartFormatter(value as number | string)
                              : `${Number(value).toFixed(2)}%`
                          }
                        />
                      }
                      cursor={false}
                    />
                    <Line
                      type="natural"
                      dataKey="subfund"
                      stroke={data.performanceTable.subfundColor}
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      type="natural"
                      dataKey="benchmark"
                      stroke={data.performanceTable.benchmarkColor}
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ChartContainer>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-4 pl-0 sm:pl-9 lg:pl-12">
                <div className="flex items-center gap-2">
                  <span
                    className="h-3.5 w-3.5 shrink-0 rounded"
                    style={{ backgroundColor: data.performanceTable.subfundColor }}
                    aria-hidden
                  />
                  <TextMedium weight="semibold" className="text-text-primary text-sm">
                    {data.performanceTable.subfundLabel}
                  </TextMedium>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="h-3.5 w-3.5 shrink-0 rounded"
                    style={{ backgroundColor: data.performanceTable.benchmarkColor }}
                    aria-hidden
                  />
                  <TextMedium weight="semibold" className="text-text-primary text-sm">
                    {data.performanceTable.benchmarkLabel}
                  </TextMedium>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-surface-stroke bg-white">
              <table
                className="w-full min-w-[600px] border-collapse"
                role="table"
                aria-label="Historical performance by period"
              >
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="bg-gray-100 px-4 py-4 text-left sm:px-6"
                    >
                      <TextSmall
                        weight="semibold"
                        className="text-text-tertiary text-sm"
                      >
                        Subfund
                      </TextSmall>
                    </th>
                    {data.performanceTable.rows.map((r) => (
                      <th
                        key={r.period}
                        scope="col"
                        className="bg-gray-100 px-4 py-4 text-center sm:px-6"
                      >
                        <TextSmall
                          weight="semibold"
                          className="text-text-tertiary text-sm"
                        >
                          {r.period}
                        </TextSmall>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-surface-stroke">
                    <td className="px-4 py-5 sm:px-6">
                      <div className="flex items-center gap-3">
                        <span
                          className="h-3.5 w-3.5 shrink-0 rounded"
                          style={{
                            backgroundColor: data.performanceTable.subfundColor,
                          }}
                          aria-hidden
                        />
                        <TextMedium
                          weight="semibold"
                          className="text-text-primary text-base"
                        >
                          {data.performanceTable.subfundLabel}
                        </TextMedium>
                      </div>
                    </td>
                    {data.performanceTable.rows.map((r) => (
                      <td
                        key={r.period}
                        className="px-4 py-5 text-center sm:px-6"
                      >
                        <TextMedium
                          weight="semibold"
                          className="text-text-primary text-base"
                        >
                          {r.subfund}
                        </TextMedium>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-surface-stroke last:border-b-0">
                    <td className="px-4 py-5 sm:px-6">
                      <div className="flex items-center gap-3">
                        <span
                          className="h-3.5 w-3.5 shrink-0 rounded"
                          style={{
                            backgroundColor: data.performanceTable.benchmarkColor,
                          }}
                          aria-hidden
                        />
                        <TextMedium
                          weight="semibold"
                          className="text-text-primary text-base"
                        >
                          {data.performanceTable.benchmarkLabel}
                        </TextMedium>
                      </div>
                    </td>
                    {data.performanceTable.rows.map((r) => (
                      <td
                        key={r.period}
                        className="px-4 py-5 text-center sm:px-6"
                      >
                        <TextMedium
                          weight="semibold"
                          className="text-text-primary text-base"
                        >
                          {r.benchmark}
                        </TextMedium>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Container>
    </motion.section>
  );
}
