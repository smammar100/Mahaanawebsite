import type { Metadata } from "next";
import { InvestmentCalculator } from "@/components/investment/InvestmentCalculator";
import { Cta6Section } from "@/components/sections/Cta6Section";
import { Container } from "@/components/layout/Container";
import { H1, TextMedium } from "@/components/ui/Typography";

export const metadata: Metadata = {
  title: "Investment Calculator | Mahaana",
  description:
    "See how your money grows over time with compound return. Enter your details to project your future value.",
};

export default function InvestmentCalculatorPage() {
  return (
    <div className="bg-surface-bg">
      <section className="pt-12 pb-8 sm:pt-14 sm:pb-10">
        <Container className="text-center">
          <H1
            className="text-text-primary text-[28px] sm:text-[36px] lg:text-[48px]"
            weight="extrabold"
          >
            Investment Calculator
          </H1>
          <TextMedium className="mx-auto mt-3 max-w-[520px] text-text-secondary leading-[1.65]">
            See how your money grows over time with compound return. Enter
            your details to instantly project your future value.
          </TextMedium>
        </Container>
      </section>

      <div className="pt-0 pb-6">
        <InvestmentCalculator />
      </div>
      <Cta6Section />
    </div>
  );
}
