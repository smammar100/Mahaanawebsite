import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Container } from "@/components/layout/Container";
import { H1, TextRegular } from "@/components/ui/Typography";

export const metadata = {
  title: "Reviews | Mahaana",
  description: "See what our users say about Mahaana.",
};

export default function ReviewsPage() {
  return (
    <div className="bg-surface-bg">
      <AnimatedSection className="py-12 sm:py-16 lg:py-24">
        <Container>
          <H1 className="text-text-primary">Reviews</H1>
          <TextRegular className="mt-4 max-w-prose text-text-secondary">
            Customer reviews and testimonials will be featured here.
          </TextRegular>
        </Container>
      </AnimatedSection>
    </div>
  );
}
