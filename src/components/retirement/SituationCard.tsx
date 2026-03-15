"use client";

import { Input } from "@/components/ui/Input";
import { Field, FieldLabel } from "@/components/ui/Field";
import { Tooltip, TooltipTrigger } from "@/components/base/tooltip/tooltip";
import { cleanCopy } from "@/lib/copy-utils";
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
      <label className="flex w-36 shrink-0 text-body-sm font-medium text-text-primary md:w-40">
        {label}
        {tooltip != null && (
          <Tooltip title={tooltip} description={undefined}>
            <TooltipTrigger className="ml-1 inline-flex cursor-help text-text-tertiary hover:text-text-secondary">
              <span className="text-body-xs" aria-hidden>ⓘ</span>
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
      <p className="text-label text-system-brand">
        {cleanCopy("YOUR DETAILS")}
      </p>
      <h2 className="text-card-title mt-1 mb-6 text-text-primary sm:mb-8">
        {cleanCopy("Your investment", { fixWidows: false })}
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
        <p className="text-label text-text-tertiary">
          {cleanCopy("RETIREMENT")}
        </p>
        <h2 className="text-card-title mt-1 mb-6 text-text-primary sm:mb-8">
          {cleanCopy("Your retirement", { fixWidows: false })}
        </h2>
        <div className="space-y-4">
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
          <FieldRow label="Life expectancy">
            <Input
              type="number"
              min={60}
              max={120}
              placeholder="90"
              value={String(lifeExpectancy ?? "")}
              onChange={(value) => onLifeExpectancyChange(Number(value) || 0)}
            />
          </FieldRow>
        </div>
      </div>
    </div>
  );
}
