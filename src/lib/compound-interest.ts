/**
 * Compound growth with monthly compounding and monthly contributions.
 */

export interface CompoundYearSnapshot {
  year: number;
  balance: number;
  /** Cumulative principal deposited by user (initial + all contributions). */
  cumulativeContributed: number;
}

export interface CompoundProjectionInput {
  initial: number;
  /** Amount contributed each month. */
  contribution: number;
  /** Annual percentage rate; must be > 0 for meaningful projection. */
  annualRatePercent: number;
  wholeYears: number;
}

/**
 * Year-end snapshots: year 0 = after initial deposit only; year k = after k full years.
 */
export function computeCompoundProjection(
  input: CompoundProjectionInput
): CompoundYearSnapshot[] {
  const { initial, contribution, annualRatePercent, wholeYears } = input;

  const years = Math.max(0, Math.floor(wholeYears));
  const months = years * 12;
  const monthlyRate = annualRatePercent / 100 / 12;

  if (
    !Number.isFinite(monthlyRate) ||
    annualRatePercent <= 0 ||
    months < 0
  ) {
    return [];
  }

  let balance = Math.max(0, initial);
  let cumulativeContributed = Math.max(0, initial);

  const out: CompoundYearSnapshot[] = [
    {
      year: 0,
      balance,
      cumulativeContributed,
    },
  ];

  if (months === 0) {
    return out;
  }

  for (let m = 1; m <= months; m++) {
    balance *= 1 + monthlyRate;

    const added = Math.max(0, contribution);
    balance += added;
    cumulativeContributed += added;

    if (m % 12 === 0) {
      const y = m / 12;
      out.push({
        year: y,
        balance,
        cumulativeContributed,
      });
    }
  }

  return out;
}
