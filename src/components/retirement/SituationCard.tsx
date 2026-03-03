"use client";

import { Input } from "@/components/ui/Input";
import { Field, FieldLabel } from "@/components/ui/Field";
import { H4 } from "@/components/ui/Typography";
import { Tooltip, TooltipTrigger } from "@/components/base/tooltip/tooltip";
import { INVESTMENT_CURRENCY } from "@/lib/investmentConfig";
import { cx } from "@/utils/cx";

const numberInputClass =
  "py-3 text-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

interface SituationCardProps {
  className?: string;
  /** Same 4 fields as Investment calculator */
  initial: number;
  onInitialChange: (v: number) => void;
  monthly: number;
  onMonthlyChange: (v: number) => void;
  rate: number;
  onRateChange: (v: number) => void;
  years: number;
  onYearsChange: (v: number) => void;
  /** Retirement-specific */
  age: number;
  onAgeChange: (v: number) => void;
  annualSpending: number;
  onAnnualSpendingChange: (v: number) => void;
  lifeExpectancy: number;
  onLifeExpectancyChange: (v: number) => void;
}

function FieldRow({
  label,
  children,
  tooltip,
}: {
  label: string;
  children: React.ReactNode;
  tooltip?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <label className="flex w-36 shrink-0 text-small font-medium text-text-primary md:w-40">
        {label}
        {tooltip != null && (
          <Tooltip title={tooltip} description={undefined}>
            <TooltipTrigger className="ml-1 inline-flex cursor-help text-text-tertiary hover:text-text-secondary">
              <span className="text-tiny" aria-hidden>ⓘ</span>
            </TooltipTrigger>
          </Tooltip>
        )}
      </label>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

export function SituationCard({
  className,
  initial,
  onInitialChange,
  monthly,
  onMonthlyChange,
  rate,
  onRateChange,
  years,
  onYearsChange,
  age,
  onAgeChange,
  annualSpending,
  onAnnualSpendingChange,
  lifeExpectancy,
  onLifeExpectancyChange,
}: SituationCardProps) {
  return (
    <div
      className={cx(
        "rounded-2xl border border-surface-stroke bg-surface-card p-6 sm:p-8 lg:p-10",
        className
      )}
    >
      <p className="text-[11px] font-bold uppercase tracking-widest text-system-brand">
        YOUR DETAILS
      </p>
      <h2 className="mt-1 font-heading text-2xl font-bold tracking-heading text-text-primary lg:text-3xl mb-6 sm:mb-8">
        Your investment
      </h2>

      {/* Same 4 fields as Investment calculator – units in labels */}
      <div className="space-y-4">
        <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
          <FieldLabel className="lg:w-48 lg:shrink-0">
            Initial Investment Amount ({INVESTMENT_CURRENCY})
          </FieldLabel>
          <Field className="min-w-0 flex-1">
            <Input
              type="number"
              min={0}
              placeholder="0"
              value={String(initial ?? "")}
              onChange={(value) => onInitialChange(Number(value) || 0)}
              className={numberInputClass}
            />
          </Field>
        </div>

        <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
          <div className="lg:w-48 lg:shrink-0 space-y-0.5">
            <FieldLabel className="block">Monthly Contribution ({INVESTMENT_CURRENCY})</FieldLabel>
            <span className="text-tiny text-text-tertiary">Optional</span>
          </div>
          <Field className="min-w-0 flex-1">
            <Input
              type="number"
              min={0}
              placeholder="0"
              value={String(monthly ?? "")}
              onChange={(value) => onMonthlyChange(Number(value) || 0)}
              className={numberInputClass}
            />
          </Field>
        </div>

        <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
          <FieldLabel className="lg:w-48 lg:shrink-0">
            Estimated Rate of Return (%)
          </FieldLabel>
          <Field className="min-w-0 flex-1">
            <Input
              type="number"
              min={0}
              max={100}
              step={0.1}
              placeholder="0"
              value={String(rate ?? "")}
              onChange={(value) => onRateChange(Number(value) || 0)}
              className={numberInputClass}
            />
          </Field>
        </div>

        <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
          <FieldLabel className="lg:w-48 lg:shrink-0">
            Years to Grow (yrs)
          </FieldLabel>
          <Field className="min-w-0 flex-1">
            <Input
              type="number"
              min={1}
              max={100}
              placeholder="0"
              value={String(years ?? "")}
              onChange={(value) => onYearsChange(Number(value) || 0)}
              className={numberInputClass}
            />
          </Field>
        </div>
      </div>

      {/* Retirement section */}
      <div className="mt-6 border-t border-surface-stroke pt-6">
        <p className="text-tiny uppercase tracking-wider text-text-tertiary">
          RETIREMENT
        </p>
        <H4 className="mt-1 font-bold text-text-primary">Your retirement</H4>
        <div className="mt-4 space-y-4">
          <FieldRow label="Current age">
            <Input
              type="number"
              min={18}
              max={80}
              value={String(age ?? "")}
              onChange={(value) => onAgeChange(Number(value) || 0)}
            />
          </FieldRow>
          <FieldRow
            label="Annual spending"
            tooltip="Expected annual spending in retirement (today's value)."
          >
            <Input
              type="number"
              min={0}
              value={String(annualSpending ?? "")}
              onChange={(value) =>
                onAnnualSpendingChange(Number(value) || 0)
              }
            />
          </FieldRow>
          <div className="flex items-center gap-3">
            <label className="flex w-36 shrink-0 text-small font-medium text-text-primary md:w-40">
              Life expectancy
            </label>
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <span className="font-mono text-small text-text-secondary">
                {lifeExpectancy}
              </span>
              <input
                type="range"
                min={60}
                max={120}
                step={1}
                value={lifeExpectancy}
                onChange={(e) => onLifeExpectancyChange(Number(e.target.value))}
                className="h-2 flex-1 cursor-pointer appearance-none rounded-lg border border-surface-stroke bg-surface-bg [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-primary-200 [&::-webkit-slider-thumb]:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-system-brand focus-visible:ring-offset-0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
