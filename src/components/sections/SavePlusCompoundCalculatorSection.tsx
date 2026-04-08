"use client";

import { motion } from "motion/react";

import { InvestmentCalculator } from "@/components/investment/InvestmentCalculator";
import { Container } from "@/components/layout/Container";
import { H3, TextRegular, TextTiny } from "@/components/ui/Typography";
import { cleanCopy } from "@/lib/copy-utils";
import { sectionFadeInUp, sectionViewport } from "@/lib/sectionMotion";

export function SavePlusCompoundCalculatorSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeInUp}
      className="section-y"
      aria-labelledby="save-plus-calculator-heading"
    >
      <Container className="flex flex-col gap-8 px-4 sm:gap-10 sm:px-6 md:px-8 lg:px-16">
        <div className="flex flex-col gap-4">
          <p className="text-label text-system-brand">
            {cleanCopy("Calculate your estimate")}
          </p>
          <H3
            id="save-plus-calculator-heading"
            className="text-text-primary w-full max-w-3xl"
          >
            {cleanCopy("See your potential")}
          </H3>
          <TextRegular className="max-w-2xl text-text-tertiary">
            {cleanCopy(
              "Explore how time and compound growth could affect your savings. Figures are hypothetical and for illustration only."
            )}
          </TextRegular>
        </div>

        <div className="flex flex-col gap-6">
          <InvestmentCalculator embedded />
          <TextTiny className="max-w-xl text-text-tertiary">
            {cleanCopy(
              "This calculator is hypothetical and does not predict MICF or Save+ performance. Actual returns vary with market conditions and are not guaranteed. It does not include fees or taxes."
            )}
          </TextTiny>
        </div>
      </Container>
    </motion.section>
  );
}
