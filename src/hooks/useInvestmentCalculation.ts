"use client";

import { useMemo } from "react";

export interface InvestmentInputs {
  initial: number;
  monthly: number;
  rate: number;
  years: number;
}

export interface YearlySnapshot {
  year: number;
  portfolio: number;
  invested: number;
  interest: number;
  annualGrowth: number;
}

export interface InvestmentResult {
  futureValue: number;
  totalContribs: number;
  totalInvested: number;
  interestEarned: number;
  growthPercent: number;
  yearlyData: YearlySnapshot[];
  hasData: boolean;
}

export function useInvestmentCalculation(
  inputs: InvestmentInputs
): InvestmentResult {
  return useMemo(() => {
    const { initial, monthly, rate, years } = inputs;
    const monthlyRate = rate / 100 / 12;
    const months = Math.max(0, Math.floor(years) * 12);
    const yearlyData: YearlySnapshot[] = [];

    let portfolio = initial;
    let cumContribs = 0;

    yearlyData.push({
      year: 0,
      portfolio: initial,
      invested: initial,
      interest: 0,
      annualGrowth: 0,
    });

    for (let m = 1; m <= months; m++) {
      const growth = portfolio * monthlyRate;
      portfolio = portfolio + growth + monthly;
      cumContribs += monthly;

      if (m % 12 === 0) {
        const y = m / 12;
        const totalInvested = initial + cumContribs;
        const interest = portfolio - totalInvested;
        const prevPortfolio = yearlyData[yearlyData.length - 1].portfolio;
        yearlyData.push({
          year: y,
          portfolio,
          invested: totalInvested,
          interest,
          annualGrowth: portfolio - prevPortfolio,
        });
      }
    }

    const futureValue = portfolio;
    const totalContribs = monthly * months;
    const totalInvested = initial + totalContribs;
    const interestEarned = futureValue - totalInvested;
    const growthPercent =
      totalInvested > 0 ? (interestEarned / totalInvested) * 100 : 0;
    const hasData =
      (initial > 0 || monthly > 0) && years > 0 && months > 0;

    return {
      futureValue,
      totalContribs,
      totalInvested,
      interestEarned,
      growthPercent,
      yearlyData,
      hasData,
    };
  }, [
    inputs.initial,
    inputs.monthly,
    inputs.rate,
    inputs.years,
  ]);
}
