"use client";

import { Input } from "@/components/ui/Input";
import { Field, FieldLabel } from "@/components/ui/Field";
import { INVESTMENT_CURRENCY } from "@/lib/investmentConfig";
import { cx } from "@/utils/cx";

const inputBaseClass =
  "py-3 text-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

function InputWithAdornment({
  leftAdornment,
  rightAdornment,
  className,
  ...props
}: React.ComponentProps<typeof Input> & {
  leftAdornment?: React.ReactNode;
  rightAdornment?: React.ReactNode;
}) {
  return (
    <div className="relative flex w-full">
      {leftAdornment && (
        <span
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-text-tertiary"
          aria-hidden
        >
          {leftAdornment}
        </span>
      )}
      {rightAdornment && (
        <span
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-text-tertiary"
          aria-hidden
        >
          {rightAdornment}
        </span>
      )}
      <Input
        className={cx(
          inputBaseClass,
          leftAdornment ? "pl-10" : "pl-4",
          rightAdornment ? "pr-10" : "pr-4",
          className
        )}
        {...props}
      />
    </div>
  );
}

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
      <p className="text-[11px] font-bold uppercase tracking-widest text-system-brand">
        YOUR DETAILS
      </p>
      <h2 className="mt-1 font-heading text-2xl font-bold tracking-heading text-text-primary lg:text-3xl mb-6 sm:mb-8">
        Your investment
      </h2>

      <div className="space-y-4">
        <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
          <FieldLabel className="lg:w-48 lg:shrink-0">
            Initial Investment Amount
          </FieldLabel>
          <Field className="min-w-0 flex-1">
            <InputWithAdornment
              type="number"
              min={0}
              placeholder="0"
              value={initial || ""}
              onChange={(e) => onInitialChange(Number(e.target.value) || 0)}
              leftAdornment={INVESTMENT_CURRENCY}
            />
          </Field>
        </div>

        <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
          <div className="lg:w-48 lg:shrink-0 space-y-0.5">
            <FieldLabel className="block">Monthly Contribution</FieldLabel>
            <span className="text-tiny text-text-tertiary">Optional</span>
          </div>
          <Field className="min-w-0 flex-1">
            <InputWithAdornment
              type="number"
              min={0}
              placeholder="0"
              value={monthly || ""}
              onChange={(e) => onMonthlyChange(Number(e.target.value) || 0)}
              leftAdornment={INVESTMENT_CURRENCY}
            />
          </Field>
        </div>

        <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
          <FieldLabel className="lg:w-48 lg:shrink-0">
            Estimated Rate of Return
          </FieldLabel>
          <Field className="min-w-0 flex-1">
            <InputWithAdornment
              type="number"
              min={0}
              max={100}
              step={0.1}
              placeholder="0"
              value={rate || ""}
              onChange={(e) => onRateChange(Number(e.target.value) || 0)}
              rightAdornment="%"
            />
          </Field>
        </div>

        <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
          <FieldLabel className="lg:w-48 lg:shrink-0">
            Years to Grow
          </FieldLabel>
          <Field className="min-w-0 flex-1">
            <InputWithAdornment
              type="number"
              min={1}
              max={100}
              placeholder="0"
              value={years || ""}
              onChange={(e) => onYearsChange(Number(e.target.value) || 0)}
              rightAdornment="yrs"
            />
          </Field>
        </div>
      </div>
    </div>
  );
}
