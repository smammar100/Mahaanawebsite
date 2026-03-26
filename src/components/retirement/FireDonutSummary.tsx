"use client";

import {
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
import type { FIREResult } from "@/lib/calculations";
import {
  FIRE_SEGMENT_COLORS,
  getFireDonutSegments,
  type FireDonutSegment,
} from "@/lib/fireDonut";
import { cleanCopy } from "@/lib/copy-utils";
import { fmt, fmtAxis, formatYearsMonths } from "@/lib/formatters";
import { CHART_COLORS } from "@/lib/investmentConfig";
import { cx } from "@/utils/cx";

const GOAL_LINE_COLOR = "#7042d2";

const chartConfig = {
  portfolio: { label: "Portfolio value", color: CHART_COLORS.portfolio },
  fireTarget: { label: "FIRE goal", color: GOAL_LINE_COLOR },
} satisfies ChartConfig;

interface FireDonutSummaryProps {
  hasCalculated: boolean;
  hasData: boolean;
  showResults: boolean;
  result: FIREResult;
  currentSavings: number;
  monthlyContrib: number;
  currentAge: number;
}

export function FireDonutSummary({
  hasCalculated,
  hasData,
  showResults,
  result,
  currentSavings,
  monthlyContrib,
  currentAge,
}: FireDonutSummaryProps) {
  const breakdown = showResults
    ? getFireDonutSegments(result, currentSavings)
    : null;

  const centerLabel = cleanCopy("Time to FIRE");
  const centerPrimary = !showResults
    ? "—"
    : result.reachable
      ? formatYearsMonths(result.yearsToFire, result.monthsToFire)
      : cleanCopy("Not reached");

  const segmentsForLegend: FireDonutSegment[] = breakdown?.segments ?? [
    {
      key: "startingCapital",
      label: "Starting capital",
      value: 0,
      color: FIRE_SEGMENT_COLORS.startingCapital,
    },
    {
      key: "contributions",
      label: "Contributions",
      color: FIRE_SEGMENT_COLORS.contributions,
      value: 0,
    },
    {
      key: "growth",
      label: "Investment growth",
      color: FIRE_SEGMENT_COLORS.growth,
      value: 0,
    },
  ];

  const chartData = result.data.map((row) => ({
    ...row,
    fireTarget: result.fireTarget,
  }));
  const showDots = chartData.length <= 30;

  const chartAriaLabel =
    showResults && breakdown
      ? `Portfolio path to FIRE goal ${fmt(result.fireTarget)}: ${breakdown.segments.map((s) => `${s.label} ${fmt(s.value)}`).join(", ")}`
      : "FIRE portfolio projection; enter details and tap See my plan";

  return (
    <div className="w-full bg-white px-5 py-6 sm:px-8 sm:py-8">
      <div>
        <p className="font-heading text-lg font-semibold text-text-primary sm:text-xl">
          {cleanCopy("Retirement calculator")}
        </p>
        <p className="mt-1 text-small text-text-tertiary">
          {cleanCopy("FIRE projection overview")}
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:mt-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-tiny font-medium text-text-tertiary">
            {centerLabel}
          </p>
          <p
            className={cx(
              "mt-0.5 font-heading text-2xl font-semibold leading-tight sm:text-3xl",
              !showResults && "text-text-tertiary",
              showResults &&
                result.reachable &&
                "text-system-brand",
              showResults && !result.reachable && "text-text-primary"
            )}
          >
            {centerPrimary}
          </p>
        </div>
        <p className="text-tiny text-text-tertiary sm:max-w-xs sm:text-right">
          {cleanCopy(
            "Solid line: projected portfolio by year. Dashed: FIRE target."
          )}
        </p>
      </div>

      <div
        className="mt-6 w-full min-w-0"
        role="img"
        aria-label={chartAriaLabel}
      >
        {!showResults ? (
          <div className="flex h-56 flex-col items-center justify-center rounded-xl border border-dashed border-surface-stroke bg-surface-card/50 p-6 text-center sm:h-64 lg:h-72">
            <p className="text-small text-text-tertiary">
              {hasData
                ? cleanCopy("Tap See my plan to plot your projection.")
                : cleanCopy(
                    "Enter contributions, retirement spending, and strategy—then tap See my plan."
                  )}
            </p>
          </div>
        ) : (
          <div className="h-56 w-full min-w-0 sm:h-64 lg:h-72">
            <div className="h-full rounded-xl border border-surface-stroke bg-white p-4 sm:p-5">
              <ChartContainer
                config={chartConfig}
                className="h-full w-full min-h-0 min-w-0"
              >
                <ComposedChart
                  key={`fire-line-${result.fireTarget}-${result.data.length}-${currentSavings}`}
                  data={chartData}
                  margin={{ top: 8, right: 8, left: 0, bottom: 20 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--color-surface-stroke)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="year"
                    stroke="var(--color-text-tertiary)"
                    tick={{ fontSize: 11, fill: "var(--color-text-secondary)" }}
                    tickFormatter={(v) => `Y${v}`}
                    label={{
                      value: "Year",
                      position: "insideBottom",
                      offset: -4,
                      fill: "var(--color-text-tertiary)",
                      fontSize: 11,
                    }}
                  />
                  <YAxis
                    tickFormatter={(n) => fmtAxis(n)}
                    width={68}
                    domain={[0, "auto"]}
                    stroke="var(--color-text-tertiary)"
                    tick={{ fontSize: 11, fill: "var(--color-text-secondary)" }}
                  />
                  <ChartTooltip
                    content={(props) => (
                      <ChartTooltipContent
                        {...props}
                        labelFormatter={(_label, payload) => {
                          const p = payload as {
                            year?: number;
                            age?: number;
                          };
                          return typeof p?.year === "number" &&
                            typeof p?.age === "number"
                            ? `Year ${p.year}, age ${p.age}`
                            : "";
                        }}
                        formatter={(value) => fmt(Number(value))}
                      />
                    )}
                  />
                  <Line
                    type="monotone"
                    dataKey="fireTarget"
                    name="FIRE goal"
                    stroke={GOAL_LINE_COLOR}
                    strokeWidth={2}
                    strokeDasharray="6 4"
                    dot={false}
                    isAnimationActive={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="portfolio"
                    name="Portfolio"
                    stroke={CHART_COLORS.portfolio}
                    strokeWidth={2}
                    dot={showDots}
                    isAnimationActive={false}
                  />
                </ComposedChart>
              </ChartContainer>
            </div>
          </div>
        )}
      </div>

      <div
        role="region"
        aria-label={cleanCopy("FIRE breakdown, guidance, and assumptions")}
        className="mt-8 sm:mt-10"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            {segmentsForLegend.map((s) => (
              <div
                key={s.key}
                className="rounded-lg border border-surface-stroke bg-surface-bg px-3 py-2.5 shadow-xs"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="size-2 shrink-0 rounded-full"
                    style={{ backgroundColor: s.color }}
                  />
                  <span className="text-tiny font-medium text-text-secondary">
                    {cleanCopy(s.label)}
                  </span>
                </div>
                <p className="mt-1 font-mono text-small font-semibold text-text-primary">
                  {showResults && breakdown && breakdown.portfolioAtFire > 0
                    ? fmt(
                        breakdown.segments.find((x) => x.key === s.key)?.value ??
                          0
                      )
                    : "—"}
                </p>
              </div>
            ))}
          </div>

          <NarrativeBlock
            hasCalculated={hasCalculated}
            hasData={hasData}
            showResults={showResults}
            result={result}
            currentAge={currentAge}
            monthlyContrib={monthlyContrib}
          />

          <div className="mt-2 border-t border-surface-stroke pt-8">
            <p className="text-tiny font-semibold text-text-secondary">
              {cleanCopy("Assumptions")}
            </p>
            <p className="mt-3 text-tiny leading-relaxed text-text-tertiary">
              {cleanCopy(
                "Blended return is weighted by your strategy allocation. Projections assume steady contributions and no taxes or fees. All figures are illustrative only. This calculator is for education and does not constitute financial advice."
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function NarrativeBlock({
  hasCalculated,
  hasData,
  showResults,
  result,
  currentAge,
  monthlyContrib,
}: {
  hasCalculated: boolean;
  hasData: boolean;
  showResults: boolean;
  result: FIREResult;
  currentAge: number;
  monthlyContrib: number;
}) {
  const narrativeWrap = "max-w-prose";
  const narrativeP =
    "text-body-lg leading-relaxed tracking-[0.05em] text-text-secondary";

  if (!hasCalculated || !hasData) {
    return (
      <div className={cx(narrativeWrap, "py-1")}>
        <p className={narrativeP}>
          {cleanCopy(
            "Enter your savings, monthly contribution, retirement spending, and strategy—then tap See my plan to project your path to FIRE."
          )}
        </p>
      </div>
    );
  }

  if (!result.reachable) {
    return (
      <div className={cx(narrativeWrap, "py-1")}>
        <p className={narrativeP}>
          {cleanCopy(
            "Based on your inputs, the portfolio does not reach your FIRE target within the projection window. Try raising contributions or choosing a higher-growth strategy (higher risk)."
          )}{" "}
          {cleanCopy("FIRE target:")}{" "}
          <strong className="text-system-brand">{fmt(result.fireTarget)}</strong>
          {". "}
          {cleanCopy("Expected return in the model:")}{" "}
          <strong className="text-system-brand">
            {(result.effectiveRate * 100).toFixed(2)}%
          </strong>
          {cleanCopy(" per year.")}
        </p>
      </div>
    );
  }

  const retireAge =
    result.retirementAge != null ? Math.round(result.retirementAge) : "—";
  const monthly = fmt(monthlyContrib);

  return (
    <div className={cx(narrativeWrap, "py-2 sm:py-3")}>
      <p className={narrativeP}>
        {cleanCopy("You could reach financial independence in")}
        {" "}
        <strong className="text-system-brand">
          {formatYearsMonths(result.yearsToFire, result.monthsToFire)}
        </strong>
        {cleanCopy(", around age")}
        {" "}
        <strong className="text-system-brand">{retireAge}</strong>
        {cleanCopy(", with a target portfolio near")}
        {" "}
        <strong className="text-system-brand">{fmt(result.fireTarget)}</strong>
        {cleanCopy(".")}
        {" "}
        {cleanCopy("You are contributing")}
        {" "}
        <strong className="text-system-brand">{monthly}</strong>
        {" "}
        {cleanCopy("per month from age")}
        {" "}
        <strong className="text-system-brand">{currentAge}</strong>
        {cleanCopy(
          "; growth assumes the blended return for your selected risk profile."
        )}
        {" "}
        {cleanCopy("Returns used: Money Market")}{" "}
        <strong className="text-system-brand">6%</strong>
        {cleanCopy(", Debt")}{" "}
        <strong className="text-system-brand">8%</strong>
        {cleanCopy(", Equity")}{" "}
        <strong className="text-system-brand">12%</strong>
        {cleanCopy("—weighted by allocation.")}
      </p>
    </div>
  );
}
