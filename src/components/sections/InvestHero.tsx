"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { TextRegular, TextSmall } from "@/components/ui/Typography";
import { Button } from "@/components/base/buttons/button";
import { sectionFadeInUp, sectionViewport } from "@/lib/sectionMotion";

export function InvestHero() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeInUp}
      className="relative h-[90vh] min-h-[90vh] overflow-hidden"
      aria-labelledby="invest-hero-heading"
    >
      {/* Background image */}
      <Image
        src="/images/invest/hero-bg.jpg"
        alt="Person enjoying a meal while managing investments on their phone"
        fill
        priority
        className="object-cover object-[center_30%] sm:object-[center_35%]"
        sizes="100vw"
      />

      {/* Dark overlay for text contrast */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-gray-900/70 via-gray-900/50 to-transparent"
        aria-hidden
      />

      {/* Content */}
      <div className="relative z-10 flex h-full min-h-0 items-center py-8 sm:py-10 md:py-12 lg:py-14 xl:py-16">
        <Container className="flex flex-1 items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="flex h-fit max-w-xl flex-col gap-10">
            <div className="flex flex-col gap-4">
              <h1
                id="invest-hero-heading"
                className="font-heading text-[2.5rem] font-semibold leading-[1.2] tracking-heading text-gray-100 sm:text-[3rem] lg:text-[3.5rem] max-w-[592px]"
              >
                Changing the way Pakistani&apos;s invest
              </h1>

              <TextRegular
              className="max-w-[446px] text-gray-100"
            >
              For ambitious dreamers who believe in saving smarter, spending
              wisely, and rising together
            </TextRegular>
            </div>

            <div className="flex flex-col gap-3">
              <div className="w-full sm:w-auto">
                <Button
                  href="#open-account"
                  color="secondary"
                  size="lg"
                  className="w-full rounded-xl px-3.5 py-4 text-base font-semibold sm:w-auto"
                >
                  Open your investment account
                </Button>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-2">
                <TextSmall
                  weight="medium"
                  className="text-gray-100"
                >
                  Licensed by SECP
                </TextSmall>
                <Image
                  src="/images/invest/SECP%20logo.svg"
                  alt="SECP"
                  width={40}
                  height={40}
                  className="h-8 w-auto object-contain"
                />
              </div>
              <div
                className="h-4 w-px bg-gray-300"
                role="presentation"
              />
              <div className="flex items-center gap-2">
                <TextSmall
                  weight="medium"
                  className="text-gray-100"
                >
                  Custodians
                </TextSmall>
                <Image
                  src="/images/invest/CDC%20logo.svg"
                  alt="CDC Custodians"
                  width={33}
                  height={37}
                  className="h-8 w-auto object-contain"
                />
              </div>
            </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Sentinel for header scroll detection */}
      <div
        id="hero-intersection-sentinel"
        className="absolute bottom-0 left-0 h-px w-full pointer-events-none"
        aria-hidden
      />
    </motion.section>
  );
}
