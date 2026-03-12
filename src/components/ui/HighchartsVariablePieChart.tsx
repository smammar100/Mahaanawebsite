"use client";

import dynamic from "next/dynamic";
import type { VariablePieDatum } from "./HighchartsVariablePieChartInner";

export type { VariablePieDatum };

export interface HighchartsVariablePieChartProps {
  data: VariablePieDatum[];
  ariaLabel: string;
  onSegmentHover?: (index: number | null) => void;
}

const HighchartsVariablePieChartInner = dynamic(
  () =>
    import("./HighchartsVariablePieChartInner").then((m) => ({
      default: m.HighchartsVariablePieChartInner,
    })),
  {
    ssr: false,
    loading: () => (
      <div
        className="variable-pie-chart-wrapper flex aspect-square h-full min-h-[280px] w-full items-center justify-center overflow-visible"
        style={{ width: "100%", height: "100%", minHeight: 280 }}
        role="img"
        aria-busy="true"
      />
    ),
  }
);

export function HighchartsVariablePieChart(props: HighchartsVariablePieChartProps) {
  return <HighchartsVariablePieChartInner {...props} />;
}
