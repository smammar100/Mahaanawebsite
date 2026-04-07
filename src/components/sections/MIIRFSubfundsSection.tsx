"use client";

import { useState } from "react";
import { motion } from "motion/react";
import type { MiirfSubfundData, MiirfSubfundsFundData } from "@/lib/miirf-fund-api";
import { Container } from "@/components/layout/Container";
import { H3, H4, TextMedium, TextRegular, TextSmall } from "@/components/ui/Typography";
import { HighchartsVariablePieChart } from "@/components/ui/HighchartsVariablePieChart";
import { HighchartsPerformanceChart } from "@/components/ui/HighchartsPerformanceChart";
import { fundTableCardClass, fundTableFixedClass } from "@/components/ui/fundTableClasses";
import { sectionFadeInUp, sectionViewport } from "@/lib/sectionMotion";
import { cx } from "@/utils/cx";
import { cleanCopy } from "@/lib/copy-utils";

// ─── Data: update this object to change all content on this section ───
const SUBFUND_TABS = [
  { id: "money-market", label: "Money market" },
  { id: "debt", label: "Debt" },
  { id: "equity", label: "Equity" },
] as const;

const SUBFUND_DEBT_DATA: MiirfSubfundData = {
  navLabel: "NAV",
  nav: { value: "10.8977", asOf: "As of 27 Feb 2026" },
  riskReward: "Medium Risk",
  mtd: { value: "8.44%", asOf: "As of 22 Feb 2026" },
  expenseRatio: {
    mtd: "0.9% (MTD)",
    ytd: "0.83% (YTD)",
    asOf: "As of 31 Jan 2026",
  },
  productSummary:
    "Debt Sub-Fund invests in Shariah compliant fixed income instruments, including corporate sukuks and government bonds with a longer duration, offering moderate returns with a balanced risk profile.",
  investmentObjective:
    "Investment objective is to generate moderate returns with controlled risk exposure, by investing in Shariah compliant fixed income instruments, including sukuks and government bonds, aimed at providing income and preserving capital.",
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
  pieSectionTitle: "Asset allocation",
  pieNameColumnLabel: "Asset class",
  topHoldings: [
    { name: "Corporate sukuks", percentage: "42.50%", color: "var(--color-info-200)", value: 42.5 },
    { name: "Short term sukuks", percentage: "28.30%", color: "var(--color-teal-200)", value: 28.3 },
    { name: "Govt securities", percentage: "18.20%", color: "var(--color-error-200)", value: 18.2 },
    { name: "Bank deposits / placements", percentage: "11.00%", color: "var(--color-warning-200)", value: 11 },
  ],
  performanceChartData: [
    { date: "May 26, 2025", subfund: 10.0, benchmark: 10.0 },
    { date: "Jun 2025", subfund: 10.08, benchmark: 10.06 },
    { date: "Jul 2025", subfund: 10.15, benchmark: 10.12 },
    { date: "Aug 2025", subfund: 10.22, benchmark: 10.18 },
    { date: "Sep 2025", subfund: 10.31, benchmark: 10.25 },
    { date: "Oct 2025", subfund: 10.42, benchmark: 10.33 },
    { date: "Nov 2025", subfund: 10.55, benchmark: 10.41 },
    { date: "Dec 2025", subfund: 10.68, benchmark: 10.52 },
    { date: "Jan 2026", subfund: 10.78, benchmark: 10.61 },
    { date: "Feb 2026", subfund: 10.8977, benchmark: 10.72 },
  ],
  performanceChartDomain: [9.85, 11.05],
  performanceYAxisTitle: "NAV / benchmark",
  performanceValueSuffix: "",
  performanceChartSubtitleLead: "Subfund vs benchmark unit values.",
  performanceChartFormatter: (v: number | string) => String(Number(v).toFixed(4)),
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
};

const SUBFUND_MONEY_MARKET_DATA: MiirfSubfundData = {
  navLabel: "iNAV",
  nav: { value: "10.779", asOf: "As of 4 Mar 2026" },
  riskReward: "Low Risk",
  mtd: { value: "8.64%", asOf: "As of 4 Mar 2026" },
  expenseRatio: {
    mtd: "2.37% (MTD)",
    ytd: "1.33% (YTD)",
    asOf: "As of 31 Jan 2026",
  },
  productSummary:
    "Money Market Sub-Fund focuses on low risk, liquid investments such as Islamic sukuks, corporate sukuks and short term treasury instruments, providing stable returns with minimal volatility.",
  investmentObjective:
    "Investment objective is to provide stable returns with a high level of capital preservation, by investing in low risk, liquid Shariah compliant instruments, such as short term government sukuks and money market instruments.",
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
  pieSectionTitle: "Asset allocation",
  pieNameColumnLabel: "Asset class",
  topHoldings: [
    { name: "Short term sukuks", percentage: "38.00%", color: "var(--color-info-200)", value: 38 },
    { name: "Treasury / govt instruments", percentage: "32.50%", color: "var(--color-teal-200)", value: 32.5 },
    { name: "Corporate sukuks", percentage: "22.00%", color: "var(--color-error-200)", value: 22 },
    { name: "Cash & equivalents", percentage: "7.50%", color: "var(--color-warning-200)", value: 7.5 },
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
  performanceChartDomain: [9.5, 11],
  performanceYAxisTitle: "iNAV / benchmark",
  performanceValueSuffix: "",
  performanceChartSubtitleLead: "Subfund vs benchmark unit values.",
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
};

const SUBFUND_EQUITY_DATA: MiirfSubfundData = {
  navLabel: "iNAV",
  nav: { value: "11.4364", asOf: "As of 4 Mar 2026" },
  riskReward: "High Risk",
  mtd: { value: "-6.78%", asOf: "As of 4 Mar 2026" },
  expenseRatio: {
    mtd: "3.05% (MTD)",
    ytd: "2.35% (YTD)",
    asOf: "As of 31 Jan 2026",
  },
  productSummary:
    "Equity Sub-Fund targets Shariah compliant stocks and equities in leading industries, aiming for higher returns through capital appreciation and attractive dividend yields while adhering to Islamic investment principles.",
  investmentObjective:
    "Investment objective is to achieve long term capital growth by investing in Shariah compliant equity securities, with a focus on high quality companies and industries, while managing risk through diversification.",
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
  pieSectionTitle: "Sector allocation",
  pieNameColumnLabel: "Sector",
  topHoldings: [
    { name: "Oil & gas", percentage: "18.20%", color: "var(--color-info-200)", value: 18.2 },
    { name: "Commercial banks", percentage: "16.40%", color: "var(--color-primary-200)", value: 16.4 },
    { name: "Cement", percentage: "12.80%", color: "var(--color-teal-200)", value: 12.8 },
    { name: "Fertilizers", percentage: "11.50%", color: "var(--color-warning-200)", value: 11.5 },
    { name: "Power generation", percentage: "10.20%", color: "var(--color-error-200)", value: 10.2 },
    { name: "Technology", percentage: "8.60%", color: "var(--color-info-150)", value: 8.6 },
    { name: "Textile", percentage: "7.10%", color: "var(--color-teal-150)", value: 7.1 },
    { name: "Other", percentage: "15.20%", color: "var(--color-error-150)", value: 15.2 },
  ],
  performanceChartData: [
    { date: "Jun 2025", subfund: 10.0, benchmark: 10.0 },
    { date: "Jul 2025", subfund: 9.5, benchmark: 9.55 },
    { date: "Aug 2025", subfund: 10.2, benchmark: 10.35 },
    { date: "Sep 2025", subfund: 11.0, benchmark: 11.25 },
    { date: "Oct 2025", subfund: 11.8, benchmark: 12.05 },
    { date: "Nov 2025", subfund: 12.5, benchmark: 12.85 },
    { date: "Dec 2025", subfund: 13.2, benchmark: 13.55 },
    { date: "Jan 2026", subfund: 14.0, benchmark: 14.35 },
    { date: "Feb 2026", subfund: 13.8, benchmark: 14.65 },
    { date: "Mar 2026", subfund: 11.4364, benchmark: 12.55 },
  ],
  performanceChartDomain: [9, 15.5],
  performanceYAxisTitle: "iNAV / benchmark",
  performanceValueSuffix: "",
  performanceChartSubtitleLead: "Subfund vs benchmark unit values.",
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
};

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
  ariaLabel,
}: {
  holdings: ReadonlyArray<{ name: string; percentage: string; color: string; value: number }>;
  ariaLabel: string;
}) {
  const chartData = holdings.map((row) => ({
    name: row.name,
    value: row.value,
    fill: row.color,
  }));
  return <HighchartsVariablePieChart data={chartData} ariaLabel={ariaLabel} />;
}

export function MIIRFSubfundsSection({ fundData }: { fundData?: MiirfSubfundsFundData | null }) {
  const [activeTab, setActiveTab] = useState<"money-market" | "debt" | "equity">("debt");
  const data = fundData
    ? activeTab === "money-market"
      ? fundData.moneyMarket
      : activeTab === "equity"
        ? fundData.equity
        : fundData.debt
    : activeTab === "money-market"
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
      className="relative overflow-hidden bg-surface-bg py-8 sm:py-12 lg:py-16 pb-10"
      aria-labelledby="miirf-subfunds-section-heading"
    >
      <Container className="flex flex-col gap-10 px-4 sm:px-6 md:px-8 lg:gap-10 lg:px-12 xl:px-16">
        <H3
          id="miirf-subfunds-section-heading"
          weight="bold"
          className="text-text-primary"
        >
          Subfunds
        </H3>

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
                "flex min-h-[40px] min-w-0 flex-1 items-center justify-center rounded-full px-5 py-3 text-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system-brand sm:min-h-[44px]",
                activeTab === tab.id
                  ? "bg-white text-text-primary shadow-sm border border-white"
                  : "text-text-tertiary hover:bg-white/80 hover:text-text-primary"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-10 lg:gap-6">
          {/* Metrics: 4 columns, 1 row */}
          <div className="grid grid-cols-4 grid-rows-1 gap-6 lg:gap-8">
            <div className="min-w-0 flex flex-col gap-1">
              <TextSmall weight="medium" className="text-text-tertiary">
                {data.navLabel ?? "NAV"}
              </TextSmall>
              <TextMedium weight="semibold" className="text-stat text-text-primary">
                {data.nav.value}
              </TextMedium>
              <TextSmall weight="medium" className="text-text-tertiary">
                {data.nav.asOf}
              </TextSmall>
            </div>
            <div className="min-w-0 flex flex-col gap-1">
              <TextSmall weight="medium" className="text-text-tertiary">
                Risk / Reward scale
              </TextSmall>
              <TextMedium weight="semibold" className="text-stat text-text-primary">
                {data.riskReward}
              </TextMedium>
            </div>
            <div className="min-w-0 flex flex-col gap-1">
              <TextSmall weight="medium" className="text-text-tertiary">
                MTD
              </TextSmall>
              <TextMedium weight="semibold" className="text-stat text-text-primary">
                {data.mtd.value}
              </TextMedium>
              <TextSmall weight="medium" className="text-text-tertiary">
                {data.mtd.asOf}
              </TextSmall>
            </div>
            <div className="min-w-0 flex flex-col gap-1">
              <TextSmall weight="medium" className="text-text-tertiary">
                Expense ratio
              </TextSmall>
              <div className="flex flex-wrap items-center gap-2">
                <TextMedium weight="semibold" className="text-stat text-text-primary">
                  {data.expenseRatio.mtd}
                </TextMedium>
                <span className="h-[18px] w-px shrink-0 rounded-full bg-surface-stroke" aria-hidden />
                <TextMedium weight="semibold" className="text-stat text-text-primary">
                  {data.expenseRatio.ytd}
                </TextMedium>
              </div>
              <TextSmall weight="medium" className="text-text-tertiary">
                {data.expenseRatio.asOf}
              </TextSmall>
            </div>
          </div>

          {/* Product summary + Investment objective */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-8">
            <div className="min-w-0 flex flex-col gap-4">
              <H4 className="text-stat text-text-primary">
                Product summary
              </H4>
              <TextRegular className="min-w-0 break-words text-text-tertiary leading-[150%]">
                {cleanCopy(data.productSummary)}
              </TextRegular>
            </div>
            <div className="min-w-0 flex flex-col gap-4">
              <H4 className="text-stat text-text-primary">
                Investment objective
              </H4>
              <TextRegular className="min-w-0 break-words text-text-tertiary leading-[150%]">
                {cleanCopy(data.investmentObjective)}
              </TextRegular>
            </div>
          </div>

          {/* Key facts */}
          <div className="flex flex-col gap-6">
            <H4 className="text-stat text-text-primary">
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

          {/* Historical performance: Highcharts line chart + table */}
          <div className="flex flex-col gap-6">
            <H4 className="text-text-primary" weight="semibold">
              Historical performance
            </H4>
            <div className="h-fit rounded-2xl border border-surface-stroke bg-surface-card p-4 sm:p-6">
              <div
                className="h-fit w-full min-w-0"
                role="img"
                aria-label={`Historical performance: ${data.performanceTable.subfundLabel} vs ${data.performanceTable.benchmarkLabel}`}
              >
                <HighchartsPerformanceChart
                  title="Historical performance"
                  subtitle={`${data.performanceChartSubtitleLead} ${data.performanceChartData[0]?.date ?? ""} to ${data.performanceChartData[data.performanceChartData.length - 1]?.date ?? ""}.`}
                  categories={data.performanceChartData.map((d) => d.date)}
                  series={[
                    {
                      name: data.performanceTable.subfundLabel,
                      data: data.performanceChartData.map((d) => d.subfund),
                      color: data.performanceTable.subfundColor,
                    },
                    {
                      name: data.performanceTable.benchmarkLabel,
                      data: data.performanceChartData.map((d) => d.benchmark),
                      color: data.performanceTable.benchmarkColor,
                    },
                  ]}
                  ariaLabel={`Historical performance: ${data.performanceTable.subfundLabel} vs ${data.performanceTable.benchmarkLabel}`}
                  chartType="line"
                  yAxisTitle={data.performanceYAxisTitle}
                  valueSuffix={data.performanceValueSuffix}
                  xAxisLabelFormat="firstLastOnly"
                  compact
                />
              </div>
            </div>

            <div className={fundTableCardClass}>
              <table
                className={fundTableFixedClass}
                role="table"
                aria-label="Historical performance by period"
              >
                <colgroup>
                  <col style={{ width: "22%" }} />
                  {data.performanceTable.rows.map((r) => (
                    <col
                      key={r.period}
                      style={{
                        width: `${78 / data.performanceTable.rows.length}%`,
                      }}
                    />
                  ))}
                </colgroup>
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="min-w-0 bg-surface-stroke px-2 py-3 text-left sm:px-3"
                    >
                      <TextSmall
                        weight="semibold"
                        className="text-text-tertiary"
                      >
                        Subfund
                      </TextSmall>
                    </th>
                    {data.performanceTable.rows.map((r) => (
                      <th
                        key={r.period}
                        scope="col"
                        className="bg-surface-stroke px-1 py-3 text-center sm:px-2"
                      >
                        <TextSmall
                          weight="semibold"
                          className="text-text-tertiary"
                        >
                          {r.period}
                        </TextSmall>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-surface-stroke">
                    <td className="min-w-0 px-2 py-4 sm:px-3">
                      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                        <span
                          className="h-3.5 w-3.5 shrink-0 rounded"
                          style={{
                            backgroundColor: data.performanceTable.subfundColor,
                          }}
                          aria-hidden
                        />
                        <TextMedium
                          weight="semibold"
                          className="min-w-0 truncate text-text-primary sm:whitespace-normal"
                        >
                          {data.performanceTable.subfundLabel}
                        </TextMedium>
                      </div>
                    </td>
                    {data.performanceTable.rows.map((r) => (
                      <td
                        key={r.period}
                        className="px-1 py-4 text-center sm:px-2"
                      >
                        <TextMedium
                          weight="semibold"
                          className="text-text-primary"
                        >
                          {r.subfund}
                        </TextMedium>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-surface-stroke last:border-b-0">
                    <td className="min-w-0 px-2 py-4 sm:px-3">
                      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                        <span
                          className="h-3.5 w-3.5 shrink-0 rounded"
                          style={{
                            backgroundColor: data.performanceTable.benchmarkColor,
                          }}
                          aria-hidden
                        />
                        <TextMedium
                          weight="semibold"
                          className="min-w-0 truncate text-text-primary sm:whitespace-normal"
                        >
                          {data.performanceTable.benchmarkLabel}
                        </TextMedium>
                      </div>
                    </td>
                    {data.performanceTable.rows.map((r) => (
                      <td
                        key={r.period}
                        className="px-1 py-4 text-center sm:px-2"
                      >
                        <TextMedium
                          weight="semibold"
                          className="text-text-primary"
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

          {/* Allocation: chart + table */}
          <div className="flex flex-col gap-6">
            <H4 className="text-text-primary" weight="semibold">
              {cleanCopy(data.pieSectionTitle)}
            </H4>
            <div className="flex min-w-0 flex-col gap-6 lg:flex-row lg:gap-6">
              <div className="flex flex-col justify-center items-center min-w-0 flex-1 lg:w-1/2">
                <SubfundDonutChart
                  holdings={data.topHoldings}
                  ariaLabel={`${data.pieSectionTitle} by percentage`}
                />
              </div>
              <div className="min-w-0 flex-1 lg:w-1/2">
                <div className={fundTableCardClass}>
                  <table
                    className={fundTableFixedClass}
                    role="table"
                    aria-label={`${data.pieSectionTitle} by percentage`}
                  >
                    <colgroup>
                      <col className="min-w-0 w-[74%]" />
                      <col className="w-[26%]" />
                    </colgroup>
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="min-w-0 bg-surface-stroke px-3 py-4 text-left sm:px-4"
                        >
                          <TextSmall
                            weight="semibold"
                            className="text-text-tertiary"
                          >
                            {cleanCopy(data.pieNameColumnLabel)}
                          </TextSmall>
                        </th>
                        <th
                          scope="col"
                          className="bg-surface-stroke px-2 py-4 text-center sm:px-3"
                        >
                          <TextSmall
                            weight="semibold"
                            className="text-text-tertiary"
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
                          <td className="min-w-0 px-3 py-5 sm:px-4">
                            <div className="flex min-w-0 items-start gap-2 sm:items-center sm:gap-3">
                              <span
                                className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded sm:mt-0"
                                style={{ backgroundColor: row.color }}
                                aria-hidden
                              />
                              <TextMedium
                                weight="semibold"
                                className="min-w-0 break-words leading-snug text-text-primary"
                              >
                                {row.name}
                              </TextMedium>
                            </div>
                          </td>
                          <td className="px-2 py-5 text-center sm:px-3">
                            <TextMedium
                              weight="semibold"
                              className="text-text-primary"
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
        </div>
      </Container>
    </motion.section>
  );
}
