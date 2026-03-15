"use client";

import { Input } from "@/components/ui/Input";
import { Field, FieldLabel } from "@/components/ui/Field";
import { cleanCopy } from "@/lib/copy-utils";
import { INVESTMENT_CURRENCY } from "@/lib/investmentConfig";
import { cx } from "@/utils/cx";

const numberInputClass =
  "py-3 text-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

interface InputCardProps {
  className?: string;
  initial: number;
  onInitialChange: (v: number) => void;
  monthly: number;
  onMonthlyChange: (v: number) => void;
  rate: number;
  onRateChange: (v: number) => void;
  years: number;
  onYearsChange: (v: number) => void;
}

export function InputCard({
  className,
  initial,
  onInitialChange,
  monthly,
  onMonthlyChange,
  rate,
  onRateChange,
  years,
  onYearsChange,
}: InputCardProps) {
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
        {cleanCopy("Your investment")}
      </h2>

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
    </div>
  );
}
