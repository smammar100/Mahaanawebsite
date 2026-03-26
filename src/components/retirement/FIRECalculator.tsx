"use client";

import { useMemo, useState } from "react";
import { calculateFIRE, type FIREResult } from "@/lib/calculations";
import { RISK_PROFILES } from "@/lib/riskProfiles";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import {
  FireContributionsColumn,
  FireRetirementColumn,
} from "./SituationCard";
import { StrategyCard } from "./StrategyCard";
import { FireDonutSummary } from "./FireDonutSummary";
import { cleanCopy } from "@/lib/copy-utils";

export function FIRECalculator() {
  const [initial, setInitial] = useState(0);
  const [monthly, setMonthly] = useState(0);
  const [currentAge, setCurrentAge] = useState(30);
  const [annualSpending, setAnnualSpending] = useState(0);
  const [lifeExpectancy, setLifeExpectancy] = useState(90);
  const [profileId, setProfileId] = useState("balanced");
  const [hasCalculated, setHasCalculated] = useState(false);

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
    [currentAge, initial, monthly, annualSpending, lifeExpectancy, profileId]
  );

  const hasData =
    (initial > 0 || monthly > 0) && annualSpending > 0;

  const showResults = hasCalculated && hasData;

  return (
    <Container>
      <div className="overflow-hidden rounded-2xl border border-surface-stroke bg-white shadow-[0_24px_48px_-12px_rgba(1,1,9,0.12)]">
        <div className="grid grid-cols-1 divide-y divide-surface-stroke bg-surface-card lg:grid-cols-3 lg:divide-x lg:divide-y-0">
          <div className="min-w-0 p-5 sm:p-6">
            <FireContributionsColumn
              initial={initial}
              onInitialChange={setInitial}
              monthly={monthly}
              onMonthlyChange={setMonthly}
              age={currentAge}
              onAgeChange={setCurrentAge}
            />
          </div>
          <div className="min-w-0 p-5 sm:p-6">
            <FireRetirementColumn
              annualSpending={annualSpending}
              onAnnualSpendingChange={setAnnualSpending}
              lifeExpectancy={lifeExpectancy}
              onLifeExpectancyChange={setLifeExpectancy}
            />
          </div>
          <div className="flex min-w-0 flex-col p-5 sm:p-6">
            <StrategyCard
              profiles={RISK_PROFILES}
              selectedId={profileId}
              onSelect={setProfileId}
            />
            <div className="mt-8">
              <Button
                type="button"
                size="lg"
                onClick={() => setHasCalculated(true)}
                className="w-full rounded-xl border-0 bg-primary-200 font-semibold text-white shadow-sm hover:bg-primary-300"
              >
                {hasCalculated
                  ? cleanCopy("Update my plan")
                  : cleanCopy("See my plan")}
              </Button>
            </div>
          </div>
        </div>

        <FireDonutSummary
          hasCalculated={hasCalculated}
          hasData={hasData}
          showResults={showResults}
          result={result}
          currentSavings={initial}
          monthlyContrib={monthly}
          currentAge={currentAge}
        />
      </div>
    </Container>
  );
}
