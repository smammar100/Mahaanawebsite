"use client";

import * as React from "react";
import { ResponsiveContainer, Tooltip } from "recharts";
import { cx } from "@/utils/cx";

export type ChartConfig = Record<
  string,
  {
    label?: string;
    color?: string;
    icon?: React.ComponentType<{ className?: string }>;
  }
>;

interface ChartContextProps {
  config: ChartConfig;
  chartId: string;
}

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a ChartContainer");
  }
  return context;
}

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig;
  children: React.ReactNode;
}

const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(
  ({ config, children, className, ...props }, ref) => {
    const id = React.useId();
    const chartId = `chart-${id.replace(/:/g, "")}`;

    return (
      <ChartContext.Provider value={{ config, chartId }}>
        <div
          ref={ref}
          className={cx("w-full", className)}
          data-chart-container
          {...props}
        >
          <ResponsiveContainer width="100%" height="100%">
            {children}
          </ResponsiveContainer>
        </div>
      </ChartContext.Provider>
    );
  }
);
ChartContainer.displayName = "ChartContainer";

const ChartTooltip = Tooltip;

interface ChartTooltipContentProps<
  TValue extends
    | number
    | string
    | ReadonlyArray<number | string>
    | Array<number | string>,
> {
  active?: boolean;
  payload?: ReadonlyArray<{
    name?: string | number;
    value?: TValue;
    dataKey?: string | number | ((obj: unknown) => unknown);
    color?: string;
    payload?: Record<string, unknown>;
  }>;
  label?: string | number;
  labelFormatter?: (label: unknown, payload?: Record<string, unknown>) => React.ReactNode;
  formatter?: (value: TValue | undefined, name: string, item: { dataKey: string; color: string; payload: Record<string, unknown> }) => React.ReactNode;
  hideLabel?: boolean;
  className?: string;
}

function ChartTooltipContent<
  TValue extends
    | number
    | string
    | ReadonlyArray<number | string>
    | Array<number | string>,
>({
  active,
  payload,
  label,
  labelFormatter,
  formatter,
  hideLabel,
  className,
}: ChartTooltipContentProps<TValue>) {
  const { config } = useChart();

  if (!active || !payload?.length) return null;

  const firstPayload = (payload[0].payload ?? {}) as Record<string, unknown>;

  const rows = payload
    .filter((item) => typeof item.dataKey === "string" && Boolean(config[item.dataKey]))
    .map((item) => {
      const dataKey = item.dataKey as string;
      const conf = config[dataKey];
      const color = conf?.color ?? item.color ?? "currentColor";
      const rowName =
        typeof item.name === "string" ? item.name : String(item.name ?? dataKey);
      const itemPayload = (item.payload ?? {}) as Record<string, unknown>;
      const value = formatter
        ? formatter(item.value as TValue | undefined, rowName, {
            dataKey,
            color,
            payload: itemPayload,
          })
        : String(item.value ?? "");
      return {
        dataKey,
        label: conf?.label ?? rowName,
        value,
        color,
      };
    });

  return (
    <div
      className={cx(
        "rounded-lg border border-surface-stroke bg-white p-3 shadow-lg",
        className
      )}
    >
      {!hideLabel && (
        <p className="text-tiny font-medium text-text-primary mb-2">
          {labelFormatter ? labelFormatter(label, firstPayload) : label != null ? String(label) : null}
        </p>
      )}
      <div className="flex flex-col gap-1">
        {rows.map(({ dataKey, label: rowLabel, value, color }) => (
          <p
            key={dataKey}
            className="flex items-center gap-2 text-tiny text-text-secondary"
          >
            <span
              className="h-[9px] w-[9px] shrink-0 rounded-full"
              style={{ backgroundColor: color }}
              aria-hidden
            />
            {rowLabel}: {value}
          </p>
        ))}
      </div>
    </div>
  );
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  useChart,
};
