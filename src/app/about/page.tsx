import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Container } from "@/components/layout/Container";
import { H1, TextRegular } from "@/components/ui/Typography";

export const metadata: Metadata = buildPageMetadata({
  title: "About | Mahaana",
  description:
    "Learn about Mahaana — Pakistan's leading SECP-licensed, Shariah-compliant investment platform. Our mission, team, and how we're changing the way Pakistanis invest.",
  path: "about",
});

export default function About() {
  return (
    <div className="bg-surface-bg">
      <AnimatedSection className="py-12 sm:py-16 lg:py-24">
        <Container>
          <H1 className="text-text-primary">About Mahaana</H1>
          <TextRegular className="mt-4 max-w-prose text-text-secondary">
            This is the About page. Built with Next.js App Router, Tailwind CSS
            v4, and custom design tokens.
          </TextRegular>
        </Container>
      </AnimatedSection>
    </div>
  );
}
