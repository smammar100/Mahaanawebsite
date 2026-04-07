"use client";

import { motion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { HighchartsPerformanceChart } from "@/components/ui/HighchartsPerformanceChart";
import { H3, TextMedium, TextSmall } from "@/components/ui/Typography";
import type { MicfPerformanceFundData } from "@/lib/micf-fund-api";
import { fundTableCardClass, fundTableFixedClass } from "@/components/ui/fundTableClasses";
import { sectionFadeInUp, sectionViewport } from "@/lib/sectionMotion";

const CHART_COLORS = {
  micf: "var(--color-info-200)",
  benchmark: "var(--color-teal-200)",
} as const;

/** NAV adjusted price (base 100 at Mar 2023 inception). Sampled quarterly for fallback when API is unavailable. */
const performanceChartData = [
  { date: "Mar 2023", micf: 100, benchmark: 100 },
  { date: "Jun 2023", micf: 105.03, benchmark: 101.72 },
  { date: "Sep 2023", micf: 110.69, benchmark: 103.89 },
  { date: "Dec 2023", micf: 117.21, benchmark: 106.62 },
  { date: "Mar 2024", micf: 123.31, benchmark: 109.62 },
  { date: "Jun 2024", micf: 129.63, benchmark: 112.73 },
  { date: "Sep 2024", micf: 135.68, benchmark: 115.8 },
  { date: "Dec 2024", micf: 140.5, benchmark: 118.31 },
  { date: "Mar 2025", micf: 143.9, benchmark: 121.24 },
  { date: "Jun 2025", micf: 147.61, benchmark: 124.39 },
  { date: "Sep 2025", micf: 151.29, benchmark: 127.44 },
  { date: "Dec 2025", micf: 155.08, benchmark: 130.54 },
  { date: "Mar 2026", micf: 157.88, benchmark: 132.85 },
];

const PERFORMANCE_TABLE_ROWS = [
  {
    label: "MICF",
    color: CHART_COLORS.micf,
    mtd: "8.12%",
    ytd: "9.96%",
    d30: "9.01%",
    d90: "9.44%",
    y1: "10.30%",
    sinceInception: "19.58%",
  },
  {
    label: "Benchmark",
    color: CHART_COLORS.benchmark,
    mtd: "6.72%",
    ytd: "9.74%",
    d30: "8.42%",
    d90: "9.24%",
    y1: "10.10%",
    sinceInception: "11.11%",
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
      ? `NAV adjusted price. ${categories[0]} to ${categories[categories.length - 1]}.`
      : "NAV adjusted price.";

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
        <H3
          id="micf-performance-section-heading"
          weight="bold"
          className="text-text-primary"
        >
          Performance
        </H3>

        <div className="flex flex-col gap-4 lg:gap-4">
          {/* Chart card */}
          <div className="h-fit rounded-2xl border border-surface-stroke bg-surface-card p-4 sm:p-6">
            <div
              className="h-fit w-full min-w-0 overflow-visible"
              role="img"
              aria-label="Performance chart: MICF and Benchmark NAV adjusted price"
            >
              <HighchartsPerformanceChart
                title="Performance"
                subtitle={chartSubtitle}
                categories={categories}
                series={series}
                ariaLabel="Performance chart: MICF and Benchmark NAV adjusted price"
                chartType="line"
                valueSuffix=""
                yAxisTitle="NAV adjusted price"
                xAxisLabelFormat="monthYear"
              />
            </div>
          </div>

          {/* Table card */}
          <div className={fundTableCardClass}>
            <table className={fundTableFixedClass} role="table" aria-label="Performance metrics by period">
              <colgroup>
                <col style={{ width: "14%" }} />
                {Array.from({ length: 7 }, (_, i) => (
                  <col key={i} style={{ width: `${86 / 7}%` }} />
                ))}
              </colgroup>
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="min-w-0 bg-surface-stroke px-2 py-3 text-left sm:px-3 md:px-4"
                  >
                    <TextSmall
                      weight="semibold"
                      className="text-text-tertiary"
                    >
                      Sectors
                    </TextSmall>
                  </th>
                  <th
                    scope="col"
                    className="bg-surface-stroke px-1 py-3 text-center sm:px-2 md:px-3"
                  >
                    <TextSmall
                      weight="semibold"
                      className="text-text-tertiary"
                    >
                      MTD
                    </TextSmall>
                  </th>
                  <th
                    scope="col"
                    className="bg-surface-stroke px-1 py-3 text-center sm:px-2 md:px-3"
                  >
                    <TextSmall
                      weight="semibold"
                      className="text-text-tertiary"
                    >
                      YTD
                    </TextSmall>
                  </th>
                  <th
                    scope="col"
                    className="bg-surface-stroke px-1 py-3 text-center sm:px-2 md:px-3"
                  >
                    <TextSmall
                      weight="semibold"
                      className="text-text-tertiary"
                    >
                      30D
                    </TextSmall>
                  </th>
                  <th
                    scope="col"
                    className="bg-surface-stroke px-1 py-3 text-center sm:px-2 md:px-3"
                  >
                    <TextSmall
                      weight="semibold"
                      className="text-text-tertiary"
                    >
                      90D
                    </TextSmall>
                  </th>
                  <th
                    scope="col"
                    className="bg-surface-stroke px-1 py-3 text-center sm:px-2 md:px-3"
                  >
                    <TextSmall
                      weight="semibold"
                      className="text-text-tertiary"
                    >
                      1Y
                    </TextSmall>
                  </th>
                  <th
                    scope="col"
                    className="bg-surface-stroke px-1 py-3 text-center sm:px-2 md:px-3"
                  >
                    <TextSmall
                      weight="semibold"
                      className="whitespace-normal leading-tight text-text-tertiary"
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
                    <td className="min-w-0 px-2 py-4 sm:px-3 md:px-4">
                      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                        <span
                          className="h-3.5 w-3.5 shrink-0 rounded"
                          style={{ backgroundColor: row.color }}
                          aria-hidden
                        />
                        <TextMedium
                          weight="semibold"
                          className="min-w-0 truncate text-text-primary sm:whitespace-normal"
                        >
                          {row.label}
                        </TextMedium>
                      </div>
                    </td>
                    <td className="px-1 py-4 text-center sm:px-2 md:px-3">
                      <TextMedium
                        weight="semibold"
                        className="text-text-primary"
                      >
                        {row.mtd}
                      </TextMedium>
                    </td>
                    <td className="px-1 py-4 text-center sm:px-2 md:px-3">
                      <TextMedium
                        weight="semibold"
                        className="text-text-primary"
                      >
                        {row.ytd}
                      </TextMedium>
                    </td>
                    <td className="px-1 py-4 text-center sm:px-2 md:px-3">
                      <TextMedium
                        weight="semibold"
                        className="text-text-primary"
                      >
                        {row.d30}
                      </TextMedium>
                    </td>
                    <td className="px-1 py-4 text-center sm:px-2 md:px-3">
                      <TextMedium
                        weight="semibold"
                        className="text-text-primary"
                      >
                        {row.d90}
                      </TextMedium>
                    </td>
                    <td className="px-1 py-4 text-center sm:px-2 md:px-3">
                      <TextMedium
                        weight="semibold"
                        className="text-text-primary"
                      >
                        {row.y1}
                      </TextMedium>
                    </td>
                    <td className="px-1 py-4 text-center sm:px-2 md:px-3">
                      <TextMedium
                        weight="semibold"
                        className="text-text-primary"
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
