import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";
import { InvestmentCalculator } from "@/components/investment/InvestmentCalculator";

export const metadata: Metadata = buildPageMetadata({
  title: "Savings Calculator | Mahaana",
  description:
    "Plan your savings with compound projections. Adjust your inputs to instantly see expected future value, contributions, and returns.",
  path: "investment-calculator",
});

export default function InvestmentCalculatorPage() {
  return <InvestmentCalculator />;
}
