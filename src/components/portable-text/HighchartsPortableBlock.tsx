"use client";

import type { Options } from "highcharts";
import { useEffect, useMemo, useState } from "react";

export interface HighchartsPortableValue {
  title?: string;
  jsonStr?: string;
  svgStr?: string;
}

/** Load Highcharts only on the client (same pattern as HighchartsPerformanceChart). */
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

function parseOptions(jsonStr: string | undefined): Options | null {
  if (!jsonStr?.trim()) return null;
  try {
    return JSON.parse(jsonStr) as Options;
  } catch {
    return null;
  }
}

export function HighchartsPortableBlock({ value }: { value: HighchartsPortableValue }) {
  const libs = useHighcharts();
  const options = useMemo(() => parseOptions(value.jsonStr), [value.jsonStr]);
  const ariaLabel = value.title?.trim() || "Chart";

  if (!options) {
    return (
      <figure
        className="my-8 rounded-2xl border border-surface-stroke bg-surface-bg p-6 text-body text-text-tertiary"
        role="figure"
        aria-label={ariaLabel}
      >
        Invalid or missing Highcharts JSON. Edit this block in Sanity and paste valid options.
      </figure>
    );
  }

  if (!libs) {
    return (
      <figure
        className="my-8 min-h-[240px] rounded-2xl border border-surface-stroke bg-surface-bg p-6"
        aria-busy
        aria-label={ariaLabel}
      >
        <div className="text-body text-text-tertiary">Loading chart…</div>
      </figure>
    );
  }

  const { Highcharts, HighchartsReact } = libs;

  const merged: Options = {
    ...options,
    chart: {
      ...(typeof options.chart === "object" && options.chart !== null ? options.chart : {}),
      backgroundColor: "transparent",
    },
    credits: {
      enabled: false,
      ...(typeof options.credits === "object" && options.credits !== null ? options.credits : {}),
    },
  };

  return (
    <figure
      className="my-8 w-full overflow-x-auto rounded-2xl border border-surface-stroke bg-surface-bg p-4 sm:p-6"
      aria-label={ariaLabel}
    >
      {value.title ? (
        <figcaption className="mb-4 text-center text-body font-semibold text-text-primary">
          {value.title}
        </figcaption>
      ) : null}
      <div className="min-h-[200px] w-full min-w-0">
        <HighchartsReact highcharts={Highcharts} options={merged} />
      </div>
    </figure>
  );
}
