"use client";

import dynamic from "next/dynamic";
import type { InvestmentLineSeries } from "./HighchartsInvestmentLineChartInner";

export type { InvestmentLineSeries };

export interface HighchartsInvestmentLineChartProps {
  categories: string[];
  series: InvestmentLineSeries[];
  ariaLabel: string;
}

const HighchartsInvestmentLineChartInner = dynamic(
  () =>
    import("./HighchartsInvestmentLineChartInner").then((m) => ({
      default: m.HighchartsInvestmentLineChartInner,
    })),
  {
    ssr: false,
    loading: () => (
      <div
        className="h-full w-full rounded-xl border border-surface-stroke"
        role="img"
        aria-busy="true"
      />
    ),
  }
);

export function HighchartsInvestmentLineChart(
  props: HighchartsInvestmentLineChartProps
) {
  return <HighchartsInvestmentLineChartInner {...props} />;
}
