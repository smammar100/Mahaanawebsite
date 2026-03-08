import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Container } from "@/components/layout/Container";
import { H1, H2, TextRegular } from "@/components/ui/Typography";

export const metadata: Metadata = buildPageMetadata({
  title: "About Us | Mahaana",
  description:
    "Learn about Mahaana — Pakistan's leading SECP-licensed, Shariah-compliant investment platform. Our mission, team, and how we're changing the way Pakistanis invest.",
  path: "about",
});

export default function AboutUsPage() {
  return (
    <div className="-mt-[calc(4.5rem+env(safe-area-inset-top,0px))] bg-surface-bg">
      {/* Hero / intro */}
      <AnimatedSection className="py-12 sm:py-16 lg:py-24">
        <Container>
          <H1 className="text-text-primary">About Us</H1>
          <TextRegular className="mt-4 max-w-prose text-text-secondary">
            Mahaana is Pakistan&apos;s leading SECP-licensed, Shariah-compliant
            investment platform. We&apos;re changing the way Pakistanis invest —
            with transparency, security, and daily returns that work for you.
          </TextRegular>
        </Container>
      </AnimatedSection>

      {/* Mission & vision — add content here */}
      <AnimatedSection className="border-t border-surface-stroke py-12 sm:py-16 lg:py-24">
        <Container>
          <H2 className="text-text-primary">Our Mission</H2>
          <TextRegular className="mt-4 max-w-prose text-text-secondary">
            Placeholder: Add your mission and vision statement here.
          </TextRegular>
        </Container>
      </AnimatedSection>

      {/* Values / story — add content here */}
      <AnimatedSection className="border-t border-surface-stroke py-12 sm:py-16 lg:py-24">
        <Container>
          <H2 className="text-text-primary">Our Story</H2>
          <TextRegular className="mt-4 max-w-prose text-text-secondary">
            Placeholder: Add your company story, values, or team section here.
          </TextRegular>
        </Container>
      </AnimatedSection>
    </div>
  );
}
