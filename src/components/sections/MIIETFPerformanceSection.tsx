"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import { motion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { H2, TextMedium, TextSmall } from "@/components/ui/Typography";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { sectionFadeInUp, sectionViewport } from "@/lib/sectionMotion";

const CHART_COLORS = {
  miietf: "var(--color-info-200)",
  benchmark: "var(--color-teal-200)",
  km130: "var(--color-error-200)",
} as const;

const chartConfig = {
  miietf: { label: "MIIETF", color: CHART_COLORS.miietf },
  benchmark: { label: "Benchmark", color: CHART_COLORS.benchmark },
  km130: { label: "KM130", color: CHART_COLORS.km130 },
} satisfies ChartConfig;

const performanceChartData = [
  { date: "Apr 2023", miietf: 0, benchmark: 0, km130: 0 },
  { date: "Jul 2023", miietf: 2.1, benchmark: 2.0, km130: 1.2 },
  { date: "Jan 2024", miietf: 5.2, benchmark: 5.1, km130: 3.4 },
  { date: "Jul 2024", miietf: 8.8, benchmark: 8.7, km130: 5.9 },
  { date: "Oct 2024", miietf: 10.2, benchmark: 10.1, km130: 6.8 },
  { date: "Jan 2025", miietf: 12.5, benchmark: 12.4, km130: 8.2 },
  { date: "Apr 2025", miietf: 14.1, benchmark: 14.0, km130: 9.1 },
  { date: "Jul 2025", miietf: 16.2, benchmark: 16.1, km130: 10.0 },
  { date: "Oct 2025", miietf: 18.0, benchmark: 17.9, km130: 10.7 },
  { date: "Jan 2026", miietf: 19.68, benchmark: 19.68, km130: 11.3 },
];

const PERFORMANCE_TABLE_ROWS = [
  {
    label: "MIIETF",
    color: CHART_COLORS.miietf,
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
    ytd: "10.03%",
    d30: "9.13%",
    d90: "9.74%",
    y1: "10.31%",
    sinceInception: "19.68%",
  },
  {
    label: "KM130",
    color: CHART_COLORS.km130,
    mtd: "9.54%",
    ytd: "9.86%",
    d30: "9.55%",
    d90: "9.63%",
    y1: "10.23%",
    sinceInception: "11.3%",
  },
] as const;

export function MIIETFPerformanceSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeInUp}
      className="relative overflow-hidden bg-surface-bg py-8 sm:py-12 lg:py-16"
      aria-labelledby="performance-section-heading"
    >
      <Container className="flex flex-col gap-10 px-4 sm:px-6 md:px-8 lg:gap-10 lg:px-12 xl:px-16">
        <H2
          id="performance-section-heading"
          weight="bold"
          className="text-text-primary text-2xl sm:text-3xl lg:text-h2"
        >
          Performance
        </H2>

        <div className="flex flex-col gap-10 lg:gap-10">
          {/* Chart card */}
          <div className="rounded-2xl border border-surface-stroke bg-white p-4 sm:p-6">
            <div
              className="h-56 w-full min-w-0 sm:h-64 lg:h-80"
              role="img"
              aria-label="Performance chart: MIIETF, Benchmark, and KM130 cumulative returns from April 2023 to January 2026"
            >
              <ChartContainer config={chartConfig} className="h-full">
                <AreaChart
                  accessibilityLayer
                  data={performanceChartData}
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
                    domain={[0, 50]}
                    tick={{ fontSize: 12, fill: "var(--color-text-secondary)" }}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(value) => `${Number(value).toFixed(2)}%`}
                      />
                    }
                    cursor={false}
                  />
                  <Area
                    type="natural"
                    dataKey="miietf"
                    fill={CHART_COLORS.miietf}
                    fillOpacity={0.4}
                    stroke={CHART_COLORS.miietf}
                    strokeWidth={2}
                  />
                  <Area
                    type="natural"
                    dataKey="benchmark"
                    fill={CHART_COLORS.benchmark}
                    fillOpacity={0.4}
                    stroke={CHART_COLORS.benchmark}
                    strokeWidth={2}
                  />
                  <Area
                    type="natural"
                    dataKey="km130"
                    fill={CHART_COLORS.km130}
                    fillOpacity={0.4}
                    stroke={CHART_COLORS.km130}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ChartContainer>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 pl-0 sm:pl-9 lg:pl-12">
              {(["miietf", "benchmark", "km130"] as const).map((key) => (
                <div
                  key={key}
                  className="flex items-center gap-2"
                >
                  <span
                    className="h-3.5 w-3.5 shrink-0 rounded"
                    style={{ backgroundColor: CHART_COLORS[key] }}
                    aria-hidden
                  />
                  <TextMedium
                    weight="semibold"
                    className="text-text-primary text-sm"
                  >
                    {chartConfig[key].label}
                  </TextMedium>
                </div>
              ))}
            </div>
          </div>

          {/* Table card */}
          <div className="overflow-x-auto rounded-2xl border border-surface-stroke bg-white">
            <table className="w-full min-w-[600px] border-collapse" role="table" aria-label="Performance metrics by period">
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
                      Sectors
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
                      MTD
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
                      YTD
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
                      30D
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
                      90D
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
                      1Y
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
                      Since inception
                    </TextSmall>
                  </th>
                </tr>
              </thead>
              <tbody>
                {PERFORMANCE_TABLE_ROWS.map((row) => (
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
