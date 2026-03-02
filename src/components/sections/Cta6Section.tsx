"use client";

import { Container } from "@/components/layout/Container";
import { CallToAction1 } from "@/components/ui/call-to-action-1";
import { cx } from "@/utils/cx";

interface Cta6SectionProps {
  className?: string;
}

export function Cta6Section({ className }: Cta6SectionProps) {
  return (
    <section
      className={cx(
        "overflow-x-hidden py-6",
        className
      )}
    >
      <Container>
        <CallToAction1
          badgeText="Join community of 20K+ investors"
          headline={
            <>
              We're changing the way Pakistanis Save
              <br className="hidden md:block" />
              & Invest every day
            </>
          }
        />
      </Container>
    </section>
  );
}
