"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { TextRegular } from "@/components/ui/Typography";
import { cleanCopy } from "@/lib/copy-utils";
import {
  AppStoreButton,
  GooglePlayButton,
} from "@/components/base/buttons/app-store-buttons";
import { sectionFadeInUp, sectionViewport } from "@/lib/sectionMotion";

export function RetirementHero() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeInUp}
      className="relative min-h-[90vh] overflow-hidden"
      aria-labelledby="retirement-hero-heading"
    >
      {/* Background image */}
      <Image
        src="/images/invest/Retirement.webp"
        alt="Person planning retirement with Mahaana"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Dark overlay for text contrast */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-gray-900/70 via-gray-900/50 to-transparent"
        aria-hidden
      />

      {/* Content: full-bleed flex container for vertical center; lockup left-aligned, no horizontal center */}
      <div className="relative z-10 flex min-h-[90vh] w-full flex-col items-start justify-center py-8 sm:py-10 md:py-12 lg:py-14 xl:py-16">
        <Container className="flex w-full flex-1 items-start justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="flex h-fit w-full max-w-xl flex-col items-start gap-10">
            <div className="flex flex-col items-start gap-4">
              {/* Headline - same typography as InvestHero */}
              <h1
                id="retirement-hero-heading"
                className="max-w-[592px] text-white"
              >
                {cleanCopy("Introducing")}
                <br aria-hidden />
                {cleanCopy("Mahaana Retirement")}
              </h1>

              {/* Subtext - same as InvestHero (TextRegular, max-w-[446px]) */}
              <TextRegular className="max-w-[446px] text-white">
                {cleanCopy(
                  "Turn your retirement dreams into reality with Mahaana and enjoy up to 20% tax savings along the way."
                )}
              </TextRegular>
            </div>

            <div className="flex flex-col items-start gap-3">
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <AppStoreButton href="#" className="shrink-0" />
                <GooglePlayButton href="#" className="shrink-0" />
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Sentinel for header scroll detection (same as home) */}
      <div
        id="hero-intersection-sentinel"
        className="absolute bottom-0 left-0 h-px w-full pointer-events-none"
        aria-hidden
      />
    </motion.section>
  );
}
