"use client";

import { useId, useMemo, useState, useEffect } from "react";
import type { Options } from "highcharts";

export interface VariablePieDatum {
  name: string;
  value: number;
  fill: string;
}

interface HighchartsVariablePieChartProps {
  data: VariablePieDatum[];
  ariaLabel: string;
  onSegmentHover?: (index: number | null) => void;
}

/** Load Highcharts only on the client to avoid SSR "SeriesRegistry" errors. */
function useHighchartsVariablePie() {
  const [libs, setLibs] = useState<{
    Highcharts: typeof import("highcharts");
    HighchartsReact: typeof import("highcharts-react-official").default;
  } | null>(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      import("highcharts"),
      import("highcharts/modules/variable-pie"),
      import("highcharts-react-official"),
    ]).then(([HighchartsModule, variablePieModule, HighchartsReactModule]) => {
      if (cancelled) return;
      variablePieModule.default(HighchartsModule.default);
      setLibs({
        Highcharts: HighchartsModule.default,
        HighchartsReact: HighchartsReactModule.default,
      });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return libs;
}

export function HighchartsVariablePieChart({
  data,
  ariaLabel,
  onSegmentHover,
}: HighchartsVariablePieChartProps) {
  const id = useId().replace(/:/g, "");
  const containerId = `variable-pie-${id}`;
  const libs = useHighchartsVariablePie();

  const options: Options = useMemo(
    () => ({
      chart: {
        type: "variablepie",
        backgroundColor: "transparent",
        style: { fontFamily: "inherit" },
        spacing: [12, 12, 12, 12],
      },
      title: { text: undefined },
      tooltip: {
        headerFormat: "",
        pointFormat:
          '<span style="color:{point.color}">\u25CF</span> <b>{point.name}</b><br/>' +
          "Percentage: <b>{point.y}%</b><br/>",
        backgroundColor: "var(--color-surface-bg, #fff)",
        borderColor: "var(--color-surface-stroke)",
        style: { color: "var(--color-text-primary)", fontSize: "13px" },
      },
      series: [
        {
          minPointSize: 10,
          innerSize: "20%",
          zMin: 0,
          name: "portfolio",
          borderRadius: 5,
          data: data.map((d) => ({
            name: d.name,
            y: d.value,
            z: d.value,
            color: d.fill,
          })),
        },
      ],
      credits: { enabled: false },
      accessibility: { enabled: true },
      plotOptions: {
        variablepie: {
          dataLabels: { enabled: false },
          showInLegend: false,
          ...(onSegmentHover && {
            point: {
              events: {
                mouseOver: function (this: import("highcharts").Point) {
                  onSegmentHover(this.index);
                },
                mouseOut: function () {
                  onSegmentHover?.(null);
                },
              },
            },
          }),
        },
      },
    }),
    [data, onSegmentHover]
  );

  if (!libs) {
    return (
      <div
        className="variable-pie-chart-wrapper flex aspect-square h-full w-full min-h-0 items-center justify-center overflow-visible"
        style={{ width: "100%", height: "100%" }}
        role="img"
        aria-label={ariaLabel}
        aria-busy="true"
      />
    );
  }

  const { Highcharts, HighchartsReact } = libs;

  return (
    <div
      className="flex h-full min-h-0 w-full items-center justify-center"
      style={{ height: "100%" }}
      role="img"
      aria-label={ariaLabel}
    >
      <div
        className="variable-pie-chart-wrapper aspect-square h-full w-full overflow-visible"
        style={{ width: "100%", height: "100%" }}
      >
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          containerProps={{
            id: containerId,
            style: { width: "100%", height: "100%" },
          }}
        />
      </div>
    </div>
  );
}
