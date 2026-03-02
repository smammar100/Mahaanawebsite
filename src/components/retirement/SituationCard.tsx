"use client";

import { Input } from "@/components/ui/Input";
import { H4, TextSmall } from "@/components/ui/Typography";
import { SliderInput } from "./SliderInput";
import { Tooltip, TooltipTrigger } from "@/components/base/tooltip/tooltip";
import { cx } from "@/utils/cx";

interface SituationCardProps {
  className?: string;
  age: number;
  onAgeChange: (v: number) => void;
  currentSavings: number;
  onCurrentSavingsChange: (v: number) => void;
  monthlyContrib: number;
  onMonthlyContribChange: (v: number) => void;
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
  age,
  onAgeChange,
  currentSavings,
  onCurrentSavingsChange,
  monthlyContrib,
  onMonthlyContribChange,
  annualSpending,
  onAnnualSpendingChange,
  lifeExpectancy,
  onLifeExpectancyChange,
}: SituationCardProps) {
  return (
    <div
      className={cx(
        "rounded-2xl border border-surface-stroke bg-surface-card p-8 md:p-10",
        className
      )}
    >
      <p className="text-[11px] font-bold uppercase tracking-widest text-system-brand">
        TODAY
      </p>
      <H4 className="mt-1 font-bold text-text-primary">Your situation</H4>

      <div className="mt-6 space-y-4">
        <FieldRow label="Age">
          <Input
            type="number"
            min={18}
            max={80}
            value={age || ""}
            onChange={(e) => onAgeChange(Number(e.target.value) || 0)}
          />
        </FieldRow>
        <FieldRow
          label="Current savings"
          tooltip="Total amount you have saved or invested today."
        >
          <Input
            type="number"
            min={0}
            value={currentSavings || ""}
            onChange={(e) =>
              onCurrentSavingsChange(Number(e.target.value) || 0)
            }
          />
        </FieldRow>
        <FieldRow
          label="Saving monthly"
          tooltip="Amount you contribute to savings or investments each month."
        >
          <Input
            type="number"
            min={0}
            value={monthlyContrib || ""}
            onChange={(e) =>
              onMonthlyContribChange(Number(e.target.value) || 0)
            }
          />
        </FieldRow>
      </div>

      <div className="mt-4 border-t border-surface-stroke pt-4">
        <p className="text-tiny uppercase tracking-wider text-text-tertiary">
          RETIREMENT
        </p>
        <div className="mt-4 space-y-4">
          <FieldRow
            label="Annual spending"
            tooltip="Expected annual spending in retirement (today's value)."
          >
            <Input
              type="number"
              min={0}
              value={annualSpending || ""}
              onChange={(e) =>
                onAnnualSpendingChange(Number(e.target.value) || 0)
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
