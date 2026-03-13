"use client";

import { motion } from "motion/react";
import type { MiirfPerformanceFundData } from "@/lib/miirf-fund-api";
import { Container } from "@/components/layout/Container";
import { HighchartsPerformanceChart } from "@/components/ui/HighchartsPerformanceChart";
import { H2 } from "@/components/ui/Typography";
import { sectionFadeInUp, sectionViewport } from "@/lib/sectionMotion";

const CHART_COLORS = {
  conservative: "var(--color-info-200)",
  lowRisk: "var(--color-teal-200)",
  balanced: "var(--color-error-200)",
  mediumRisk: "var(--color-warning-200)",
  aggressive: "var(--color-primary-200)",
} as const;

const performanceChartDataFallback = [
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

export function MIIRFPerformanceSection({ fundData }: { fundData?: MiirfPerformanceFundData | null }) {
  const categories = fundData?.chartCategories ?? performanceChartDataFallback.map((d) => d.date);
  const series = fundData?.chartSeries ?? [
    { name: "Conservative", data: performanceChartDataFallback.map((d) => d.conservative), color: CHART_COLORS.conservative },
    { name: "Low Risk", data: performanceChartDataFallback.map((d) => d.lowRisk), color: CHART_COLORS.lowRisk },
    { name: "Balanced", data: performanceChartDataFallback.map((d) => d.balanced), color: CHART_COLORS.balanced },
    { name: "Medium Risk", data: performanceChartDataFallback.map((d) => d.mediumRisk), color: CHART_COLORS.mediumRisk },
    { name: "Aggressive", data: performanceChartDataFallback.map((d) => d.aggressive), color: CHART_COLORS.aggressive },
  ];
  const dateRange =
    categories.length >= 2 ? `${categories[0]} to ${categories[categories.length - 1]}` : "April 2023 to January 2026";

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeInUp}
      className="relative overflow-hidden bg-surface-bg py-8 sm:py-12 lg:py-16 pb-10"
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

        <div className="rounded-2xl border border-surface-stroke bg-surface-card p-4 sm:p-6">
          <div
            className="h-64 w-full min-w-0 sm:h-72 lg:h-96"
            role="img"
            aria-label="Performance chart: Conservative, Low Risk, Balanced, Medium Risk, and Aggressive cumulative returns"
          >
            <HighchartsPerformanceChart
              title="Performance"
              subtitle={`Cumulative returns by risk profile. ${dateRange}.`}
              categories={categories}
              series={series}
              ariaLabel="Performance chart: Conservative, Low Risk, Balanced, Medium Risk, and Aggressive cumulative returns"
              chartType="line"
              valueSuffix="%"
            />
          </div>
        </div>
      </Container>
    </motion.section>
  );
}
