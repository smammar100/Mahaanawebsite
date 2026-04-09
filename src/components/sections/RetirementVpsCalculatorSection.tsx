"use client";

import { motion } from "motion/react";

import { RetirementVpsCalculator } from "@/components/retirement/RetirementVpsCalculator";
import { Container } from "@/components/layout/Container";
import { H3, TextRegular, TextTiny } from "@/components/ui/Typography";
import { cleanCopy } from "@/lib/copy-utils";
import { sectionFadeInUp, sectionViewport } from "@/lib/sectionMotion";

export function RetirementVpsCalculatorSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeInUp}
      className="section-y"
      aria-labelledby="retirement-calculator-heading"
    >
      <Container className="flex flex-col gap-8 px-4 sm:gap-10 sm:px-6 md:px-8 lg:px-16">
        <div className="flex flex-col gap-4">
          <p className="text-label text-system-brand">
            {cleanCopy("Calculate your estimate")}
          </p>
          <H3
            id="retirement-calculator-heading"
            className="w-full max-w-3xl text-text-primary"
          >
            {cleanCopy("See your potential")}
          </H3>
          <TextRegular className="max-w-2xl text-text-tertiary">
            {cleanCopy(
              "Explore illustrative income tax and voluntary pension (VPS) credit estimates for retirement planning. Figures are hypothetical and for illustration only."
            )}
          </TextRegular>
        </div>

        <div className="flex flex-col gap-6">
          <RetirementVpsCalculator embedded />
          <TextTiny className="max-w-xl text-text-tertiary">
            {cleanCopy(
              "This calculator is illustrative and does not predict fund performance or guarantee tax outcomes. Rules change with federal budgets; it does not replace professional advice."
            )}
          </TextTiny>
        </div>
      </Container>
    </motion.section>
  );
}
