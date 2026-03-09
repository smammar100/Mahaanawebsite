"use client";

import { motion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { CallToAction1 } from "@/components/ui/call-to-action-1";
import { cx } from "@/utils/cx";
import { sectionFadeInUp, sectionViewport } from "@/lib/sectionMotion";

interface Cta6SectionProps {
  className?: string;
  headline?: React.ReactNode;
  badgeText?: string;
  ctaText?: string;
  ctaHref?: string;
}

export function Cta6Section({ className, headline, badgeText, ctaText, ctaHref }: Cta6SectionProps) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeInUp}
      className={cx(
        "overflow-x-hidden py-8 sm:py-12 lg:py-16",
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
    </motion.section>
  );
}
