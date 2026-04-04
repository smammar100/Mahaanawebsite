"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { H1 } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";
import { cleanCopy } from "@/lib/copy-utils";
import { sectionFadeInUp, sectionViewport } from "@/lib/sectionMotion";

const HERO_IMAGE_SRC = "/images/invest/about%20hero.webp";

const HEADLINE_LINE1 = "We are transforming how";
const HEADLINE_LINE2 = "Pakistanis invest.";

const TRUSTED_LOGOS = [
  {
    src: "/images/invest/IGI%20Life%20Logo.png",
    alt: "IGI Life and Vitality",
    width: 132,
    height: 44,
  },
  {
    src: "/images/invest/y-combinator-seeklogo.png",
    alt: "Y Combinator",
    width: 174,
    height: 36,
  },
  {
    src: "/images/invest/Sparklabs%20logo.png",
    alt: "SparkLabs",
    width: 126,
    height: 36,
  },
  {
    src: "/images/invest/VEF%20logo.png",
    alt: "VEF",
    width: 72,
    height: 36,
  },
];

export function AboutHero() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeInUp}
      className="w-full bg-surface-bg pt-[calc(6rem+env(safe-area-inset-top,0px))] pb-0"
      aria-labelledby="about-hero-heading"
    >
      <div className="mx-auto w-full max-w-[1300px] border-x border-surface-stroke/80">
        <Container className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="flex min-w-0 w-full flex-col items-start gap-10 pt-16 pb-16">
            <div className="min-w-0 w-full max-w-[860px]">
              <H1
                id="about-hero-heading"
                className={cn(
                  "flex w-full max-w-full flex-col items-start gap-0 text-left text-text-primary text-balance",
                  "text-[2.125rem] leading-[1.08] tracking-[-0.03em] sm:text-[2.7rem] md:text-[3rem] lg:text-[3.5rem]",
                )}
              >
                <span className="block max-w-full sm:whitespace-nowrap">
                  {cleanCopy(HEADLINE_LINE1)}
                </span>
                <span className="block max-w-full sm:whitespace-nowrap">
                  {cleanCopy(HEADLINE_LINE2)}
                </span>
              </H1>
            </div>

            <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-card sm:aspect-[16/9] lg:aspect-[1200/520]">
              <Image
                src={HERO_IMAGE_SRC}
                alt="Two coworkers collaborating with a laptop"
                fill
                className="rounded-2xl object-cover"
                sizes="(max-width: 800px) 100vw, 1100px"
                priority
              />
              <div
                className="pointer-events-none absolute inset-0 z-[1] bg-[#1A1B25]/15"
                aria-hidden
              />
            </div>

            <div className="flex w-full min-w-0 flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <p className="max-w-[260px] text-body text-text-tertiary">
                {cleanCopy("Backed by the best")}
              </p>

              <div className="grid w-full grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4 sm:gap-x-8 lg:gap-x-10 lg:gap-y-0">
                {TRUSTED_LOGOS.map((logo) => (
                  <div
                    key={logo.src}
                    className="flex h-11 w-full items-center justify-center sm:w-auto"
                  >
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={logo.width}
                      height={logo.height}
                      className="h-7 w-auto max-h-10 object-contain opacity-90 sm:h-8 sm:max-h-11"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </motion.section>
  );
}
