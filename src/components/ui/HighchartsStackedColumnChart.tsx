"use client";

import dynamic from "next/dynamic";
import type { StackedColumnSeries } from "./HighchartsStackedColumnChartInner";

export type { StackedColumnSeries };

export interface HighchartsStackedColumnChartProps {
  categories: string[];
  series: StackedColumnSeries[];
  ariaLabel: string;
}

const HighchartsStackedColumnChartInner = dynamic(
  () =>
    import("./HighchartsStackedColumnChartInner").then((m) => ({
      default: m.HighchartsStackedColumnChartInner,
    })),
  {
    ssr: false,
    loading: () => (
      <div
        className="min-h-[260px] w-full rounded-xl border border-surface-stroke bg-surface-card/50 sm:min-h-[300px]"
        role="img"
        aria-busy="true"
      />
    ),
  }
);

export function HighchartsStackedColumnChart(
  props: HighchartsStackedColumnChartProps
) {
  return <HighchartsStackedColumnChartInner {...props} />;
}
