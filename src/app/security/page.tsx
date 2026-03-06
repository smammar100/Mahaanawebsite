import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Container } from "@/components/layout/Container";
import { H1, TextRegular } from "@/components/ui/Typography";

export const metadata = {
  title: "Security | Mahaana",
  description: "Learn about Mahaana security practices and how we protect your data.",
};

export default function SecurityPage() {
  return (
    <div className="bg-surface-bg">
      <AnimatedSection className="py-12 sm:py-16 lg:py-24">
        <Container>
          <H1 className="text-text-primary">Security</H1>
          <TextRegular className="mt-4 max-w-prose text-text-secondary">
            Your security is our priority. This page will contain information about
            our security practices, compliance, and how we protect your account and data.
          </TextRegular>
        </Container>
      </AnimatedSection>
    </div>
  );
}
