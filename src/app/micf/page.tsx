import type { Metadata } from "next";
import { Cta6Section } from "@/components/sections/Cta6Section";
import { FundHero } from "@/components/sections/FundHero";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Container } from "@/components/layout/Container";
import { TextMedium } from "@/components/ui/Typography";

export const metadata: Metadata = {
  title: "MICF | Mahaana Islamic Cash Fund | Mahaana",
  description:
    "Mahaana Islamic Cash Fund (MICF). Shariah-compliant cash fund for short-term liquidity and stable returns.",
};

export default function MICFPage() {
  return (
    <div className="bg-surface-bg">
      <FundHero
        shortTitle="MICF"
        fullTitle="Mahaana Islamic Cash Fund"
        ctaLabel="Open investment account"
        ctaHref="#open-account"
        showPartners={true}
      />

      <AnimatedSection as="div" className="pt-0 pb-6">
        <Container className="px-4 sm:px-6 md:px-8 lg:px-16">
          <p className="mx-auto max-w-prose text-center text-text-secondary">
            MICF is a Shariah-compliant cash fund designed for short-term
            liquidity and stable returns. Fund details and key information will
            be added here.
          </p>
        </Container>
      </AnimatedSection>

      <Cta6Section />
    </div>
  );
}
