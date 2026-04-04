"use client";

import dynamic from "next/dynamic";
import type { DonutDatum } from "./HighchartsDonutChartInner";

export type { DonutDatum };

export interface HighchartsDonutChartProps {
  data: DonutDatum[];
  ariaLabel: string;
}

const HighchartsDonutChartInner = dynamic(
  () =>
    import("./HighchartsDonutChartInner").then((m) => ({
      default: m.HighchartsDonutChartInner,
    })),
  {
    ssr: false,
    loading: () => (
      <div
        className="flex h-full w-full items-center justify-center rounded-full border-4 border-surface-stroke"
        role="img"
        aria-busy="true"
      />
    ),
  }
);

export function HighchartsDonutChart(props: HighchartsDonutChartProps) {
  return <HighchartsDonutChartInner {...props} />;
}
