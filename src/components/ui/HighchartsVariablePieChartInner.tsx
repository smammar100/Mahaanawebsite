"use client";

import { useId, useMemo } from "react";
import Highcharts from "highcharts";
import "highcharts/modules/variable-pie";
import type { Options } from "highcharts";
import HighchartsReact from "highcharts-react-official";

export interface VariablePieDatum {
  name: string;
  value: number;
  fill: string;
}

export interface HighchartsVariablePieChartInnerProps {
  data: VariablePieDatum[];
  ariaLabel: string;
  onSegmentHover?: (index: number | null) => void;
}

export function HighchartsVariablePieChartInner({
  data,
  ariaLabel,
  onSegmentHover,
}: HighchartsVariablePieChartInnerProps) {
  const id = useId().replace(/:/g, "");
  const containerId = `variable-pie-${id}`;

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
          "Percentage: <b>{point.y:.2f}%</b><br/>",
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
                mouseOver: function (this: Highcharts.Point) {
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

  return (
    <div
      className="flex h-full min-h-[280px] w-full items-center justify-center"
      style={{ height: "100%", minHeight: 280 }}
      role="img"
      aria-label={ariaLabel}
    >
      <div
        className="variable-pie-chart-wrapper aspect-square h-full w-full overflow-visible"
        style={{ width: "100%", height: "100%", minHeight: 280 }}
      >
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          containerProps={{
            id: containerId,
            style: { width: "100%", height: "100%", minHeight: 280 },
          }}
        />
      </div>
    </div>
  );
}
