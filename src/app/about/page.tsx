import { Container } from "@/components/layout/Container";
import { H1, TextRegular } from "@/components/ui/Typography";

export default function About() {
  return (
    <div className="bg-surface-bg">
      <section className="py-12 sm:py-16 lg:py-24">
        <Container>
          <H1 className="text-text-primary">About Mahaana</H1>
          <TextRegular className="mt-4 max-w-prose text-text-secondary">
            This is the About page. Built with Next.js App Router, Tailwind CSS
            v4, and custom design tokens.
          </TextRegular>
        </Container>
      </section>
    </div>
  );
}
