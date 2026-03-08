import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Container } from "@/components/layout/Container";
import { H1, TextRegular } from "@/components/ui/Typography";

export const metadata: Metadata = buildPageMetadata({
  title: "Investor Education | Mahaana",
  description: "Learn about investing, savings, and financial planning with Mahaana.",
  path: "investor-education",
});

export default function InvestorEducationPage() {
  return (
    <div className="bg-surface-bg">
      <AnimatedSection className="py-12 sm:py-16 lg:py-24">
        <Container>
          <H1 className="text-text-primary">Investor Education</H1>
          <TextRegular className="mt-4 max-w-prose text-text-secondary">
            Educational resources, articles, and guides to help you make informed
            investment decisions. Content will be added here.
          </TextRegular>
        </Container>
      </AnimatedSection>
    </div>
  );
}
