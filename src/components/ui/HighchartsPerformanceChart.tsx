"use client";

import type { Options } from "highcharts";
import { useId, useState, useEffect } from "react";

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
  /** When true, chart fills parent height only (no min-height). Use inside a card with fixed height so legend stays inside. */
  compact?: boolean;
}

const defaultYAxisTitle = "Cumulative return (%)";
const defaultValueSuffix = "%";

/** Load Highcharts only on the client to avoid SSR "SeriesRegistry" errors. */
function useHighcharts() {
  const [libs, setLibs] = useState<{
    Highcharts: typeof import("highcharts");
    HighchartsReact: typeof import("highcharts-react-official").default;
  } | null>(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([import("highcharts"), import("highcharts-react-official")]).then(
      ([HighchartsModule, HighchartsReactModule]) => {
        if (cancelled) return;
        setLibs({
          Highcharts: HighchartsModule.default,
          HighchartsReact: HighchartsReactModule.default,
        });
      }
    );
    return () => {
      cancelled = true;
    };
  }, []);

  return libs;
}

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
      spacing: [16, 16, 16, 16],
      marginTop: 56,
      marginRight: 32,
      marginLeft: 72,
      marginBottom: 72,
      reflow: true,
      animation: false,
      height: null,
      style: {
        fontFamily: "inherit",
      },
    },
    title: {
      text: title,
      align: "left",
      margin: 4,
      style: {
        fontSize: "18px",
        fontWeight: "600",
        color: "var(--color-text-primary)",
      },
    },
    subtitle: subtitle
      ? {
          text: subtitle,
          align: "left",
          style: {
            fontSize: "13px",
            color: "var(--color-text-tertiary)",
          },
        }
      : undefined,
    yAxis: {
      maxPadding: 0.15,
      startOnTick: false,
      endOnTick: false,
      title: {
        text: yAxisTitle,
        margin: 16,
        reserveSpace: true,
        style: {
          fontSize: "12px",
        },
      },
      lineColor: "var(--color-surface-stroke)",
      gridLineColor: "var(--color-surface-stroke)",
      gridLineDashStyle: "Dash",
      labels: {
        enabled: true,
        reserveSpace: true,
        y: 4,
        style: {
          color: "var(--color-text-secondary)",
          fontSize: "12px",
        },
        format: `{value}${valueSuffix}`,
      },
    },
    xAxis: {
      categories,
      startOnTick: false,
      endOnTick: false,
      minPadding: 0.03,
      maxPadding: 0.03,
      accessibility: {
        rangeDescription: `Range: ${categories[0] ?? ""} to ${categories[categories.length - 1] ?? ""}`,
      },
      labels: {
        enabled: true,
        reserveSpace: true,
        overflow: "justify",
        style: {
          color: "var(--color-text-secondary)",
          fontSize: "12px",
        },
        rotation: 0,
        y: 20,
      },
      lineColor: "var(--color-surface-stroke)",
      tickLength: 4,
    },
    legend: {
      enabled: true,
      align: "center",
      verticalAlign: "bottom",
      layout: "horizontal",
      itemDistance: 32,
      margin: 20,
      padding: 8,
      y: 0,
      itemStyle: {
        fontSize: "13px",
        fontWeight: "500",
        color: "var(--color-text-secondary)",
        cursor: "pointer",
      },
      itemHoverStyle: {
        color: "var(--color-text-primary)",
      },
      symbolWidth: 24,
      symbolHeight: 2,
      symbolRadius: 0,
      squareSymbol: false,
      useHTML: false,
    },
    plotOptions: {
      series: {
        clip: true,
        animation: {
          duration: 600,
        },
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
              marker: {
                enabled: false,
                states: {
                  hover: {
                    enabled: true,
                    radius: 4,
                  },
                },
              },
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
    credits: {
      enabled: false,
    },
    series: seriesConfig,
    accessibility: {
      enabled: true,
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 640,
          },
          chartOptions: {
            chart: {
              marginLeft: 56,
              marginBottom: 72,
            },
            yAxis: {
              title: {
                text: undefined,
              },
              labels: {
                style: { fontSize: "11px" },
              },
            },
            xAxis: {
              labels: {
                style: { fontSize: "11px" },
                rotation: -30,
              },
            },
            legend: {
              itemStyle: { fontSize: "11px" },
              itemDistance: 16,
            },
          },
        },
        {
          condition: {
            maxWidth: 768,
          },
          chartOptions: {
            chart: {
              marginLeft: 60,
            },
            yAxis: {
              labels: {
                style: { fontSize: "12px" },
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
  const libs = useHighcharts();
  const wrapperClass = props.compact
    ? "h-fit w-full"
    : "h-full w-full min-h-[380px] sm:min-h-[420px] md:min-h-[460px]";

  if (!libs) {
    return (
      <div
        className={wrapperClass}
        role="img"
        aria-label={props.ariaLabel}
        aria-busy="true"
      />
    );
  }

  const { Highcharts, HighchartsReact } = libs;

  return (
    <div
      className={wrapperClass}
      role="img"
      aria-label={props.ariaLabel}
    >
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        containerProps={{ id: containerId, style: { width: "100%", height: "fit-content" } }}
      />
    </div>
  );
}
