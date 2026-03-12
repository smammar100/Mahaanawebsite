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

interface HighchartsVariablePieChartProps {
  data: VariablePieDatum[];
  ariaLabel: string;
  onSegmentHover?: (index: number | null) => void;
}

export function HighchartsVariablePieChart({
  data,
  ariaLabel,
  onSegmentHover,
}: HighchartsVariablePieChartProps) {
  const id = useId().replace(/:/g, "");
  const containerId = `variable-pie-${id}`;

  const options: Options = useMemo(() => ({
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
              mouseOver: function (this: Highcharts.Point) {
                onSegmentHover(this.index);
              },
              mouseOut: function () {
                onSegmentHover(null);
              },
            },
          },
        }),
      },
    },
  }), [data, onSegmentHover]);

  return (
    <div
      className="flex min-h-0 w-full items-center justify-center lg:min-h-[280px]"
      role="img"
      aria-label={ariaLabel}
    >
      <div className="aspect-square w-full max-w-[280px] overflow-visible">
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
