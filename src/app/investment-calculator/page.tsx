import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";
import { InvestmentCalculator } from "@/components/investment/InvestmentCalculator";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Container } from "@/components/layout/Container";
import { H1, TextMedium } from "@/components/ui/Typography";
import { Cta6Section } from "@/components/sections/Cta6Section";

export const metadata: Metadata = buildPageMetadata({
  title: "Savings Calculator | Mahaana",
  description:
    "Plan your savings with compound projections. Adjust your inputs to instantly see expected future value, contributions, and returns.",
  path: "investment-calculator",
});

export default function InvestmentCalculatorPage() {
  return (
    <div className="bg-surface-bg">
      <AnimatedSection className="pt-10 pb-6 sm:pt-12 sm:pb-8">
        <Container className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="mx-auto max-w-[760px] text-center">
            <H1 className="text-text-primary">Savings Calculator</H1>
            <TextMedium className="mx-auto mt-3 max-w-[620px] text-text-tertiary">
              Plan your contributions and see how your savings may grow over time
              with compound returns.
            </TextMedium>
          </div>
        </Container>
      </AnimatedSection>

      <AnimatedSection as="div" className="pt-0 pb-10 sm:pb-12">
        <InvestmentCalculator />
      </AnimatedSection>
      <Cta6Section />
    </div>
  );
}
