"use client";

import type { Options } from "highcharts";
import { useId, useState, useEffect, useLayoutEffect, useMemo, useRef } from "react";

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
  /**
   * When true, chart `height` tracks the parent box via ResizeObserver.
   * Parent must give this wrapper a fixed height (e.g. `h-64`) so Highcharts does not overflow into content below.
   */
  constrainToParent?: boolean;
  /**
   * When true, no Highcharts title or subtitle (put the section heading + caption in HTML above the chart).
   * Frees the full box height for plot, axes, and legend so constrained layouts are not cropped.
   */
  omitHeaderChrome?: boolean;
  /** When 'monthYear', x-axis shows labels as "Month Year". When 'shortDate', shows daily dates. When 'firstLastOnly', only inception and latest date. */
  xAxisLabelFormat?: "default" | "monthYear" | "shortDate" | "firstLastOnly";
  /** Decimal places for y-axis labels and tooltips (default 2). Use 4 for unit NAV / iNAV price charts. */
  valueDecimals?: number;
  /**
   * `top`: legend above the plot so rotated x-axis labels do not collide with it (narrow / constrained charts).
   * `bottom`: default Highcharts placement.
   */
  legendVerticalAlign?: "top" | "bottom";
  /** When true (e.g. MIIRF 5 risk lines), narrow viewports use tighter legend item width so items wrap instead of crowding the plot. */
  manySeries?: boolean;
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

function legendIsTop(base: Options): boolean {
  const leg = base.legend;
  if (!leg || typeof leg !== "object") return false;
  return (leg as { verticalAlign?: string }).verticalAlign === "top";
}

function chartOptionsIncludeHeader(base: Options): boolean {
  const tit = base.title;
  if (tit && typeof tit === "object") {
    const t = tit as { enabled?: boolean; text?: string | null };
    if (t.enabled !== false && t.text != null && String(t.text).length > 0) return true;
  }
  const sub = base.subtitle;
  if (sub && typeof sub === "object" && "text" in sub) {
    const sx = (sub as { text?: string | null }).text;
    if (sx != null && String(sx).length > 0) return true;
  }
  return false;
}

function buildOptions(props: HighchartsPerformanceChartProps): Options {
  const {
    title,
    subtitle,
    omitHeaderChrome,
    legendVerticalAlign = "bottom",
    manySeries = false,
    categories,
    series,
    chartType = "line",
    yAxisTitle = defaultYAxisTitle,
    valueSuffix = defaultValueSuffix,
    xAxisLabelFormat = "default",
    valueDecimals = 2,
  } = props;

  const showTitle = !omitHeaderChrome && title.trim().length > 0;
  const showSubtitle = !omitHeaderChrome && Boolean(subtitle?.trim());
  const legendOnTop = legendVerticalAlign === "top";

  const isShortDate = xAxisLabelFormat === "shortDate";
  const isFirstLastOnly = xAxisLabelFormat === "firstLastOnly";
  const xAxisStep =
    xAxisLabelFormat === "monthYear" || isFirstLastOnly
      ? 1
      : isShortDate
        ? categories.length > 30
          ? Math.max(1, Math.floor(categories.length / 12))
          : 1
        : categories.length > 90
          ? Math.max(1, Math.floor(categories.length / 10))
          : 1;

  const seriesConfig: Options["series"] = series.map((s) => ({
    type: chartType,
    name: s.name,
    data: s.data,
    color: s.color,
    lineWidth: 2,
    marker: { enabled: false },
    ...(chartType === "area" ? { fillOpacity: 0.4 } : {}),
  }));

  const chartMargins =
    isFirstLastOnly && omitHeaderChrome && legendOnTop
      ? {
          /** Room for top legend + plot + first/last date labels (no duplicate HTML title). */
          marginTop: 38,
          marginRight: 12,
          marginLeft: 60,
          marginBottom: 58,
        }
    : isFirstLastOnly
      ? { marginTop: 64, marginRight: 56, marginLeft: 100, marginBottom: 72 }
    : showTitle && showSubtitle
      ? { marginTop: 64, marginRight: 32, marginLeft: 88, marginBottom: 64 }
      : showTitle || showSubtitle
        ? { marginTop: 48, marginRight: 32, marginLeft: 88, marginBottom: 64 }
        : legendOnTop
          ? { marginTop: 40, marginRight: 14, marginLeft: 54, marginBottom: 52 }
          : { marginTop: 10, marginRight: 18, marginLeft: 58, marginBottom: 64 };

  const chartSpacing: [number, number, number, number] = legendOnTop
    ? [6, 8, 10, 6]
    : [10, 12, 12, 10];

  return {
    chart: {
      backgroundColor: "transparent",
      spacing: chartSpacing,
      ...chartMargins,
      reflow: true,
      animation: false,
      height: null,
      style: {
        fontFamily: "inherit",
      },
    },
    title: showTitle
      ? {
          text: title,
          align: "left",
          margin: 4,
          style: {
            fontSize: "18px",
            fontWeight: "600",
            color: "var(--color-text-primary)",
          },
        }
      : ({
          /** Highcharts omits the title SVG when `text` is `null` (runtime accepts; TS types are narrow). */
          text: null,
        } as unknown as Options["title"]),
    subtitle: showSubtitle
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
      crosshair: true,
      maxPadding: 0.15,
      startOnTick: false,
      endOnTick: false,
      title: {
        text: yAxisTitle,
        margin: 20,
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
        formatter: function (this: any): string {
          const v = Number(this.value);
          return (Number.isNaN(v) ? "" : v.toFixed(valueDecimals)) + (valueSuffix ?? "");
        },
      },
    },
    xAxis: {
      categories,
      crosshair: true,
      startOnTick: false,
      endOnTick: false,
      minPadding: isFirstLastOnly ? 0.18 : 0.03,
      maxPadding: isFirstLastOnly ? 0.18 : 0.03,
      visible: true,
      accessibility: {
        rangeDescription: `Range: ${categories[0] ?? ""} to ${categories[categories.length - 1] ?? ""}`,
      },
      labels: {
        enabled: true,
        reserveSpace: true,
        overflow: isFirstLastOnly ? "allow" : "justify",
        style: {
          color: "var(--color-text-secondary)",
          fontSize: "12px",
        },
        rotation: isShortDate && categories.length > 20 ? -30 : 0,
        y: 20,
        step: xAxisStep,
        formatter:
          isFirstLastOnly
            ? function (this: { value: string | number }) {
                const v = String(this.value);
                return v === categories[0] || v === categories[categories.length - 1]
                  ? v
                  : "";
              }
            : xAxisLabelFormat === "monthYear"
              ? function (this: { value: string | number }) {
                  const v = String(this.value);
                  const isFirstOrLast =
                    v === categories[0] || v === categories[categories.length - 1];
                  if (!isFirstOrLast) return "";
                  const d = new Date(v);
                  if (Number.isNaN(d.getTime())) return v;
                  const monthLabel = d.toLocaleDateString("en-US", { month: "short" });
                  return `${monthLabel} ${d.getFullYear()}`;
                }
              : isShortDate
                ? function (this: { value: string | number }) {
                    return String(this.value);
                  }
                : function (this: { value: string | number }) {
                    const v = String(this.value);
                    const parts = v.split(", ");
                    if (parts.length === 2) {
                      const monthPart = parts[0].split(" ")[0];
                      return monthPart ? `${monthPart} ${parts[1]}` : v;
                    }
                    return v;
                  },
      },
      lineColor: "var(--color-surface-stroke)",
      tickLength: 4,
      lineWidth: 1,
    },
    legend: {
      enabled: true,
      align: "center",
      verticalAlign: legendOnTop ? "top" : "bottom",
      layout: "horizontal",
      itemDistance: manySeries ? 12 : 32,
      ...(manySeries ? { itemWidth: 100 } : {}),
      margin: legendOnTop ? 6 : 20,
      padding: legendOnTop ? 4 : 8,
      y: legendOnTop ? 2 : 0,
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
      shared: true,
      useHTML: true,
      valueSuffix,
      valueDecimals,
      backgroundColor: "var(--color-background-default, #fff)",
      borderColor: "var(--color-surface-stroke)",
      borderWidth: 1,
      shadow: true,
      style: {
        color: "var(--color-text-primary)",
      },
      formatter: function (this: any) {
        const points = this.points ?? [];
        const date =
          (points[0] && "point" in points[0] && (points[0].point as { category?: string }).category) ??
          "";
        const suffix = valueSuffix ?? "";
        // Sort by series index so tooltip order is stable (matches series order: MIIETF, Benchmark, KMI30, etc.)
        const sortedPoints = [...points].sort(
          (a: { series: { index: number } }, b: { series: { index: number } }) =>
            (a.series?.index ?? 0) - (b.series?.index ?? 0)
        );
        const rows = sortedPoints
          .map((p: { point: { y?: number; color?: string }; series: { name: string; color?: string } }) => {
            const point = p.point as { y?: number; color?: string };
            const name = p.series.name;
            const color = point.color ?? p.series.color ?? "#666";
            const val =
              typeof point.y === "number"
                ? point.y.toFixed(valueDecimals) + suffix
                : "-";
            return `<tr><td style="padding:2px 6px 2px 0"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${color};vertical-align:middle;margin-right:6px"></span></td><td style="padding:2px 0">${name}: ${val}</td></tr>`;
          })
          .join("");
        return `<div style="font-size:12px"><strong style="display:block;margin-bottom:6px">${date}</strong><table>${rows}</table></div>`;
      },
    },
    credits: {
      enabled: false,
    },
    series: seriesConfig,
    accessibility: {
      enabled: true,
    },
    responsive: legendOnTop
      ? {
          rules: [
            {
              condition: { maxWidth: 768 },
              chartOptions: {
                chart: {
                  marginLeft: 58,
                  marginRight: 6,
                  marginBottom: 54,
                  marginTop: 36,
                },
                title: { text: null } as unknown as Options["title"],
                yAxis: {
                  title: { text: undefined },
                  labels: { style: { fontSize: "11px" } },
                },
                xAxis: {
                  labels: {
                    style: { fontSize: "11px" },
                    rotation: -35,
                    y: 14,
                    x: 0,
                  },
                },
                legend: {
                  itemStyle: { fontSize: "10px" },
                  itemDistance: 6,
                  margin: 4,
                  padding: 2,
                  ...(manySeries
                    ? { itemWidth: 72, width: "100%", maxHeight: 72 }
                    : {}),
                },
              },
            },
          ],
        }
      : {
          rules: [
            {
              condition: { maxWidth: 640 },
              chartOptions: {
                chart: {
                  marginLeft: 50,
                  marginBottom: 96,
                  marginRight: 8,
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
                    y: 18,
                  },
                },
                legend: {
                  itemStyle: { fontSize: "11px" },
                  itemDistance: 16,
                },
              },
            },
            {
              condition: { maxWidth: 768, minWidth: 641 },
              chartOptions: {
                chart: {
                  marginLeft: 76,
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

function mergeChartHeightForConstraint(
  base: Options,
  boxHeight: number
): Options {
  const h = Math.max(120, Math.floor(boxHeight));
  const tight = h < 300;
  const medium = h < 380;
  const hasHeader = chartOptionsIncludeHeader(base);
  const topLegend = legendIsTop(base);
  /** Keep ~52px+ left so two-decimal y labels (e.g. "25.00") are not ellipsized. */
  const chartMargins = tight
    ? {
        marginTop: topLegend ? 24 : hasHeader ? 36 : 6,
        marginRight: topLegend ? 6 : 10,
        marginLeft: topLegend ? 54 : 48,
        marginBottom: topLegend ? 52 : hasHeader ? 44 : 58,
      }
    : medium
      ? {
          marginTop: topLegend ? 28 : hasHeader ? 44 : 10,
          marginRight: topLegend ? 8 : 14,
          marginLeft: topLegend ? 56 : 54,
          marginBottom: topLegend ? 44 : hasHeader ? 48 : 52,
        }
      : {};

  const legendPatch = tight
    ? { margin: 8, padding: 4, itemDistance: 12 }
    : medium
      ? { margin: 12, padding: 6, itemDistance: 18 }
      : {};

  return {
    ...base,
    chart: {
      ...base.chart,
      ...chartMargins,
      height: h,
    },
    legend: base.legend
      ? { ...base.legend, ...legendPatch }
      : base.legend,
  };
}

export function HighchartsPerformanceChart(props: HighchartsPerformanceChartProps) {
  const id = useId().replace(/:/g, "");
  const containerId = `performance-chart-${id}`;
  const containerRef = useRef<HTMLDivElement>(null);
  const { constrainToParent } = props;
  const [boxHeight, setBoxHeight] = useState<number>(() => (constrainToParent ? 280 : 0));

  useLayoutEffect(() => {
    if (!constrainToParent) return;
    const el = containerRef.current;
    if (!el) return;
    const measure = () => {
      const next = Math.floor(el.getBoundingClientRect().height);
      if (next > 0) setBoxHeight(next);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [constrainToParent]);

  const options = useMemo(() => {
    const base = buildOptions(props);
    if (constrainToParent && boxHeight > 0) {
      return mergeChartHeightForConstraint(base, boxHeight);
    }
    return base;
  }, [props, boxHeight, constrainToParent]);

  const libs = useHighcharts();
  const wrapperClass = props.compact ? "h-fit w-full" : "h-fit w-full";
  const outerClass = constrainToParent
    ? "h-full w-full min-h-0 min-w-0"
    : wrapperClass;

  if (!libs) {
    return (
      <div
        ref={constrainToParent ? containerRef : undefined}
        className={outerClass}
        role="img"
        aria-label={props.ariaLabel}
        aria-busy="true"
      />
    );
  }

  const { Highcharts, HighchartsReact } = libs;

  return (
    <div
      ref={containerRef}
      className={outerClass}
      role="img"
      aria-label={props.ariaLabel}
    >
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        containerProps={{
          id: containerId,
          style: {
            width: "100%",
            height: constrainToParent ? "100%" : "fit-content",
          },
        }}
      />
    </div>
  );
}
