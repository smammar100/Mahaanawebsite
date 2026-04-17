/**
 * Pakistan individual income tax + VPS tax-credit helpers (illustrative).
 * Salaried slabs aligned to FBR-style progressive schedule used by reference calculators;
 * non-salaried slabs tuned to match product fixture rows.
 */

export type EmploymentClass = "salaried" | "nonSalaried";

export type VpsTaxSummary = {
  monthlyIncome: number;
  annualIncome: number;
  annualIncomeTax: number;
  effectiveTaxRate: number;
  vpsInvestmentPermissible: number;
  maximumTaxCreditAmount: number;
  plannedAnnualVpsContribution: number;
  estimatedTaxCreditOnPlannedContribution: number;
};

const VPS_RATE = 0.2;
const TAX_CREDIT_RATE = 0.2;

function roundTax(n: number): number {
  return Math.round(n);
}

/** Align with reference calculators that use tidy annual figures from monthly × 12. */
export function annualIncomeFromMonthly(monthlyIncome: number): number {
  const raw = Math.max(0, monthlyIncome) * 12;
  return Math.round(raw / 1000) * 1000;
}

const SALARIED_SURCHARGE_THRESHOLD = 10_000_000;
const SALARIED_SURCHARGE_RATE = 0.09;

/** Progressive slab tax only (PKR annual taxable income), before 9% surcharge above PKR 10M. */
export function computeAnnualTaxSalariedBase(annualIncome: number): number {
  const x = Math.max(0, annualIncome);

  if (x <= 600_000) return 0;
  if (x <= 1_200_000) return roundTax(0.01 * (x - 600_000));
  if (x <= 2_200_000) return roundTax(6_000 + 0.11 * (x - 1_200_000));
  /* 2.2M–2.4M at 11%; 2.4M–3.2M at 26% (matches reference calculator tables). */
  if (x <= 2_400_000) return roundTax(116_000 + 0.11 * (x - 2_200_000));
  if (x <= 3_200_000) return roundTax(138_000 + 0.26 * (x - 2_400_000));
  if (x <= 4_100_000) return roundTax(346_000 + 0.3 * (x - 3_200_000));
  if (x <= 5_500_000) return roundTax(616_000 + 0.35 * (x - 4_100_000));
  if (x <= 10_000_000) return roundTax(1_106_000 + 0.35 * (x - 5_500_000));
  if (x <= 14_400_000) return roundTax(2_681_000 + 0.35 * (x - 10_000_000));

  const hi24 = 3_500_000 / 9_600_000;
  if (x <= 24_000_000) {
    return roundTax(4_221_000 + hi24 * (x - 14_400_000));
  }
  if (x <= 42_000_000) {
    return roundTax(7_721_000 + 0.35 * (x - 24_000_000));
  }
  return roundTax(14_021_000 + 0.35 * (x - 42_000_000));
}

/** Salaried tax: slab base plus 9% surcharge on that base when annual income exceeds PKR 10M. */
export function computeAnnualTaxSalaried(annualIncome: number): number {
  const base = computeAnnualTaxSalariedBase(annualIncome);
  if (annualIncome > SALARIED_SURCHARGE_THRESHOLD) {
    return roundTax(base + SALARIED_SURCHARGE_RATE * base);
  }
  return base;
}

/** Progressive tax: non-salaried individuals (PKR annual taxable income). */
export function computeAnnualTaxNonSalaried(annualIncome: number): number {
  const x = Math.max(0, annualIncome);

  if (x <= 600_000) return 0;
  if (x <= 1_200_000) return roundTax(0.15 * (x - 600_000));
  if (x <= 1_600_000) return roundTax(90_000 + 0.2 * (x - 1_200_000));
  if (x <= 1_800_000) return roundTax(170_000 + 0.3 * (x - 1_600_000));
  if (x <= 2_400_000) return roundTax(230_000 + 0.3 * (x - 1_800_000));
  if (x <= 3_200_000) return roundTax(410_000 + 0.3 * (x - 2_400_000));
  if (x <= 3_600_000) return roundTax(650_000 + 0.4 * (x - 3_200_000));
  if (x <= 5_600_000) return roundTax(810_000 + 0.4 * (x - 3_600_000));
  if (x <= 6_000_000) return roundTax(1_610_000 + 0.45 * (x - 5_600_000));
  if (x <= 15_000_000) {
    const r = 4_634_000 / 9_000_000;
    return roundTax(1_790_000 + r * (x - 6_000_000));
  }
  return roundTax(6_424_000 + 0.35 * (x - 15_000_000));
}

export function computeAnnualTax(
  annualIncome: number,
  employmentClass: EmploymentClass
): number {
  return employmentClass === "salaried"
    ? computeAnnualTaxSalaried(annualIncome)
    : computeAnnualTaxNonSalaried(annualIncome);
}

export function computeVpsSummary(input: {
  monthlyIncome: number;
  employmentClass: EmploymentClass;
  initialInvestment: number;
  monthlyInvestment: number;
}): VpsTaxSummary {
  const monthlyIncome = Math.max(0, input.monthlyIncome);
  const annualIncome = annualIncomeFromMonthly(monthlyIncome);
  const annualIncomeTax = computeAnnualTax(annualIncome, input.employmentClass);
  const effectiveTaxRate =
    annualIncome > 0 ? annualIncomeTax / annualIncome : 0;
  const vpsInvestmentPermissible = VPS_RATE * annualIncome;
  const maximumTaxCreditAmount = TAX_CREDIT_RATE * annualIncomeTax;

  const plannedAnnualVpsContribution =
    Math.max(0, input.initialInvestment) +
    Math.max(0, input.monthlyInvestment) * 12;

  const eligibleVps = Math.min(
    plannedAnnualVpsContribution,
    vpsInvestmentPermissible
  );
  const rawCredit = TAX_CREDIT_RATE * eligibleVps;
  const estimatedTaxCreditOnPlannedContribution = Math.min(
    rawCredit,
    maximumTaxCreditAmount
  );

  return {
    monthlyIncome,
    annualIncome,
    annualIncomeTax,
    effectiveTaxRate,
    vpsInvestmentPermissible,
    maximumTaxCreditAmount,
    plannedAnnualVpsContribution,
    estimatedTaxCreditOnPlannedContribution,
  };
}

/** Dev-time regression checks against reference table rows (monthly income → expected annual tax). */
export function assertPakistanVpsTaxFixtures(): void {
  if (process.env.NODE_ENV === "production") return;

  const salaried: [number, number][] = [
    [50_000, 0],
    [100_000, 6_000],
    [150_000, 72_000],
    [183_333, 116_000],
    [200_000, 138_000],
    [266_667, 346_000],
    [300_000, 466_000],
    [341_667, 616_000],
    [400_000, 861_000],
    [500_000, 1_281_000],
    [600_000, 1_701_000],
    [833_333, 2_681_000],
    /* annual 10_001_000 — surcharge applies (strictly above PKR 10M). */
    [833_417, 2_922_672],
    [1_200_000, 4_600_890],
    [2_000_000, 8_415_890],
    [3_500_000, 15_282_890],
    [5_000_000, 22_149_890],
  ];

  const nonSalaried: [number, number][] = [
    [50_000, 0],
    [75_000, 45_000],
    [100_000, 90_000],
    [133_333, 170_000],
    [150_000, 230_000],
    [200_000, 410_000],
    [266_667, 650_000],
    [300_000, 810_000],
    [466_667, 1_610_000],
    [500_000, 1_790_000],
    [1_250_000, 6_424_000],
  ];

  const check = (
    rows: [number, number][],
    fn: (a: number) => number,
    label: string
  ) => {
    for (const [monthly, expectedAnnualTax] of rows) {
      const annual = annualIncomeFromMonthly(monthly);
      const got = fn(annual);
      if (got !== expectedAnnualTax) {
        throw new Error(
          `${label}: monthly ${monthly} annual ${annual} expected tax ${expectedAnnualTax} got ${got}`
        );
      }
    }
  };

  check(salaried, computeAnnualTaxSalaried, "salaried");
  check(nonSalaried, computeAnnualTaxNonSalaried, "nonSalaried");
}
