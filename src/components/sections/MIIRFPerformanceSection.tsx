"use client";

import { motion } from "motion/react";
import type { MiirfPerformanceFundData } from "@/lib/miirf-fund-api";
import { Container } from "@/components/layout/Container";
import { HighchartsPerformanceChart } from "@/components/ui/HighchartsPerformanceChart";
import { H3 } from "@/components/ui/Typography";
import { sectionFadeInUp, sectionViewport } from "@/lib/sectionMotion";
import { cleanCopy } from "@/lib/copy-utils";

const CHART_COLORS = {
  conservative: "var(--color-info-200)",
  lowRisk: "var(--color-teal-200)",
  balanced: "var(--color-error-200)",
  mediumRisk: "var(--color-warning-200)",
  aggressive: "var(--color-primary-200)",
} as const;

/** Value-based fallback (PKR 1,000 assumed), daily granularity; all series start at 1000. */
const performanceChartDataFallback = [
  { date: "Jun 2, 2025", conservative: 1000, lowRisk: 1000, balanced: 1000, mediumRisk: 1000, aggressive: 1000 },
  { date: "Jun 9, 2025", conservative: 995, lowRisk: 998, balanced: 1002, mediumRisk: 1005, aggressive: 1008 },
  { date: "Jun 16, 2025", conservative: 1002, lowRisk: 1005, balanced: 1008, mediumRisk: 1012, aggressive: 1018 },
  { date: "Jun 23, 2025", conservative: 1005, lowRisk: 1010, balanced: 1015, mediumRisk: 1022, aggressive: 1032 },
  { date: "Jul 1, 2025", conservative: 1008, lowRisk: 1015, balanced: 1022, mediumRisk: 1032, aggressive: 1045 },
  { date: "Jul 15, 2025", conservative: 1012, lowRisk: 1020, balanced: 1030, mediumRisk: 1045, aggressive: 1065 },
  { date: "Aug 1, 2025", conservative: 1015, lowRisk: 1025, balanced: 1038, mediumRisk: 1052, aggressive: 1072 },
  { date: "Aug 15, 2025", conservative: 1018, lowRisk: 1030, balanced: 1045, mediumRisk: 1065, aggressive: 1095 },
  { date: "Sep 1, 2025", conservative: 1022, lowRisk: 1035, balanced: 1052, mediumRisk: 1075, aggressive: 1105 },
  { date: "Sep 15, 2025", conservative: 1025, lowRisk: 1040, balanced: 1060, mediumRisk: 1088, aggressive: 1125 },
  { date: "Oct 1, 2025", conservative: 1030, lowRisk: 1045, balanced: 1068, mediumRisk: 1098, aggressive: 1145 },
  { date: "Oct 15, 2025", conservative: 1035, lowRisk: 1052, balanced: 1078, mediumRisk: 1110, aggressive: 1170 },
  { date: "Nov 1, 2025", conservative: 1040, lowRisk: 1058, balanced: 1085, mediumRisk: 1122, aggressive: 1195 },
  { date: "Nov 15, 2025", conservative: 1042, lowRisk: 1062, balanced: 1092, mediumRisk: 1135, aggressive: 1210 },
  { date: "Dec 1, 2025", conservative: 1045, lowRisk: 1068, balanced: 1100, mediumRisk: 1148, aggressive: 1225 },
  { date: "Dec 15, 2025", conservative: 1048, lowRisk: 1072, balanced: 1105, mediumRisk: 1155, aggressive: 1235 },
  { date: "Jan 1, 2026", conservative: 1050, lowRisk: 1075, balanced: 1110, mediumRisk: 1162, aggressive: 1240 },
  { date: "Jan 15, 2026", conservative: 1052, lowRisk: 1078, balanced: 1115, mediumRisk: 1165, aggressive: 1230 },
  { date: "Feb 1, 2026", conservative: 1053, lowRisk: 1080, balanced: 1118, mediumRisk: 1158, aggressive: 1215 },
  { date: "Feb 15, 2026", conservative: 1054, lowRisk: 1082, balanced: 1120, mediumRisk: 1152, aggressive: 1195 },
  { date: "Mar 1, 2026", conservative: 1055, lowRisk: 1078, balanced: 1112, mediumRisk: 1148, aggressive: 1175 },
  { date: "Mar 9, 2026", conservative: 1055, lowRisk: 1075, balanced: 1110, mediumRisk: 1145, aggressive: 1155 },
];

export function MIIRFPerformanceSection({ fundData }: { fundData?: MiirfPerformanceFundData | null }) {
  const categories = fundData?.chartCategories ?? performanceChartDataFallback.map((d) => d.date);
  const series = fundData?.chartSeries ?? [
    { name: cleanCopy("Conservative"), data: performanceChartDataFallback.map((d) => d.conservative), color: CHART_COLORS.conservative },
    { name: cleanCopy("Low Risk"), data: performanceChartDataFallback.map((d) => d.lowRisk), color: CHART_COLORS.lowRisk },
    { name: cleanCopy("Balanced"), data: performanceChartDataFallback.map((d) => d.balanced), color: CHART_COLORS.balanced },
    { name: cleanCopy("Medium Risk"), data: performanceChartDataFallback.map((d) => d.mediumRisk), color: CHART_COLORS.mediumRisk },
    { name: cleanCopy("Aggressive"), data: performanceChartDataFallback.map((d) => d.aggressive), color: CHART_COLORS.aggressive },
  ];

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeInUp}
      className="relative overflow-hidden bg-surface-bg section-y"
      aria-labelledby="miirf-performance-section-heading"
    >
      <Container className="flex flex-col gap-10 px-4 sm:px-6 md:px-8 lg:gap-10 lg:px-12 xl:px-16">
        <H3
          id="miirf-performance-section-heading"
          weight="bold"
          className="text-text-primary"
        >
          {cleanCopy("Performance")}
        </H3>

        <div className="relative rounded-2xl border border-surface-stroke bg-surface-card p-4 sm:p-6">
          <p className="absolute top-4 right-4 z-10 text-xs text-text-tertiary sm:top-6 sm:right-6">
            {cleanCopy("*assuming you have invested PKR 1,000")}
          </p>
          <div
            className="h-64 w-full min-w-0 sm:h-72 lg:h-96"
            role="img"
            aria-label="Performance chart: Risk profile returns assuming PKR 1,000 invested. Conservative, Low Risk, Balanced, Medium Risk, Aggressive."
          >
            <HighchartsPerformanceChart
              title={cleanCopy("Performance")}
              subtitle={cleanCopy("Risk profile returns")}
              categories={categories}
              series={series}
              ariaLabel={cleanCopy("Performance chart: Risk profile returns assuming PKR 1,000 invested. Conservative, Low Risk, Balanced, Medium Risk, Aggressive.")}
              chartType="line"
              valueSuffix=""
              yAxisTitle={cleanCopy("Value (PKR)")}
              xAxisLabelFormat="firstLastOnly"
            />
          </div>
        </div>
      </Container>
    </motion.section>
  );
}
