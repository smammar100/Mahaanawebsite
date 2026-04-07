"use client";

import { LineChartUp01, Target04, Zap } from "@untitledui/icons";
import { motion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { H3, TextLarge, TextRegular } from "@/components/ui/Typography";
import { cleanCopy } from "@/lib/copy-utils";
import { sectionFadeInUp, sectionViewport } from "@/lib/sectionMotion";

const MISSION_LEAD =
  "Our mission is to remove complexity from investing and empower you to grow your wealth with confidence whether you're saving, investing, or trading.";

const VALUE_CARDS = [
  {
    icon: Zap,
    title: "Client obsession",
    description:
      "We start from real customer problems—clear pricing, honest communication, and support that actually helps—so you always know where you stand.",
  },
  {
    icon: LineChartUp01,
    title: "Investment made simple",
    description:
      "From onboarding to portfolio updates, we strip away jargon and friction so you can focus on goals, not paperwork or hidden fees.",
  },
  {
    icon: Target04,
    title: "Empowering your future",
    description:
      "We place long-term outcomes ahead of short-term noise: education, disciplined products, and tools that help you build wealth sustainably.",
  },
] as const;

export function AboutMissionValuesSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeInUp}
      className="w-full bg-surface-bg section-y"
      aria-labelledby="about-mission-values-heading"
    >
      <Container className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col gap-8 sm:gap-10">
          <div className="flex max-w-3xl flex-col gap-3 sm:gap-4">
            <p className="text-label text-system-brand">
              {cleanCopy("MISSION + VALUES")}
            </p>
            <H3 id="about-mission-values-heading" className="text-text-primary">
              {cleanCopy(MISSION_LEAD)}
            </H3>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {VALUE_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="flex flex-col gap-6 rounded-2xl border border-surface-stroke bg-surface-card p-6"
                >
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary-100 p-2">
                    <Icon className="size-6 text-primary-200" aria-hidden />
                  </div>
                  <div className="flex flex-col gap-2">
                    <TextLarge weight="semibold" className="text-text-primary">
                      {cleanCopy(card.title)}
                    </TextLarge>
                    <TextRegular className="text-text-tertiary">
                      {cleanCopy(card.description)}
                    </TextRegular>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </motion.section>
  );
}
