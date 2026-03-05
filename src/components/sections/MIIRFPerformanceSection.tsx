"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
import { motion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { H2, TextMedium } from "@/components/ui/Typography";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { sectionFadeInUp, sectionViewport } from "@/lib/sectionMotion";

const CHART_COLORS = {
  conservative: "var(--color-info-200)",
  lowRisk: "var(--color-teal-200)",
  balanced: "var(--color-error-200)",
  mediumRisk: "var(--color-warning-200)",
  aggressive: "var(--color-primary-200)",
} as const;

const chartConfig = {
  conservative: { label: "Conservative", color: CHART_COLORS.conservative },
  lowRisk: { label: "Low Risk", color: CHART_COLORS.lowRisk },
  balanced: { label: "Balanced", color: CHART_COLORS.balanced },
  mediumRisk: { label: "Medium Risk", color: CHART_COLORS.mediumRisk },
  aggressive: { label: "Aggressive", color: CHART_COLORS.aggressive },
} satisfies ChartConfig;

const RISK_PROFILE_KEYS = ["conservative", "lowRisk", "balanced", "mediumRisk", "aggressive"] as const;

const performanceChartData = [
  { date: "Apr 2023", conservative: 0, lowRisk: 0, balanced: 0, mediumRisk: 0, aggressive: 0 },
  { date: "Jul 2023", conservative: 1.5, lowRisk: 2, balanced: 2.5, mediumRisk: 3, aggressive: 3.5 },
  { date: "Jan 2024", conservative: 3.5, lowRisk: 4.5, balanced: 5, mediumRisk: 6, aggressive: 7 },
  { date: "Jul 2024", conservative: 6, lowRisk: 7.5, balanced: 8, mediumRisk: 9, aggressive: 10.5 },
  { date: "Oct 2024", conservative: 7.5, lowRisk: 9, balanced: 10, mediumRisk: 11.5, aggressive: 13 },
  { date: "Jan 2025", conservative: 9, lowRisk: 11, balanced: 12, mediumRisk: 14, aggressive: 16 },
  { date: "Apr 2025", conservative: 10.5, lowRisk: 12.5, balanced: 14, mediumRisk: 16, aggressive: 18.5 },
  { date: "Jul 2025", conservative: 12, lowRisk: 14, balanced: 16, mediumRisk: 18, aggressive: 21 },
  { date: "Oct 2025", conservative: 13.5, lowRisk: 15.5, balanced: 18, mediumRisk: 19.5, aggressive: 23 },
  { date: "Jan 2026", conservative: 15, lowRisk: 17, balanced: 19, mediumRisk: 21, aggressive: 25 },
];

export function MIIRFPerformanceSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeInUp}
      className="relative overflow-hidden bg-surface-bg py-12 sm:py-16 lg:py-16 pb-10"
      aria-labelledby="miirf-performance-section-heading"
    >
      <Container className="flex flex-col gap-10 px-4 sm:px-6 md:px-8 lg:gap-10 lg:px-12 xl:px-16">
        <H2
          id="miirf-performance-section-heading"
          weight="bold"
          className="text-text-primary text-2xl sm:text-3xl lg:text-h2"
        >
          Performance
        </H2>

        <div className="rounded-2xl border border-surface-stroke bg-white p-4 sm:p-6">
          <div
            className="h-56 w-full min-w-0 sm:h-64 lg:h-80"
            role="img"
            aria-label="Performance chart: Conservative, Low Risk, Balanced, Medium Risk, and Aggressive cumulative returns from April 2023 to January 2026"
          >
            <ChartContainer config={chartConfig} className="h-full">
              <LineChart
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
                <Line
                  type="natural"
                  dataKey="conservative"
                  stroke={CHART_COLORS.conservative}
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="natural"
                  dataKey="lowRisk"
                  stroke={CHART_COLORS.lowRisk}
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="natural"
                  dataKey="balanced"
                  stroke={CHART_COLORS.balanced}
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="natural"
                  dataKey="mediumRisk"
                  stroke={CHART_COLORS.mediumRisk}
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="natural"
                  dataKey="aggressive"
                  stroke={CHART_COLORS.aggressive}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 pl-0 sm:pl-9 lg:pl-12">
            {RISK_PROFILE_KEYS.map((key) => (
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
      </Container>
    </motion.section>
  );
}
