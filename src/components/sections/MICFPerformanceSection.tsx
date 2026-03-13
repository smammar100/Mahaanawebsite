"use client";

import { motion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { HighchartsPerformanceChart } from "@/components/ui/HighchartsPerformanceChart";
import { H2, TextMedium, TextSmall } from "@/components/ui/Typography";
import type { MicfPerformanceFundData } from "@/lib/micf-fund-api";
import { sectionFadeInUp, sectionViewport } from "@/lib/sectionMotion";

const CHART_COLORS = {
  micf: "var(--color-info-200)",
  benchmark: "var(--color-teal-200)",
} as const;

const performanceChartData = [
  { date: "Apr 2023", micf: 0, benchmark: 0 },
  { date: "Jul 2023", micf: 2.1, benchmark: 2.0 },
  { date: "Jan 2024", micf: 5.2, benchmark: 5.1 },
  { date: "Jul 2024", micf: 8.8, benchmark: 8.7 },
  { date: "Oct 2024", micf: 10.2, benchmark: 10.1 },
  { date: "Jan 2025", micf: 12.5, benchmark: 12.4 },
  { date: "Apr 2025", micf: 14.1, benchmark: 14.0 },
  { date: "Jul 2025", micf: 16.2, benchmark: 16.1 },
  { date: "Oct 2025", micf: 18.0, benchmark: 17.9 },
  { date: "Jan 2026", micf: 19.68, benchmark: 19.68 },
];

const PERFORMANCE_TABLE_ROWS = [
  {
    label: "MICF",
    color: CHART_COLORS.micf,
    mtd: "9.58%",
    ytd: "10.03%",
    d30: "9.13%",
    d90: "9.74%",
    y1: "10.31%",
    sinceInception: "19.68%",
  },
  {
    label: "Benchmark",
    color: CHART_COLORS.benchmark,
    mtd: "9.54%",
    ytd: "9.86%",
    d30: "9.55%",
    d90: "9.63%",
    y1: "10.23%",
    sinceInception: "11.3%",
  },
] as const;

export function MICFPerformanceSection({
  fundData,
}: {
  fundData?: MicfPerformanceFundData | null;
}) {
  const categories = fundData?.chartCategories ?? performanceChartData.map((d) => d.date);
  const series = fundData?.chartSeries ?? [
    {
      name: "MICF",
      data: performanceChartData.map((d) => d.micf),
      color: CHART_COLORS.micf,
    },
    {
      name: "Benchmark",
      data: performanceChartData.map((d) => d.benchmark),
      color: CHART_COLORS.benchmark,
    },
  ];
  const tableRows = fundData?.tableRows ?? [...PERFORMANCE_TABLE_ROWS];
  const chartSubtitle =
    categories.length >= 2
      ? `Cumulative returns. ${categories[0]} to ${categories[categories.length - 1]}.`
      : "Cumulative returns.";

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeInUp}
      className="relative overflow-hidden bg-surface-bg py-8 sm:py-12 lg:py-16"
      aria-labelledby="micf-performance-section-heading"
    >
      <Container className="flex flex-col gap-4 px-4 sm:px-6 md:px-8 lg:gap-4 lg:px-12 xl:px-16">
        <H2
          id="micf-performance-section-heading"
          weight="bold"
          className="text-text-primary text-2xl sm:text-3xl lg:text-h2"
        >
          Performance
        </H2>

        <div className="flex flex-col gap-4 lg:gap-4">
          {/* Chart card */}
          <div className="h-fit rounded-2xl border border-surface-stroke bg-surface-card p-4 sm:p-6">
            <div
              className="h-[375px] w-full min-w-0"
              role="img"
              aria-label="Performance chart: MICF and Benchmark cumulative returns"
            >
              <HighchartsPerformanceChart
                title="Performance"
                subtitle={chartSubtitle}
                categories={categories}
                series={series}
                ariaLabel="Performance chart: MICF and Benchmark cumulative returns"
                chartType="line"
                valueSuffix="%"
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
