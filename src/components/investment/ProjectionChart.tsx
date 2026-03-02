"use client";

import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { fmt } from "@/lib/formatters";
import { formatAxisTick } from "@/lib/formatters";
import { CHART_COLORS, INVESTMENT_CURRENCY } from "@/lib/investmentConfig";
import type { YearlySnapshot } from "@/hooks/useInvestmentCalculation";

const chartConfig = {
  portfolio: { label: "Portfolio value", color: CHART_COLORS.portfolio },
  invested: { label: "Amount invested", color: CHART_COLORS.invested },
  initial: { label: "Initial investment", color: CHART_COLORS.initial },
} satisfies ChartConfig;

interface ProjectionChartProps {
  yearlyData: YearlySnapshot[];
  initial: number;
  monthly: number;
  rate: number;
  hasData: boolean;
}

export function ProjectionChart({
  yearlyData,
  initial,
  monthly,
  rate,
  hasData,
}: ProjectionChartProps) {
  const chartData = yearlyData.map((row) => ({
    ...row,
    initial,
  }));
  const showDots = chartData.length <= 25;

  if (!hasData || chartData.length === 0) {
    return (
      <div className="flex h-56 flex-col items-center justify-center rounded-lg border border-surface-stroke bg-surface-bg p-6 text-center sm:h-64 lg:h-80">
        <p className="text-small text-text-tertiary">
          Enter your investment details above to see the chart
        </p>
      </div>
    );
  }

  return (
    <div className="h-56 w-full min-w-0 sm:h-64 lg:h-80">
      <div className="h-full bg-white p-6">
        <ChartContainer config={chartConfig} className="h-full">
          <ComposedChart
            key={`inv-${initial}-${monthly}-${rate}-${chartData.length}`}
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 24 }}
          >
            <defs>
              <linearGradient
                id="investmentPortfolioGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor={CHART_COLORS.portfolio}
                  stopOpacity={0.12}
                />
                <stop
                  offset="100%"
                  stopColor={CHART_COLORS.portfolio}
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient
                id="investmentInvestedGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor={CHART_COLORS.invested}
                  stopOpacity={0.08}
                />
                <stop
                  offset="100%"
                  stopColor={CHART_COLORS.invested}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--color-surface-stroke)"
              vertical={false}
            />
            <XAxis
              dataKey="year"
              stroke="var(--color-text-tertiary)"
              tick={{ fontSize: 12, fill: "var(--color-text-secondary)" }}
              tickFormatter={(v: number) => `Y${v}`}
              label={{
                value: "Year",
                position: "insideBottom",
                offset: -5,
                fill: "var(--color-text-tertiary)",
                fontSize: 12,
              }}
            />
            <YAxis
              tickFormatter={(n: number) => formatAxisTick(n)}
              width={70}
              domain={[0, "auto"]}
              stroke="var(--color-text-tertiary)"
              tick={{ fontSize: 12, fill: "var(--color-text-secondary)" }}
            />
            <ChartTooltip
              content={(props) => (
                <ChartTooltipContent
                  active={props.active}
                  payload={props.payload ? [...props.payload] : undefined}
                  label={props.label != null ? String(props.label) : undefined}
                  labelFormatter={(_label, payload) =>
                    payload && typeof payload.year === "number"
                      ? `Year ${payload.year}`
                      : ""
                  }
                  formatter={(value) => fmt(Number(value), INVESTMENT_CURRENCY)}
                />
              )}
            />
            <Area
              type="monotone"
              dataKey="portfolio"
              name="Portfolio value"
              stroke={CHART_COLORS.portfolio}
              strokeWidth={2.5}
              fill="url(#investmentPortfolioGradient)"
              isAnimationActive={false}
              dot={showDots ? { r: 4 } : false}
            />
            <Area
              type="monotone"
              dataKey="invested"
              name="Amount invested"
              stroke={CHART_COLORS.invested}
              strokeWidth={2}
              fill="url(#investmentInvestedGradient)"
              isAnimationActive={false}
              dot={showDots ? { r: 3 } : false}
            />
            <Line
              type="monotone"
              dataKey="initial"
              name="Initial investment"
              stroke={CHART_COLORS.initial}
              strokeWidth={2}
              strokeDasharray="5 4"
              dot={false}
              isAnimationActive={false}
            />
          </ComposedChart>
        </ChartContainer>
      </div>
    </div>
  );
}
