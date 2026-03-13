"use client";

import { Container } from "@/components/layout/Container";
import { CallToAction1 } from "@/components/ui/call-to-action-1";
import { useInView } from "@/hooks/useInView";
import { cx } from "@/utils/cx";

interface Cta6SectionProps {
  className?: string;
  headline?: React.ReactNode;
  badgeText?: string;
  ctaText?: string;
  ctaHref?: string;
}

export function Cta6Section({ className, headline, badgeText, ctaText, ctaHref }: Cta6SectionProps) {
  const { ref, isVisible } = useInView(0.15);
  return (
    <section
      ref={ref}
      className={cx(
        "section-fade-in-up min-w-0 overflow-x-visible py-8 sm:py-10 md:py-12 lg:py-14 xl:py-16",
        isVisible && "visible",
        className
      )}
    >
      <Container>
        <CallToAction1
          badgeText={badgeText}
          headline={headline}
          ctaText={ctaText}
          ctaHref={ctaHref}
        />
      </Container>
    </section>
  );
}
