"use client";

import { motion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { HighchartsPerformanceChart } from "@/components/ui/HighchartsPerformanceChart";
import { H2, TextMedium, TextSmall } from "@/components/ui/Typography";
import type { MiietfPerformanceFundData } from "@/lib/miietf-fund-api";
import { sectionFadeInUp, sectionViewport } from "@/lib/sectionMotion";

const CHART_COLORS = {
  miietf: "var(--color-info-200)",
  benchmark: "var(--color-teal-200)",
  kmi30: "var(--color-error-200)",
} as const;

/** NAV adjusted price (base 10 at Mar 2024 inception). Fallback when API is unavailable. */
const performanceChartData = [
  { date: "Mar 10, 2024", miietf: 10, benchmark: 10, kmi30: 10 },
  { date: "Jun 30, 2024", miietf: 10.64, benchmark: 10.63, kmi30: 10.41 },
  { date: "Sep 30, 2024", miietf: 10.71, benchmark: 11.49, kmi30: 11.22 },
  { date: "Dec 31, 2024", miietf: 15.16, benchmark: 16.36, kmi30: 16.05 },
  { date: "Mar 31, 2025", miietf: 14.53, benchmark: 15.53, kmi30: 15.24 },
  { date: "Jun 30, 2025", miietf: 15.31, benchmark: 16.56, kmi30: 16.26 },
  { date: "Sep 30, 2025", miietf: 17.55, benchmark: 22.5, kmi30: 22.12 },
  { date: "Dec 31, 2025", miietf: 17.66, benchmark: 22.72, kmi30: 22.32 },
  { date: "Mar 12, 2026", miietf: 19.15, benchmark: 20.1, kmi30: 19.93 },
];

const PERFORMANCE_TABLE_ROWS = [
  {
    label: "MIIETF",
    color: CHART_COLORS.miietf,
    mtd: "-6.34%",
    ytd: "16.77%",
    d30: "-14.11%",
    d90: "-10.35%",
    y1: "23.95%",
    sinceInception: "91.47%",
  },
  {
    label: "Benchmark",
    color: CHART_COLORS.benchmark,
    mtd: "-6.45%",
    ytd: "17.95%",
    d30: "-14.11%",
    d90: "-10.03%",
    y1: "27.23%",
    sinceInception: "101.02%",
  },
  {
    label: "KMI30",
    color: CHART_COLORS.kmi30,
    mtd: "-5.69%",
    ytd: "20.03%",
    d30: "-13.96%",
    d90: "-9.13%",
    y1: "28.28%",
    sinceInception: "99.34%",
  },
];

export function MIIETFPerformanceSection({ fundData }: { fundData?: MiietfPerformanceFundData | null }) {
  const categories = fundData?.chartCategories ?? performanceChartData.map((d) => d.date);
  const series = fundData?.chartSeries ?? [
    {
      name: "MIIETF",
      data: performanceChartData.map((d) => d.miietf),
      color: CHART_COLORS.miietf,
    },
    {
      name: "Benchmark",
      data: performanceChartData.map((d) => d.benchmark),
      color: CHART_COLORS.benchmark,
    },
    {
      name: "KMI30",
      data: performanceChartData.map((d) => d.kmi30),
      color: CHART_COLORS.kmi30,
    },
  ];
  const tableRows = fundData?.tableRows ?? [...PERFORMANCE_TABLE_ROWS];
  const chartSubtitle = fundData
    ? "NAV adjusted price. March 2024 to present."
    : "NAV adjusted price. March 2024 to March 2026.";
  const ariaLabel =
    "Performance chart: MIIETF, Benchmark, and KMI30 NAV adjusted price from March 2024 to present.";
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeInUp}
      className="relative overflow-hidden bg-surface-bg py-8 sm:py-12 lg:py-16"
      aria-labelledby="performance-section-heading"
    >
      <Container className="flex flex-col gap-4 px-4 sm:px-6 md:px-8 lg:gap-4 lg:px-12 xl:px-16">
        <H2
          id="performance-section-heading"
          weight="bold"
          className="text-text-primary text-2xl sm:text-3xl lg:text-h2"
        >
          Performance
        </H2>

        <div className="flex flex-col gap-4 lg:gap-4">
          {/* Chart card */}
          <div className="rounded-2xl border border-surface-stroke bg-surface-card p-4 sm:p-6">
            <div
              className="h-64 w-full min-w-0 sm:h-72 lg:h-96"
              role="img"
              aria-label={ariaLabel}
            >
              <HighchartsPerformanceChart
                title="Performance"
                subtitle={chartSubtitle}
                categories={categories}
                series={series}
                ariaLabel={ariaLabel}
                chartType="line"
                yAxisTitle="NAV adjusted price"
                valueSuffix=""
                xAxisLabelFormat="monthYear"
              />
            </div>
          </div>

          {/* Table card */}
          <div className="overflow-x-auto rounded-2xl border border-surface-stroke bg-surface-card">
            <table className="w-full min-w-[600px] border-collapse" role="table" aria-label="Performance metrics by period">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="bg-surface-stroke px-4 py-4 text-left sm:px-6"
                  >
                    <TextSmall
                      weight="semibold"
                      className="text-text-tertiary text-sm"
                    >
                      Sectors
                    </TextSmall>
                  </th>
                  <th
                    scope="col"
                    className="bg-surface-stroke px-4 py-4 text-center sm:px-6"
                  >
                    <TextSmall
                      weight="semibold"
                      className="text-text-tertiary text-sm"
                    >
                      MTD
                    </TextSmall>
                  </th>
                  <th
                    scope="col"
                    className="bg-surface-stroke px-4 py-4 text-center sm:px-6"
                  >
                    <TextSmall
                      weight="semibold"
                      className="text-text-tertiary text-sm"
                    >
                      YTD
                    </TextSmall>
                  </th>
                  <th
                    scope="col"
                    className="bg-surface-stroke px-4 py-4 text-center sm:px-6"
                  >
                    <TextSmall
                      weight="semibold"
                      className="text-text-tertiary text-sm"
                    >
                      30D
                    </TextSmall>
                  </th>
                  <th
                    scope="col"
                    className="bg-surface-stroke px-4 py-4 text-center sm:px-6"
                  >
                    <TextSmall
                      weight="semibold"
                      className="text-text-tertiary text-sm"
                    >
                      90D
                    </TextSmall>
                  </th>
                  <th
                    scope="col"
                    className="bg-surface-stroke px-4 py-4 text-center sm:px-6"
                  >
                    <TextSmall
                      weight="semibold"
                      className="text-text-tertiary text-sm"
                    >
                      1Y
                    </TextSmall>
                  </th>
                  <th
                    scope="col"
                    className="bg-surface-stroke px-4 py-4 text-center sm:px-6"
                  >
                    <TextSmall
                      weight="semibold"
                      className="text-text-tertiary text-sm"
                    >
                      Since inception
                    </TextSmall>
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row) => (
                  <tr
                    key={row.label}
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
                          {row.label}
                        </TextMedium>
                      </div>
                    </td>
                    <td className="px-4 py-5 text-center sm:px-6">
                      <TextMedium
                        weight="semibold"
                        className="text-text-primary text-base"
                      >
                        {row.mtd}
                      </TextMedium>
                    </td>
                    <td className="px-4 py-5 text-center sm:px-6">
                      <TextMedium
                        weight="semibold"
                        className="text-text-primary text-base"
                      >
                        {row.ytd}
                      </TextMedium>
                    </td>
                    <td className="px-4 py-5 text-center sm:px-6">
                      <TextMedium
                        weight="semibold"
                        className="text-text-primary text-base"
                      >
                        {row.d30}
                      </TextMedium>
                    </td>
                    <td className="px-4 py-5 text-center sm:px-6">
                      <TextMedium
                        weight="semibold"
                        className="text-text-primary text-base"
                      >
                        {row.d90}
                      </TextMedium>
                    </td>
                    <td className="px-4 py-5 text-center sm:px-6">
                      <TextMedium
                        weight="semibold"
                        className="text-text-primary text-base"
                      >
                        {row.y1}
                      </TextMedium>
                    </td>
                    <td className="px-4 py-5 text-center sm:px-6">
                      <TextMedium
                        weight="semibold"
                        className="text-text-primary text-base"
                      >
                        {row.sinceInception}
                      </TextMedium>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </motion.section>
  );
}
