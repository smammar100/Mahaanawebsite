"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { TextRegular } from "@/components/ui/Typography";
import { cleanCopy } from "@/lib/copy-utils";
import { Button } from "@/components/base/buttons/button";
import { sectionFadeInUp, sectionViewport } from "@/lib/sectionMotion";

export function RetirementHero() {
  const router = useRouter();

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeInUp}
      className="relative min-h-dvh overflow-hidden"
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
      <div className="relative z-10 flex min-h-dvh w-full flex-col items-start justify-center section-y">
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
              <Button
                color="secondary"
                size="xl"
                onPress={() => router.push("/get-app")}
                className="shrink-0 rounded-xl px-7 py-3.5 font-bold text-text-primary shadow-[0_1px_4px_rgba(15,23,42,0.12)] hover:bg-gray-100"
              >
                {cleanCopy("Open your Retirement account")}
              </Button>
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
