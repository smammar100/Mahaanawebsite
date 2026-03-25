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
    <div className="bg-surface-bg">
      {/* Section 1 — Hero */}
      <AnimatedSection className="pt-[52px] pb-9">
        <Container className="text-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <H1 className="text-text-primary">
            FIRE calculator
          </H1>
          <TextMedium className="mx-auto mt-3 max-w-[540px] text-text-tertiary">
            FIRE stands for Financial Independence Retire Early. Work out the
            investment and savings strategy to help you retire years earlier than
            expected.
          </TextMedium>
        </Container>
      </AnimatedSection>

      <AnimatedSection as="div" className="pt-0 pb-6">
        <FIRECalculator />
      </AnimatedSection>
      <Cta6Section />
    </div>
  );
}
