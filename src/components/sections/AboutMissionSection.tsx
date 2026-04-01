"use client";

import { motion } from "motion/react";
import { Container } from "@/components/layout/Container";
import BlurText from "@/components/ui/BlurText";
import { sectionFadeInUp, sectionViewport } from "@/lib/sectionMotion";
import { cleanCopy } from "@/lib/copy-utils";

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
      className="w-full bg-surface-bg py-10 sm:py-12 md:py-14 lg:py-16"
      aria-labelledby="about-mission-heading"
    >
      <Container className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col items-start gap-4 text-left">
          <p className="text-label text-system-brand">
            {cleanCopy(SECTION_LABEL)}
          </p>
          <BlurText
            as="h3"
            id="about-mission-heading"
            text={cleanCopy(MISSION_COPY)}
            delay={200}
            animateBy="lines"
            direction="top"
            className="max-w-3xl text-text-primary"
          />
        </div>
      </Container>
    </motion.section>
  );
}
