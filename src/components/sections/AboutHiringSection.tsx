"use client";

import { motion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { H2, TextRegular } from "@/components/ui/Typography";
import { Button } from "@/components/base/buttons/button";
import { sectionFadeInUp, sectionViewport } from "@/lib/sectionMotion";

export function AboutHiringSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeInUp}
      className="w-full bg-surface-bg py-8 sm:py-12 lg:py-16"
      aria-labelledby="about-hiring-heading"
    >
      <Container className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex flex-col gap-4">
            <H2 id="about-hiring-heading" className="text-text-primary">
              We&apos;re hiring!
            </H2>
            <TextRegular className="text-text-secondary">
              Join us in digitizing the wealth management space.
            </TextRegular>
          </div>
          <Button href="/careers" color="primary" size="xl">
            Open positions
          </Button>
        </div>
      </Container>
    </motion.section>
  );
}
