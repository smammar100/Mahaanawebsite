"use client";

import { useMemo } from "react";
import {
  computeCompoundProjection,
  type CompoundProjectionInput,
  type CompoundYearSnapshot,
} from "@/lib/compound-interest";

export type { CompoundYearSnapshot };

export interface UseCompoundInterestProjectionArgs {
  initial: number;
  /** Monthly contribution amount. */
  contribution: number;
  /** Null or <= 0 means no projection. */
  annualRatePercent: number | null;
  wholeYears: number;
}

export interface UseCompoundInterestProjectionResult {
  snapshots: CompoundYearSnapshot[];
  futureBalance: number;
  /** True when rate is valid and we have at least year 0. */
  hasProjection: boolean;
}

export function useCompoundInterestProjection(
  args: UseCompoundInterestProjectionArgs
): UseCompoundInterestProjectionResult {
  const { initial, contribution, annualRatePercent, wholeYears } = args;

  return useMemo(() => {
    const rate =
      annualRatePercent != null && Number.isFinite(annualRatePercent)
        ? annualRatePercent
        : 0;

    if (rate <= 0) {
      return {
        snapshots: [],
        futureBalance: 0,
        hasProjection: false,
      };
    }

    const input: CompoundProjectionInput = {
      initial,
      contribution,
      annualRatePercent: rate,
      wholeYears,
    };

    const snapshots = computeCompoundProjection(input);
    const last = snapshots[snapshots.length - 1];
    const futureBalance = last?.balance ?? 0;

    return {
      snapshots,
      futureBalance,
      hasProjection: snapshots.length > 0,
    };
  }, [initial, contribution, annualRatePercent, wholeYears]);
}
