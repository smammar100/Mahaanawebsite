"use client";

import { useMemo } from "react";
import Highcharts from "highcharts";
import type { Options } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { formatPkrAbbreviated } from "@/lib/formatters";

export interface InvestmentLineSeries {
  name: string;
  data: number[];
  color: string;
}

export interface HighchartsInvestmentLineChartInnerProps {
  categories: string[];
  series: InvestmentLineSeries[];
  ariaLabel: string;
}

export function HighchartsInvestmentLineChartInner({
  categories,
  series,
  ariaLabel,
}: HighchartsInvestmentLineChartInnerProps) {
  const options: Options = useMemo(
    () => ({
      chart: {
        type: "line",
        backgroundColor: "transparent",
        spacing: [12, 10, 18, 6],
        style: { fontFamily: "inherit" },
      },
      title: { text: undefined },
      credits: { enabled: false },
      accessibility: {
        enabled: true,
        description: ariaLabel,
      },
      xAxis: {
        categories,
        lineColor: "var(--color-surface-stroke)",
        tickColor: "var(--color-surface-stroke)",
        labels: {
          style: {
            color: "var(--color-text-secondary)",
            fontSize: "12px",
          },
        },
      },
      yAxis: {
        title: { text: undefined },
        gridLineColor: "var(--color-surface-stroke)",
        labels: {
          style: {
            color: "var(--color-text-secondary)",
            fontSize: "12px",
          },
          formatter: function () {
            return formatPkrAbbreviated(Number(this.value));
          },
        },
      },
      legend: {
        enabled: false,
      },
      tooltip: {
        shared: true,
        useHTML: true,
        backgroundColor: "var(--color-surface-bg)",
        borderColor: "var(--color-surface-stroke)",
        formatter: function (): string {
          const ctx = this as unknown as {
            x?: string;
            points?: Array<{
              color?: string;
              y?: number;
              series: { name: string };
            }>;
          };
          const rows = (ctx.points ?? [])
            .map((point) => {
              const value = Number(point.y ?? 0);
              return `<tr><td style="padding:2px 8px 2px 0"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${point.color ?? "#666"};margin-right:6px"></span>${point.series.name}</td><td style="padding:2px 0;font-weight:600">${formatPkrAbbreviated(value)}</td></tr>`;
            })
            .join("");
          const xLabel = String(ctx.x ?? "");
          const headerLabel =
            xLabel.toLowerCase().includes("year") || xLabel.length === 0
              ? xLabel
              : `Year ${xLabel}`;
          return `<div style="font-size:12px"><strong style="display:block;margin-bottom:6px">${headerLabel}</strong><table>${rows}</table></div>`;
        },
      },
      plotOptions: {
        series: {
          marker: {
            enabled: false,
          },
          lineWidth: 3,
        },
      },
      series: series.map((item) => ({
        type: "line",
        name: item.name,
        data: item.data,
        color: item.color,
      })),
    }),
    [ariaLabel, categories, series]
  );

  return (
    <div className="h-full w-full" role="img" aria-label={ariaLabel}>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        containerProps={{ className: "h-full w-full" }}
      />
    </div>
  );
}
