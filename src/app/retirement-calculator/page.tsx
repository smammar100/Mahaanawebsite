import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";
import { RetirementVpsCalculator } from "@/components/retirement/RetirementVpsCalculator";
import { Cta6Section } from "@/components/sections/Cta6Section";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Container } from "@/components/layout/Container";
import { H1, TextMedium } from "@/components/ui/Typography";

export const metadata: Metadata = buildPageMetadata({
  title: "Retirement Calculator | Mahaana",
  description:
    "Estimate Pakistan income tax, VPS investment limits, and illustrative tax credits on planned contributions. For education only—not tax or legal advice.",
  path: "retirement-calculator",
});

export default function RetirementCalculatorPage() {
  return (
    <div className="min-w-0 bg-surface-bg text-text-primary">
      <AnimatedSection className="section-y">
        <Container className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="mx-auto max-w-[760px] text-center">
            <H1 className="text-text-primary">Retirement calculator</H1>
            <TextMedium className="mx-auto mt-3 max-w-[620px] text-text-tertiary">
              Enter your income and planned voluntary pension (VPS) amounts to
              see illustrative tax and rebate-style figures based on simplified
              slabs.
            </TextMedium>
          </div>
        </Container>
      </AnimatedSection>

      <AnimatedSection as="div" className="pt-0 pb-10 sm:pb-12">
        <RetirementVpsCalculator />
      </AnimatedSection>
      <Cta6Section />
    </div>
  );
}
