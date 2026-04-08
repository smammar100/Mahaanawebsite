"use client";

import { useState } from "react";
import { useInvestmentCalculation } from "@/hooks/useInvestmentCalculation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HighchartsInvestmentLineChart } from "@/components/ui/HighchartsInvestmentLineChart";
import { Container } from "@/components/layout/Container";
import { cleanCopy } from "@/lib/copy-utils";
import { cx } from "@/utils/cx";

type MandatoryField = "initial" | "rate" | "years";

function formatCurrency(value: number, fallback = "—") {
  if (!Number.isFinite(value) || value <= 0) {
    return fallback;
  }

  const absoluteValue = Math.abs(value);

  if (absoluteValue >= 1_000_000_000) {
    return `PKR ${(value / 1_000_000_000).toFixed(2)}B`;
  }

  if (absoluteValue >= 1_000_000) {
    return `PKR ${(value / 1_000_000).toFixed(2)}M`;
  }

  if (absoluteValue >= 1_000) {
    return `PKR ${(value / 1_000).toFixed(2)}K`;
  }

  return `PKR ${value.toLocaleString("en-PK", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function SidebarInput({
  label,
  helperText,
  value,
  onChange,
  prefix,
  suffix,
  min = 0,
  step = 1,
  errorText,
}: {
  label: string;
  helperText?: string;
  value: number;
  onChange: (value: number) => void;
  prefix?: string;
  suffix?: string;
  min?: number;
  step?: number;
  errorText?: string;
}) {
  const onValueChange = (input: string) => {
    if (!input.trim()) {
      onChange(0);
      return;
    }

    const parsed = Number(input);
    onChange(Number.isNaN(parsed) ? 0 : Math.max(min, parsed));
  };

  return (
    <div className="space-y-2">
      <div className="space-y-1">
        <p className="text-body-sm font-medium text-text-primary">{label}</p>
        {helperText ? (
          <p className="text-body-xs italic text-text-tertiary">{helperText}</p>
        ) : null}
      </div>
      <label
        className={cx(
          "flex h-11 items-center gap-2 rounded-lg border bg-white px-3 transition-colors",
          errorText
            ? "border-error-300 hover:border-error-300 focus-within:border-error-300"
            : "border-surface-stroke hover:border-text-tertiary/40 focus-within:border-system-brand"
        )}
      >
        {prefix ? (
          <span className="font-mono text-body-xs text-text-tertiary">
            {prefix}
          </span>
        ) : null}
        <input
          type="number"
          value={Number.isFinite(value) ? value : 0}
          min={min}
          step={step}
          onChange={(event) => onValueChange(event.target.value)}
          className="w-full bg-transparent font-mono text-small text-text-primary outline-none placeholder:text-text-tertiary"
          placeholder="0"
          inputMode="numeric"
        />
        {suffix ? (
          <span className="font-mono text-body-xs text-text-tertiary">
            {suffix}
          </span>
        ) : null}
      </label>
      {errorText ? (
        <p className="text-body-xs text-error-150">{errorText}</p>
      ) : null}
    </div>
  );
}

export interface InvestmentCalculatorProps {
  /** When true, renders only the card (no outer Container). Use inside another Container. */
  embedded?: boolean;
}

export function InvestmentCalculator({ embedded = false }: InvestmentCalculatorProps) {
  const [initial, setInitial] = useState(500000);
  const [monthly, setMonthly] = useState(25000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [errors, setErrors] = useState<Record<MandatoryField, string>>({
    initial: "",
    rate: "",
    years: "",
  });

  const validateMandatoryFields = () => {
    const nextErrors: Record<MandatoryField, string> = {
      initial: initial > 0 ? "" : "Initial investment is required.",
      rate: rate > 0 ? "" : "Rate of return is required.",
      years: years > 0 ? "" : "Investment period is required.",
    };

    setErrors(nextErrors);

    return !Object.values(nextErrors).some(Boolean);
  };

  const handleCalculateReturns = () => {
    if (!validateMandatoryFields()) {
      setHasCalculated(false);
      return;
    }

    setHasCalculated(true);
  };

  const result = useInvestmentCalculation({
    initial: hasCalculated ? initial : 0,
    monthly: hasCalculated ? monthly : 0,
    rate: hasCalculated ? rate : 0,
    years: hasCalculated ? years : 0,
  });

  const hasResults = hasCalculated && initial > 0 && years > 0;
  const months = Math.max(0, Math.floor(years) * 12);
  const totalContributed = initial + monthly * months;
  const totalReturns = Math.max(result.futureValue - totalContributed, 0);

  const chartCategories = result.yearlyData.map((point) => `Year ${point.year}`);
  const chartSeries = [
    {
      name: "Initial Investment",
      data: result.yearlyData.map(() => initial),
      color: "var(--color-text-primary)",
    },
    {
      name: "Returns",
      data: result.yearlyData.map((point) => point.interest),
      color: "var(--color-system-success)",
    },
    {
      name: "Total Value",
      data: result.yearlyData.map((point) => point.portfolio),
      color: "var(--chart-3)",
    },
  ];

  const card = (
    <Card className="overflow-hidden rounded-2xl border border-surface-stroke bg-white shadow-sm">
        <div className="grid grid-cols-1 items-stretch lg:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="flex flex-col border-b border-surface-stroke bg-surface-card/50 p-5 sm:p-6 lg:border-r lg:border-b-0">
            <div className="space-y-4">
              <SidebarInput
                label="Current savings"
                value={initial}
                onChange={setInitial}
                suffix="PKR"
                errorText={errors.initial}
              />
              <SidebarInput
                label="Ongoing contributions"
                value={monthly}
                onChange={setMonthly}
                suffix="PKR"
              />
              <SidebarInput
                label="Expected annual return"
                value={rate}
                onChange={setRate}
                suffix="%"
                step={0.1}
                errorText={errors.rate}
              />
              <SidebarInput
                label="Years to contribute"
                value={years}
                onChange={setYears}
                suffix="yrs"
                errorText={errors.years}
              />
              <Button
                type="button"
                onClick={handleCalculateReturns}
                className="h-11 w-full rounded-lg bg-primary-200 font-semibold text-gray-100 shadow-sm ring-1 ring-primary-200/50 ring-inset hover:bg-primary-300"
              >
                Calculate
              </Button>
            </div>
          </aside>

          <section className="flex min-h-[420px] flex-col p-5 sm:p-6 lg:p-8">
            {!hasResults ? (
              <div className="flex flex-1 flex-col items-center justify-center px-1 text-center">
                <h2 className="text-h5 text-text-primary">
                  {cleanCopy("Enter your details")}
                </h2>
                <p className="mt-2 max-w-md text-body text-text-tertiary">
                  {cleanCopy(
                    "Add your investment amount, return, and years to preview your savings projection."
                  )}
                </p>
              </div>
            ) : (
              <div className="animate-fadeInUp flex flex-1 flex-col">
                <h2 className="text-h5 text-text-primary sm:text-h4">
                  {cleanCopy("You could have")}{" "}
                  <span className="text-primary-200">
                    {formatCurrency(result.futureValue)}
                  </span>
                </h2>
                <p className="mt-1.5 text-body-sm text-text-tertiary sm:mt-2 sm:text-body">
                  {cleanCopy(
                    "This projection is based on your inputs and updates yearly as contributions and returns compound."
                  )}
                </p>

                <div className="mt-3 h-[240px] w-full min-h-0 sm:mt-3.5 sm:h-[256px] lg:h-[272px]">
                  <HighchartsInvestmentLineChart
                    categories={chartCategories}
                    series={chartSeries}
                    ariaLabel="Investment projection line chart with total value, contributions, and returns"
                  />
                </div>

                <div className="mt-2 flex flex-wrap items-start justify-center gap-6 sm:mt-3 sm:gap-8">
                  <div className="text-center">
                    <p className="text-body-xs font-semibold tracking-[0.12em] text-text-tertiary uppercase">
                      Initial Investment
                    </p>
                    <p className="mt-1 font-mono text-medium font-semibold text-text-primary">
                      {formatCurrency(initial)}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-body-xs font-semibold tracking-[0.12em] text-text-tertiary uppercase">
                      Returns
                    </p>
                    <p className="mt-1 font-mono text-medium font-semibold text-system-success">
                      {formatCurrency(totalReturns)}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-body-xs font-semibold tracking-[0.12em] text-text-tertiary uppercase">
                      Total Value
                    </p>
                    <p className="mt-1 font-mono text-medium font-semibold text-primary-200">
                      {formatCurrency(result.futureValue)}
                    </p>
                  </div>
                </div>

              </div>
            )}
          </section>
        </div>
      </Card>
  );

  if (embedded) {
    return card;
  }

  return (
    <Container className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      {card}
    </Container>
  );
}
