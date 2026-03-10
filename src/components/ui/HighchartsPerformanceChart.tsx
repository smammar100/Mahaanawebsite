"use client";

import Highcharts from "highcharts";
import type { Options } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useId } from "react";

export interface PerformanceSeries {
  name: string;
  data: number[];
  color: string;
}

export interface HighchartsPerformanceChartProps {
  title: string;
  subtitle?: string;
  categories: string[];
  series: PerformanceSeries[];
  ariaLabel: string;
  chartType?: "area" | "line";
  yAxisTitle?: string;
  valueSuffix?: string;
}

const defaultYAxisTitle = "Cumulative return (%)";
const defaultValueSuffix = "%";

function buildOptions(props: HighchartsPerformanceChartProps): Options {
  const {
    title,
    subtitle,
    categories,
    series,
    chartType = "line",
    yAxisTitle = defaultYAxisTitle,
    valueSuffix = defaultValueSuffix,
  } = props;

  const seriesConfig: Options["series"] = series.map((s) => ({
    type: chartType,
    name: s.name,
    data: s.data,
    color: s.color,
    lineWidth: 2,
    marker: { enabled: false },
    ...(chartType === "area" ? { fillOpacity: 0.4 } : {}),
  }));

  return {
    chart: {
      backgroundColor: "transparent",
      marginBottom: 80,
      marginLeft: 8,
      marginRight: 16,
      spacingBottom: 24,
      style: {
        fontFamily: "inherit",
      },
    },
    title: {
      text: title,
      align: "left",
      style: {
        fontSize: "1rem",
        fontWeight: "600",
      },
    },
    subtitle: subtitle
      ? {
          text: subtitle,
          align: "left",
        }
      : undefined,
    yAxis: {
      title: {
        text: yAxisTitle,
      },
      gridLineColor: "var(--color-surface-stroke)",
      gridLineDashStyle: "Dash",
      labels: {
        style: {
          color: "var(--color-text-secondary)",
          fontSize: "12px",
        },
        format: `{value}${valueSuffix}`,
      },
    },
    xAxis: {
      categories,
      accessibility: {
        rangeDescription: `Range: ${categories[0] ?? ""} to ${categories[categories.length - 1] ?? ""}`,
      },
      labels: {
        style: {
          color: "var(--color-text-secondary)",
          fontSize: "12px",
        },
        rotation: 0,
        y: 16,
      },
      lineColor: "transparent",
      tickLength: 0,
    },
    legend: {
      layout: "vertical",
      align: "center",
      verticalAlign: "bottom",
      itemStyle: {
        fontSize: "12px",
        color: "var(--color-text-primary)",
      },
      y: 0,
      itemDistance: 12,
    },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
      },
      ...(chartType === "area"
        ? {
            area: {
              stacking: undefined,
              lineWidth: 2,
              fillOpacity: 0.4,
              marker: { enabled: false },
            },
          }
        : {
            line: {
              marker: { enabled: false },
            },
          }),
    },
    tooltip: {
      valueSuffix,
      valueDecimals: 2,
      backgroundColor: "var(--color-background-default, #fff)",
      borderColor: "var(--color-surface-stroke)",
      style: {
        color: "var(--color-text-primary)",
      },
    },
    series: seriesConfig,
    accessibility: {
      enabled: true,
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "vertical",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
        {
          condition: {
            maxWidth: 640,
          },
          chartOptions: {
            xAxis: {
              labels: {
                style: {
                  fontSize: "10px",
                },
              },
            },
            yAxis: {
              labels: {
                style: {
                  fontSize: "10px",
                },
              },
            },
          },
        },
      ],
    },
  };
}

export function HighchartsPerformanceChart(props: HighchartsPerformanceChartProps) {
  const id = useId().replace(/:/g, "");
  const containerId = `performance-chart-${id}`;
  const options = buildOptions(props);

  return (
    <div
      className="h-full w-full min-w-0"
      role="img"
      aria-label={props.ariaLabel}
    >
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        containerProps={{ id: containerId, style: { height: "100%", width: "100%" } }}
      />
    </div>
  );
}
