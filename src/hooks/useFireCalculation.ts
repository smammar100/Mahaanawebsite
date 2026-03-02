"use client";

import { useMemo } from "react";
import { calculateFIRE, type FIREResult } from "@/lib/calculations";

export interface FireInputs {
  age: number;
  currentSavings: number;
  monthlyContrib: number;
  annualSpending: number;
  lifeExpectancy: number;
  profileId: string;
}

export interface FireResult extends FIREResult {
  yearsToFire: number | null;
  monthsToFire: number | null;
  reachable: boolean;
  effectiveRate: number;
}

export function useFireCalculation(inputs: FireInputs): FireResult {
  return useMemo(
    () =>
      calculateFIRE({
        currentAge: inputs.age,
        currentSavings: inputs.currentSavings,
        monthlyContrib: inputs.monthlyContrib,
        annualSpending: inputs.annualSpending,
        lifeExpectancy: inputs.lifeExpectancy,
        profileId: inputs.profileId,
      }),
    [
      inputs.age,
      inputs.currentSavings,
      inputs.monthlyContrib,
      inputs.annualSpending,
      inputs.lifeExpectancy,
      inputs.profileId,
    ]
  );
}
