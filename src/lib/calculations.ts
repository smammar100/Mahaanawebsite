import {
  RISK_PROFILES,
  blendedReturn,
  type AssetAllocation,
} from "./riskProfiles";

export type FIREInputs = {
  currentAge: number;
  currentSavings: number;
  monthlyContrib: number;
  annualSpending: number;
  lifeExpectancy: number;
  profileId: string;
};

export type ProjectionRow = {
  year: number;
  age: number;
  portfolio: number;
  contributions: number;
  growth: number;
};

export type FIREResult = {
  fireTarget: number;
  retirementAge: number | null;
  annualSavings: number;
  data: ProjectionRow[];
  /** Whole years until FIRE (when reachable). */
  yearsToFire: number | null;
  /** Remainder months until FIRE (0–11, when reachable). */
  monthsToFire: number | null;
  /** True when portfolio is projected to reach fireTarget. */
  reachable: boolean;
  /** Blended annual return (0–1). */
  effectiveRate: number;
};

function round(n: number): number {
  return Math.round(n);
}

export function calculateFIRE(inputs: FIREInputs): FIREResult {
  const profile = RISK_PROFILES.find((p) => p.id === inputs.profileId);
  const alloc: AssetAllocation = profile?.alloc ?? {
    moneymarket: 0.4,
    debt: 0.3,
    equity: 0.3,
  };

  const annualRate = blendedReturn(alloc) / 100;
  const monthlyRate =
    Math.pow(1 + annualRate, 1 / 12) - 1;

  const n = Math.max(1, inputs.lifeExpectancy - inputs.currentAge);

  let fireTarget: number;
  if (Math.abs(annualRate) < 1e-9) {
    fireTarget = inputs.annualSpending * n;
  } else {
    fireTarget =
      inputs.annualSpending *
      ((1 - Math.pow(1 + annualRate, -n)) / annualRate);
  }

  fireTarget = round(fireTarget);

  const data: ProjectionRow[] = [];
  let portfolio = inputs.currentSavings;
  let contributionsCumul = inputs.currentSavings;
  let retirementAge: number | null =
    inputs.currentSavings >= fireTarget ? inputs.currentAge : null;
  let totalMonths = 0;
  const maxYears = 60;

  for (let year = 0; year <= maxYears; year++) {
    const monthsThisYear = year === 0 ? 0 : 12;
    for (let m = 0; m < monthsThisYear; m++) {
      portfolio = portfolio * (1 + monthlyRate) + inputs.monthlyContrib;
      contributionsCumul += inputs.monthlyContrib;
      totalMonths++;

      if (retirementAge === null && portfolio >= fireTarget) {
        retirementAge = inputs.currentAge + totalMonths / 12;
      }
    }

    const growth = round(portfolio - contributionsCumul);
    data.push({
      year,
      age: inputs.currentAge + year,
      portfolio: round(portfolio),
      contributions: round(contributionsCumul),
      growth,
    });
  }

  const reachable = retirementAge !== null;
  let yearsToFire: number | null = null;
  let monthsToFire: number | null = null;
  if (retirementAge !== null) {
    const totalYears = retirementAge - inputs.currentAge;
    yearsToFire = Math.floor(totalYears);
    monthsToFire = Math.round((totalYears % 1) * 12);
    if (monthsToFire >= 12) {
      monthsToFire = 0;
      yearsToFire = (yearsToFire ?? 0) + 1;
    }
  }

  return {
    fireTarget,
    retirementAge,
    annualSavings: inputs.monthlyContrib * 12,
    data,
    yearsToFire,
    monthsToFire,
    reachable,
    effectiveRate: annualRate,
  };
}
