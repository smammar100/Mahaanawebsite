"use client";

import { File02, LineChartUp01, ShieldTick } from "@untitledui/icons";
import { motion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { H3, TextLarge, TextRegular } from "@/components/ui/Typography";
import { sectionFadeInUp, sectionViewport } from "@/lib/sectionMotion";
import { cleanCopy } from "@/lib/copy-utils";

const features = [
  {
    icon: File02,
    title: "Fast, Paperless Onboarding",
    desc: "Sign up in minutes with zero paperwork or complicated steps.",
  },
  {
    icon: LineChartUp01,
    title: "Earn Daily, Grow Steadily",
    desc: "Your savings grow every day with consistent daily returns.",
  },
  {
    icon: ShieldTick,
    title: "Fully Shariah-Compliant",
    desc: "Fully aligned with Islamic principles, certified by SECP & Renowned Shariah Advisors.",
  },
];

export function WhySavePlusSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeInUp}
      className="section-y"
      aria-labelledby="why-save-plus-heading"
    >
      <Container className="flex flex-col gap-6 px-4 sm:px-6 md:px-8 lg:px-16">
        <div className="flex flex-col items-start">
          <div className="flex flex-col items-start gap-2">
            <p className="text-label text-system-brand">
              {cleanCopy("WHY MAHAANA SAVE+")}
            </p>
            <H3
              id="why-save-plus-heading"
              className="text-text-primary w-full max-w-3xl"
            >
              Why Mahaana Save+
            </H3>
          </div>
          <TextRegular className="mt-4 max-w-2xl text-text-tertiary">
            {cleanCopy(
              "Mahaana Save+ helps you earn daily returns on your money locked in zero or minimal returns your bank account offers."
            )}
          </TextRegular>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="flex flex-col gap-6 rounded-2xl border border-surface-stroke bg-surface-card p-6 dark:bg-surface-card"
              >
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary-100 p-2">
                  <Icon className="size-6 text-primary-200" aria-hidden />
                </div>
                <div className="flex flex-col gap-2">
                  <TextLarge
                    weight="semibold"
                    className="text-text-primary"
                  >
                    {feature.title}
                  </TextLarge>
                  <TextRegular className="text-text-tertiary">
                    {cleanCopy(feature.desc)}
                  </TextRegular>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </motion.section>
  );
}
