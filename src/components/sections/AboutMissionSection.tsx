"use client";

import { motion } from "motion/react";
import { Container } from "@/components/layout/Container";
import BlurText from "@/components/ui/BlurText";
import { sectionFadeInUp, sectionViewport } from "@/lib/sectionMotion";

const SECTION_LABEL = "OUR MISSION";
const MISSION_COPY =
  "Our mission is to remove complexity from investing and empower you to grow your wealth with confidence — whether you're saving, investing, or trading.\nWe believe everyone deserves access to transparent, affordable, and easy-to-use financial tools.";

export function AboutMissionSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeInUp}
      className="w-full bg-surface-bg py-12 sm:py-16 lg:py-16"
      aria-labelledby="about-mission-heading"
    >
      <Container className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col items-center gap-4 text-center max-w-[750px] mx-auto">
          <p className="font-body text-small font-semibold uppercase tracking-wide text-system-brand">
            {SECTION_LABEL}
          </p>
          <BlurText
            id="about-mission-heading"
            text={MISSION_COPY}
            delay={200}
            animateBy="lines"
            direction="top"
            className="font-heading text-[1.5rem] font-medium leading-[1.35] tracking-heading text-text-primary sm:text-[2rem] lg:text-[2.5rem]"
          />
        </div>
      </Container>
    </motion.section>
  );
}
