import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";
import { FIRECalculator } from "@/components/retirement/FIRECalculator";
import { Cta6Section } from "@/components/sections/Cta6Section";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Container } from "@/components/layout/Container";
import { H1, TextMedium } from "@/components/ui/Typography";

export const metadata: Metadata = buildPageMetadata({
  title: "Retirement Calculator | Mahaana",
  description:
    "Calculate your path to Financial Independence, Retire Early (FIRE) with our free FIRE calculator. Plan your retirement savings and track your progress.",
  path: "retirement-calculator",
});

export default function RetirementCalculatorPage() {
  return (
    <div className="retirement-calc-light-scope min-w-0 bg-[var(--color-surface-bg)] text-text-primary">
      <AnimatedSection className="section-y">
        <Container className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <H1 className="text-center text-xl font-semibold tracking-tight text-text-primary sm:text-2xl md:text-[1.75rem]">
            FIRE calculator
          </H1>
          <TextMedium className="mx-auto mt-2 max-w-[520px] text-center text-text-tertiary">
            Plan savings and spending to see when you could reach financial
            independence—illustrative projections only.
          </TextMedium>
        </Container>
      </AnimatedSection>

      <AnimatedSection as="div" className="pt-0 pb-8 sm:pb-10">
        <FIRECalculator />
      </AnimatedSection>
      <Cta6Section />
    </div>
  );
}
