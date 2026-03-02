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
  const [currentAge, setCurrentAge] = useState(30);
  const [currentSavings, setCurrentSavings] = useState(20000);
  const [monthlyContrib, setMonthlyContrib] = useState(1000);
  const [annualSpending, setAnnualSpending] = useState(40000);
  const [lifeExpectancy, setLifeExpectancy] = useState(90);
  const [profileId, setProfileId] = useState("balanced");

  const result = useMemo<FIREResult>(
    () =>
      calculateFIRE({
        currentAge,
        currentSavings,
        monthlyContrib,
        annualSpending,
        lifeExpectancy,
        profileId,
      }),
    [
      currentAge,
      currentSavings,
      monthlyContrib,
      annualSpending,
      lifeExpectancy,
      profileId,
    ]
  );

  return (
    <Container className="max-w-[1080px]">
      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:gap-0 lg:rounded-2xl lg:border lg:border-surface-stroke lg:bg-surface-card lg:shadow-sm lg:overflow-hidden">
        <SituationCard
          className="lg:rounded-l-2xl lg:rounded-r-none lg:border-0 lg:border-r lg:border-surface-stroke"
          age={currentAge}
          onAgeChange={setCurrentAge}
          currentSavings={currentSavings}
          onCurrentSavingsChange={setCurrentSavings}
          monthlyContrib={monthlyContrib}
          onMonthlyContribChange={setMonthlyContrib}
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
            yearsToFire={result.yearsToFire}
            monthsToFire={result.monthsToFire}
            reachable={result.reachable}
            retirementAge={result.retirementAge}
          />
        </div>
        <ProjectionSection
          data={result.data}
          fireTarget={result.fireTarget}
          retirementAge={result.retirementAge}
          currentAge={currentAge}
          currentSavings={currentSavings}
          monthlyContrib={monthlyContrib}
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
