"use client";

import { motion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { CallToAction1 } from "@/components/ui/call-to-action-1";
import { cx } from "@/utils/cx";
import { sectionFadeInUp, sectionViewport } from "@/lib/sectionMotion";

interface Cta6SectionProps {
  className?: string;
}

export function Cta6Section({ className }: Cta6SectionProps) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeInUp}
      className={cx(
        "overflow-x-hidden pt-16 pb-16",
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
    </motion.section>
  );
}
