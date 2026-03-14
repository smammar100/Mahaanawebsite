"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { H1, TextRegular } from "@/components/ui/Typography";
import {
  AppStoreButton,
  GooglePlayButton,
} from "@/components/base/buttons/app-store-buttons";
import { sectionFadeInUp, sectionViewport } from "@/lib/sectionMotion";

export function SavePlusHero() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeInUp}
      className="relative min-h-[90vh] overflow-hidden"
      aria-labelledby="save-plus-hero-heading"
    >
      {/* Background image */}
      <Image
        src="/images/invest/Save+.webp"
        alt="Mahaana Save+ savings and growth"
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

      {/* Content */}
      <div className="relative z-10 flex min-h-[90vh] w-full flex-col items-start justify-center py-8 sm:py-10 md:py-12 lg:py-14 xl:py-16">
        <Container className="flex w-full flex-1 items-start justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="flex h-fit w-full max-w-xl flex-col items-start gap-10">
            <div className="flex flex-col items-start gap-4">
              <H1
                id="save-plus-hero-heading"
                weight="semibold"
                className="max-w-[592px] text-white text-[2.5rem] sm:text-[3rem] lg:text-h1"
              >
                Your Savings Account, You wished your bank could offer
              </H1>

              <TextRegular className="max-w-[446px] text-white">
                The smart alternative to your traditional bank account, offering
                daily shariah compliant returns.
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

      <div
        id="hero-intersection-sentinel"
        className="absolute bottom-0 left-0 h-px w-full pointer-events-none"
        aria-hidden
      />
    </motion.section>
  );
}
