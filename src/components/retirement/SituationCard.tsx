"use client";

import type { ReactNode } from "react";
import { Input } from "@/components/ui/Input";
import { Tooltip, TooltipTrigger } from "@/components/base/tooltip/tooltip";
import { cleanCopy } from "@/lib/copy-utils";
import { INVESTMENT_CURRENCY } from "@/lib/investmentConfig";
import { FIRE_SEGMENT_COLORS } from "@/lib/fireDonut";
import { cx } from "@/utils/cx";

/** Fixed row height so all FIRE inputs align with prefixed rows (h-11 = 2.75rem). */
const INPUT_ROW =
  "flex h-11 w-full items-stretch overflow-hidden rounded-lg border border-surface-stroke bg-white shadow-xs ring-1 ring-surface-stroke ring-inset";

const numberInputClass =
  "h-full min-h-0 rounded-none border-0 py-0 text-small leading-normal shadow-none ring-0 focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

export interface FireContributionsColumnProps {
  className?: string;
  initial: number;
  onInitialChange: (v: number) => void;
  monthly: number;
  onMonthlyChange: (v: number) => void;
  age: number;
  onAgeChange: (v: number) => void;
}

export interface FireRetirementColumnProps {
  className?: string;
  annualSpending: number;
  onAnnualSpendingChange: (v: number) => void;
  lifeExpectancy: number;
  onLifeExpectancyChange: (v: number) => void;
}

function Dot({ color }: { color: string }) {
  return (
    <span
      className="mt-2 size-2 shrink-0 rounded-full"
      style={{ backgroundColor: color }}
      aria-hidden
    />
  );
}

function PrefixedNumberInput({
  prefix,
  value,
  onChange,
  min,
  max,
  step,
  placeholder,
}: {
  prefix: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
}) {
  return (
    <div className={INPUT_ROW}>
      <div className="flex h-full shrink-0 items-center border-r border-surface-stroke bg-surface-card px-2.5 text-tiny font-medium text-text-tertiary">
        {prefix}
      </div>
      <Input
        type="number"
        min={min}
        max={max}
        step={step}
        placeholder={placeholder}
        value={String(value ?? "")}
        onChange={(v) => onChange(Number(v) || 0)}
        className={cx(numberInputClass, "min-w-0 flex-1")}
        wrapperClassName="flex h-full min-h-0 min-w-0 flex-1 items-center border-0 shadow-none ring-0 rounded-none"
      />
    </div>
  );
}

function FieldBlock({
  dotColor,
  label,
  tooltip,
  children,
}: {
  dotColor: string;
  label: string;
  tooltip?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex gap-2.5">
      <Dot color={dotColor} />
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-center gap-1">
          <span className="text-tiny font-medium text-text-primary">
            {cleanCopy(label)}
          </span>
          {tooltip != null && (
            <Tooltip title={tooltip} description={undefined}>
              <TooltipTrigger className="inline-flex cursor-help text-text-tertiary hover:text-text-secondary">
                <span className="text-body-xs" aria-hidden>
                  ?
                </span>
              </TooltipTrigger>
            </Tooltip>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}

export function FireContributionsColumn({
  className,
  initial,
  onInitialChange,
  monthly,
  onMonthlyChange,
  age,
  onAgeChange,
}: FireContributionsColumnProps) {
  return (
    <section className={cx("min-w-0", className)}>
      <p className="text-[10px] font-semibold uppercase tracking-wider text-text-tertiary">
        {cleanCopy("Your savings")}
      </p>
      <h2 className="mt-1 font-heading text-base font-semibold text-text-primary">
        {cleanCopy("Contributions")}
      </h2>
      <div className="mt-5 space-y-5">
        <FieldBlock
          dotColor={FIRE_SEGMENT_COLORS.startingCapital}
          label={`Starting balance (${INVESTMENT_CURRENCY})`}
        >
          <PrefixedNumberInput
            prefix={INVESTMENT_CURRENCY}
            min={0}
            placeholder="0"
            value={initial}
            onChange={onInitialChange}
          />
        </FieldBlock>
        <FieldBlock
          dotColor={FIRE_SEGMENT_COLORS.contributions}
          label={`Monthly contribution (${INVESTMENT_CURRENCY})`}
          tooltip={cleanCopy("Optional. Added every month until you reach FIRE.")}
        >
          <PrefixedNumberInput
            prefix={INVESTMENT_CURRENCY}
            min={0}
            placeholder="0"
            value={monthly}
            onChange={onMonthlyChange}
          />
        </FieldBlock>
        <FieldBlock dotColor={FIRE_SEGMENT_COLORS.growth} label="Current age">
          <PrefixedNumberInput
            prefix={cleanCopy("Age")}
            min={18}
            max={80}
            value={age}
            onChange={onAgeChange}
          />
        </FieldBlock>
      </div>
    </section>
  );
}

export function FireRetirementColumn({
  className,
  annualSpending,
  onAnnualSpendingChange,
  lifeExpectancy,
  onLifeExpectancyChange,
}: FireRetirementColumnProps) {
  return (
    <section className={cx("min-w-0", className)}>
      <p className="text-[10px] font-semibold uppercase tracking-wider text-text-tertiary">
        {cleanCopy("Retirement")}
      </p>
      <h2 className="mt-1 font-heading text-base font-semibold text-text-primary">
        {cleanCopy("Your spending and horizon")}
      </h2>
      <div className="mt-5 space-y-5">
        <FieldBlock
          dotColor={FIRE_SEGMENT_COLORS.startingCapital}
          label={`Annual spending in retirement (${INVESTMENT_CURRENCY})`}
          tooltip={cleanCopy(
            "Expected yearly spending once retired, in today's money."
          )}
        >
          <PrefixedNumberInput
            prefix={INVESTMENT_CURRENCY}
            min={0}
            value={annualSpending}
            onChange={onAnnualSpendingChange}
          />
        </FieldBlock>
        <FieldBlock
          dotColor={FIRE_SEGMENT_COLORS.contributions}
          label="Life expectancy (years)"
          tooltip={cleanCopy("Used to estimate how large your FIRE pot needs to be.")}
        >
            <div className={INPUT_ROW}>
              <div className="flex h-full shrink-0 items-center border-r border-surface-stroke bg-surface-card px-2.5 text-tiny font-medium text-text-tertiary">
                yrs
              </div>
              <Input
                type="number"
                min={60}
                max={120}
                placeholder="90"
                value={String(lifeExpectancy ?? "")}
                onChange={(v) => onLifeExpectancyChange(Number(v) || 0)}
                className={cx(numberInputClass, "min-w-0 flex-1")}
                wrapperClassName="flex h-full min-h-0 min-w-0 flex-1 items-center border-0 shadow-none ring-0 rounded-none"
              />
            </div>
        </FieldBlock>
      </div>
    </section>
  );
}
