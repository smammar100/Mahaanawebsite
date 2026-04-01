"use client";

import { motion } from "motion/react";
import { User01, Lightbulb05, LineChartUp01 } from "@untitledui/icons";
import { Container } from "@/components/layout/Container";
import { H3, TextLarge, TextRegular } from "@/components/ui/Typography";
import { sectionFadeInUp, sectionViewport } from "@/lib/sectionMotion";
import { cleanCopy } from "@/lib/copy-utils";

const VALUES = [
  {
    title: "Client obsession",
    body: "We started Mahaana to make investing in Pakistan simple — no jargon, no hidden fees, just a better investment experience.",
    Icon: User01,
  },
  {
    title: "Investment made simple",
    body: "In a complex industry, simplicity sets us apart. From saving to investing, we've helped thousands of Pakistanis understand all of it.",
    Icon: LineChartUp01,
  },
  {
    title: "Empowering your future",
    body: "Our mission is simple: help everyone feel financially free — not by getting rich fast, but by reducing stress and building daily security.",
    Icon: Lightbulb05,
  },
] as const;

export function AboutValuesSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeInUp}
      className="w-full bg-surface-bg py-10 sm:py-12 md:py-14 lg:py-16"
      aria-labelledby="about-values-heading"
    >
      <Container className="flex flex-col justify-center gap-10 px-4 sm:px-6 sm:gap-12 md:px-8 lg:gap-12 lg:px-12 xl:px-16">
        <div className="flex flex-col items-start">
          <div className="flex flex-col items-start gap-2">
            <p className="text-label text-system-brand">
              {cleanCopy("OUR VALUES")}
            </p>
            <H3
              id="about-values-heading"
              className="text-text-primary w-full max-w-3xl"
            >
              Our values
            </H3>
          </div>
          <TextRegular className="mt-4 max-w-2xl text-text-tertiary">
            {cleanCopy(
              "The principles that guide everything we do — from how we build products to how we serve our clients."
            )}
          </TextRegular>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-4 lg:grid-cols-3">
          {VALUES.map(({ title, body, Icon }) => (
            <div
              key={title}
              className="flex flex-col gap-6 rounded-2xl border border-surface-stroke bg-surface-card p-6 dark:bg-surface-card"
            >
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary-100 p-2">
                <Icon className="size-6 text-primary-200" aria-hidden />
              </div>
              <div className="flex flex-col gap-2">
                <TextLarge weight="semibold" className="text-text-primary">
                  {title}
                </TextLarge>
                <TextRegular className="text-text-tertiary">{cleanCopy(body)}</TextRegular>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </motion.section>
  );
}
