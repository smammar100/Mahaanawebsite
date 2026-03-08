import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Container } from "@/components/layout/Container";
import { H1, TextRegular } from "@/components/ui/Typography";

export const metadata: Metadata = buildPageMetadata({
  title: "Careers | Mahaana",
  description: "Join the Mahaana team. Explore career opportunities.",
  path: "careers",
});

export default function CareersPage() {
  return (
    <div className="bg-surface-bg">
      <AnimatedSection className="py-12 sm:py-16 lg:py-24">
        <Container>
          <H1 className="text-text-primary">Careers</H1>
          <TextRegular className="mt-4 max-w-prose text-text-secondary">
            Join us at Mahaana. This page will list open positions and information
            about working at Mahaana.
          </TextRegular>
        </Container>
      </AnimatedSection>
    </div>
  );
}
