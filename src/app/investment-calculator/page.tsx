import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";
import { InvestmentCalculator } from "@/components/investment/InvestmentCalculator";
import { Cta6Section } from "@/components/sections/Cta6Section";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Container } from "@/components/layout/Container";
import { H1, TextMedium } from "@/components/ui/Typography";

export const metadata: Metadata = buildPageMetadata({
  title: "Investment Calculator | Mahaana",
  description:
    "See how your money grows over time with compound return. Enter your details to project your future value.",
  path: "investment-calculator",
});

export default function InvestmentCalculatorPage() {
  return (
    <div className="bg-surface-bg">
      <AnimatedSection className="pt-12 pb-8 sm:pt-14 sm:pb-10">
        <Container className="text-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <H1 className="text-text-primary">
            Investment Calculator
          </H1>
          <TextMedium className="mx-auto mt-3 max-w-[520px] text-text-tertiary">
            See how your money grows over time with compound return. Enter
            your details to instantly project your future value.
          </TextMedium>
        </Container>
      </AnimatedSection>

      <AnimatedSection as="div" className="pt-0 pb-6">
        <InvestmentCalculator />
      </AnimatedSection>
      <Cta6Section />
    </div>
  );
}
