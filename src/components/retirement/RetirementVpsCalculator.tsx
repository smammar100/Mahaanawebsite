"use client";

import { useState, type ReactNode } from "react";
import {
  computeVpsSummary,
  type EmploymentClass,
} from "@/lib/pakistanVpsTax";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/layout/Container";
import { TextTiny } from "@/components/ui/Typography";
import { cleanCopy } from "@/lib/copy-utils";
import { cx } from "@/utils/cx";

function formatPkr(value: number) {
  if (!Number.isFinite(value)) return "—";
  return `PKR ${Math.round(value).toLocaleString("en-PK")}`;
}

function formatPercent(rate: number) {
  if (!Number.isFinite(rate)) return "—";
  return `${(rate * 100).toFixed(2)}%`;
}

function SidebarInput({
  label,
  helperText,
  value,
  onChange,
  suffix,
  min = 0,
  step = 1,
  errorText,
}: {
  label: string;
  helperText?: string;
  value: number;
  onChange: (value: number) => void;
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

function ResultRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-0.5 border-b border-surface-stroke py-3 last:border-b-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
      <p className="text-body-sm text-text-tertiary">{cleanCopy(label)}</p>
      <p className="font-mono text-body font-semibold text-text-primary tabular-nums">
        {value}
      </p>
    </div>
  );
}

function EstimateSection({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("flex flex-col", className)}>
      <p className="text-body-sm font-semibold text-text-primary">
        {cleanCopy(title)}
      </p>
      <div className="mt-2 flex flex-col">{children}</div>
    </div>
  );
}

const CLASS_OPTIONS: { id: EmploymentClass; label: string }[] = [
  { id: "salaried", label: "Salaried" },
  { id: "nonSalaried", label: "Non-salaried" },
];

export interface RetirementVpsCalculatorProps {
  /** When true, renders only the card (no outer Container or page footer). Use inside another Container. */
  embedded?: boolean;
}

export function RetirementVpsCalculator({
  embedded = false,
}: RetirementVpsCalculatorProps) {
  const [employmentClass, setEmploymentClass] =
    useState<EmploymentClass>("salaried");
  const [monthlyIncome, setMonthlyIncome] = useState(100_000);
  const [initialInvestment, setInitialInvestment] = useState(0);
  const [monthlyInvestment, setMonthlyInvestment] = useState(25_000);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [incomeError, setIncomeError] = useState("");

  const handleCalculate = () => {
    if (monthlyIncome <= 0) {
      setIncomeError("Enter a monthly income greater than 0.");
      setHasCalculated(false);
      return;
    }
    setIncomeError("");
    setHasCalculated(true);
  };

  const summary = hasCalculated
    ? computeVpsSummary({
        monthlyIncome,
        employmentClass,
        initialInvestment,
        monthlyInvestment,
      })
    : null;

  const card = (
    <Card className="overflow-hidden rounded-2xl border border-surface-stroke bg-white shadow-sm">
      <div className="grid grid-cols-1 items-stretch lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="flex flex-col border-b border-surface-stroke bg-surface-card/50 p-5 sm:p-6 lg:border-r lg:border-b-0">
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-body-sm font-medium text-text-primary">
                {cleanCopy("Employment type")}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {CLASS_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setEmploymentClass(opt.id)}
                    className={cx(
                      "h-11 rounded-lg border px-2 text-body-sm font-medium transition-colors",
                      employmentClass === opt.id
                        ? "border-system-brand bg-system-brand/10 text-text-primary"
                        : "border-surface-stroke bg-white text-text-tertiary hover:border-text-tertiary/40"
                    )}
                  >
                    {cleanCopy(opt.label)}
                  </button>
                ))}
              </div>
            </div>

            <SidebarInput
              label="Monthly income"
              helperText="Gross monthly income (PKR)"
              value={monthlyIncome}
              onChange={setMonthlyIncome}
              suffix="PKR"
              errorText={incomeError}
            />
            <SidebarInput
              label="Initial investment"
              helperText="One-time amount toward VPS this year"
              value={initialInvestment}
              onChange={setInitialInvestment}
              suffix="PKR"
            />
            <SidebarInput
              label="Monthly investment"
              helperText="Ongoing monthly VPS contribution"
              value={monthlyInvestment}
              onChange={setMonthlyInvestment}
              suffix="PKR"
            />
            <Button
              type="button"
              onClick={handleCalculate}
              className="h-11 w-full rounded-lg bg-primary-200 font-semibold text-gray-100 shadow-sm ring-1 ring-primary-200/50 ring-inset hover:bg-primary-300"
            >
              {cleanCopy("Calculate")}
            </Button>
          </div>
        </aside>

        <section className="flex min-h-[420px] flex-col p-5 sm:p-6 lg:p-8">
          {!summary ? (
            <div className="flex flex-1 flex-col items-center justify-center px-1 text-center">
              <h2 className="text-h5 text-text-primary">
                {cleanCopy("Enter your details")}
              </h2>
              <p className="mt-2 max-w-md text-body text-text-tertiary">
                {cleanCopy(
                  "Choose employment type, add your income and planned VPS contributions to see illustrative tax and credit estimates."
                )}
              </p>
            </div>
          ) : (
            <div className="animate-fadeInUp flex flex-1 flex-col">
              <h2 className="text-h5 text-text-primary sm:text-h4">
                {cleanCopy("Your estimate")}
              </h2>
              <p className="mt-1.5 text-body-sm text-text-tertiary sm:mt-2">
                {cleanCopy(
                  "Figures are illustrative and based on simplified slabs. They are not tax or legal advice."
                )}
              </p>

              <div className="mt-4 flex flex-col gap-6">
                <EstimateSection title="Monthly">
                  <ResultRow
                    label="Income"
                    value={formatPkr(summary.monthlyIncome)}
                  />
                </EstimateSection>
                <EstimateSection title="Annual">
                  <ResultRow
                    label="Income"
                    value={formatPkr(summary.annualIncome)}
                  />
                  <ResultRow
                    label="Income tax"
                    value={formatPkr(summary.annualIncomeTax)}
                  />
                  <ResultRow
                    label="Effective tax rate"
                    value={formatPercent(summary.effectiveTaxRate)}
                  />
                  <ResultRow
                    label="VPS investment permissible for tax credit"
                    value={formatPkr(summary.vpsInvestmentPermissible)}
                  />
                  <ResultRow
                    label="Maximum tax credit amount"
                    value={formatPkr(summary.maximumTaxCreditAmount)}
                  />
                  <ResultRow
                    label="Planned VPS contribution (initial + 12 × monthly)"
                    value={formatPkr(summary.plannedAnnualVpsContribution)}
                  />
                  <ResultRow
                    label="Estimated tax credit on planned contribution"
                    value={formatPkr(
                      summary.estimatedTaxCreditOnPlannedContribution
                    )}
                  />
                </EstimateSection>
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
    <>
      <Container className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {card}
      </Container>
      <Container className="mt-4 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <TextTiny className="max-w-3xl text-text-tertiary">
          {cleanCopy(
            "Tax rules and rebate limits change with federal budgets and your personal situation. Mahaana does not provide tax, legal, or investment advice. Confirm details with a qualified adviser or the FBR."
          )}
        </TextTiny>
      </Container>
    </>
  );
}
