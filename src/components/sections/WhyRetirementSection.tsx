"use client";

import { File02, Target04, Zap } from "@untitledui/icons";
import { motion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { H3, TextLarge, TextRegular } from "@/components/ui/Typography";
import { sectionFadeInUp, sectionViewport } from "@/lib/sectionMotion";
import { cleanCopy } from "@/lib/copy-utils";

const features = [
  {
    icon: Zap,
    title: "Easy retirement investing",
    desc: "Easily manage your investments and retirement account in one app.",
  },
  {
    icon: File02,
    title: "Reduce your monthly income tax",
    desc: "Take advantage of upto 20% income tax benefits by contributing to your MRA.",
  },
  {
    icon: Target04,
    title: "Built around your goals",
    desc: "Answer few questions and we'll recommend a personalized investment portfolio for you.",
  },
];

export function WhyRetirementSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeInUp}
      className="border-t border-surface-stroke py-8 sm:py-10 md:py-12 lg:py-14 xl:py-16"
      aria-labelledby="why-retirement-heading"
    >
      <Container className="flex flex-col gap-6 px-4 sm:px-6 md:px-8 lg:px-16">
        <div className="flex flex-col items-start">
          <div className="flex flex-col items-start gap-2">
            <p className="text-label text-system-brand">
              {cleanCopy("WHY RETIREMENT")}
            </p>
            <H3
              id="why-retirement-heading"
              className="text-text-primary w-full max-w-3xl"
            >
              Retirement planning that works as hard as you do.
            </H3>
          </div>
          <TextRegular className="mt-4 max-w-2xl text-text-tertiary">
            {cleanCopy(
              "Mahaana Retirement is a Shariah compliant, tax efficient way to grow your savings for the future. You continuously receive Investment advice from us based on your goals and risk level."
            )}
          </TextRegular>
        </div>

        {/* Cards grid */}
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
