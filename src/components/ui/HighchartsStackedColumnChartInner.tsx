"use client";

import { useMemo } from "react";
import Highcharts from "highcharts";
import type { Options } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { formatPkrAbbreviated } from "@/lib/formatters";

export interface StackedColumnSeries {
  name: string;
  data: number[];
  color: string;
}

export interface HighchartsStackedColumnChartInnerProps {
  categories: string[];
  series: StackedColumnSeries[];
  ariaLabel: string;
}

export function HighchartsStackedColumnChartInner({
  categories,
  series,
  ariaLabel,
}: HighchartsStackedColumnChartInnerProps) {
  const options: Options = useMemo(
    () => ({
      chart: {
        type: "column",
        backgroundColor: "transparent",
        spacing: [12, 10, 18, 10],
        style: { fontFamily: "inherit" },
      },
      title: { text: undefined },
      credits: { enabled: false },
      accessibility: {
        enabled: true,
        description: ariaLabel,
      },
      legend: {
        align: "center",
        verticalAlign: "top",
        itemStyle: {
          color: "var(--color-text-secondary)",
          fontSize: "12px",
          fontWeight: "500",
        },
        symbolRadius: 6,
      },
      xAxis: {
        categories,
        lineColor: "var(--color-surface-stroke)",
        tickColor: "var(--color-surface-stroke)",
        labels: {
          style: {
            color: "var(--color-text-secondary)",
            fontSize: "11px",
          },
        },
      },
      yAxis: {
        min: 0,
        title: { text: undefined },
        gridLineColor: "var(--color-surface-stroke)",
        labels: {
          style: {
            color: "var(--color-text-secondary)",
            fontSize: "11px",
          },
          formatter: function () {
            return formatPkrAbbreviated(Number(this.value));
          },
        },
      },
      tooltip: {
        shared: true,
        backgroundColor: "var(--color-surface-card)",
        borderColor: "var(--color-surface-stroke)",
        style: { color: "var(--color-text-primary)" },
        useHTML: true,
        formatter: function () {
          const ctx = this as unknown as {
            x: string | number;
            points?: Array<{ series: { name: string }; y: number }>;
          };
          const pts = ctx.points;
          if (!pts?.length) return "";
          let html = `<span style="font-size:12px;font-weight:600">${ctx.x}</span><br/>`;
          for (const p of pts) {
            html += `${p.series.name}: <b>${formatPkrAbbreviated(p.y)}</b><br/>`;
          }
          return html;
        },
      },
      plotOptions: {
        column: {
          stacking: "normal",
          borderWidth: 0,
          borderRadius: 3,
        },
      },
      series: series.map((s) => ({
        type: "column",
        name: s.name,
        data: s.data,
        color: s.color,
      })),
    }),
    [categories, series, ariaLabel]
  );

  return (
    <div className="h-[min(360px,55vh)] w-full min-h-[260px] sm:min-h-[300px]">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
