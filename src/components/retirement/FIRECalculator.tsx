"use client";

import { useMemo, useState } from "react";
import { calculateFIRE, type FIREResult } from "@/lib/calculations";
import { RISK_PROFILES } from "@/lib/riskProfiles";
import { Container } from "@/components/layout/Container";
import { ProjectionSection } from "./ProjectionSection";
import { ResultsBar } from "./ResultsBar";
import { SituationCard } from "./SituationCard";
import { StrategyCard } from "./StrategyCard";

export function FIRECalculator() {
  const [initial, setInitial] = useState(0);
  const [monthly, setMonthly] = useState(0);
  const [rate, setRate] = useState(0);
  const [years, setYears] = useState(0);
  const [currentAge, setCurrentAge] = useState(30);
  const [annualSpending, setAnnualSpending] = useState(0);
  const [lifeExpectancy, setLifeExpectancy] = useState(90);
  const [profileId, setProfileId] = useState("balanced");

  const result = useMemo<FIREResult>(
    () =>
      calculateFIRE({
        currentAge,
        currentSavings: initial,
        monthlyContrib: monthly,
        annualSpending,
        lifeExpectancy,
        profileId,
      }),
    [
      currentAge,
      initial,
      monthly,
      annualSpending,
      lifeExpectancy,
      profileId,
    ]
  );

  const hasData =
    (initial > 0 || monthly > 0) && annualSpending > 0;

  return (
    <Container className="max-w-[1080px]">
      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:gap-0 lg:rounded-2xl lg:border lg:border-surface-stroke lg:bg-surface-card lg:shadow-sm lg:overflow-hidden">
        <SituationCard
          className="lg:rounded-l-2xl lg:rounded-r-none lg:border-0 lg:border-r lg:border-surface-stroke"
          initial={initial}
          onInitialChange={setInitial}
          monthly={monthly}
          onMonthlyChange={setMonthly}
          rate={rate}
          onRateChange={setRate}
          years={years}
          onYearsChange={setYears}
          age={currentAge}
          onAgeChange={setCurrentAge}
          annualSpending={annualSpending}
          onAnnualSpendingChange={setAnnualSpending}
          lifeExpectancy={lifeExpectancy}
          onLifeExpectancyChange={setLifeExpectancy}
        />
        <StrategyCard
          className="lg:rounded-r-2xl lg:border-0"
          profiles={RISK_PROFILES}
          selectedId={profileId}
          onSelect={setProfileId}
        />
      </div>

      <div className="mt-4 space-y-4 pb-4">
        <div className="w-screen relative left-1/2 -translate-x-1/2">
          <ResultsBar
            hasData={hasData}
            yearsToFire={result.yearsToFire}
            monthsToFire={result.monthsToFire}
            reachable={result.reachable}
            retirementAge={result.retirementAge}
          />
        </div>
        <ProjectionSection
          hasData={hasData}
          data={result.data}
          fireTarget={result.fireTarget}
          retirementAge={result.retirementAge}
          currentAge={currentAge}
          currentSavings={initial}
          monthlyContrib={monthly}
          effectiveRate={result.effectiveRate}
        />
      </div>

      <p className="mt-0 pt-0 text-small text-text-tertiary">
        Returns used: Money Market 6% · Debt 8% · Equity 12%. Blended return is
        weighted by allocation. All projections are for illustrative purposes.
        This calculator is for educational purposes only and does not constitute
        financial advice.
      </p>
    </Container>
  );
}
