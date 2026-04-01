"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { H1 } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";
import { cleanCopy } from "@/lib/copy-utils";
import { sectionFadeInUp, sectionViewport } from "@/lib/sectionMotion";

const HEADLINE_LINE1 = "We are transforming how";
const HEADLINE_LINE2 = "Pakistanis invest.";

const HERO_IMAGE_SRC = "/images/invest/hero-team.webp";

export function AboutHero() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeInUp}
      className="w-full bg-surface-bg pt-[calc(8rem+env(safe-area-inset-top,0px))] pb-0"
      aria-labelledby="about-hero-heading"
    >
      <Container className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col gap-8 lg:gap-12 xl:gap-16">
          {/* Full-width title so each phrase stays one line (narrow col-span was forcing 4+ wraps) */}
          <div className="min-w-0 w-full">
            <H1
              id="about-hero-heading"
              className="flex flex-col items-start gap-0 text-text-primary"
            >
              <span className="block max-sm:max-w-full sm:whitespace-nowrap">
                {cleanCopy(HEADLINE_LINE1)}
              </span>
              <span className="block max-sm:max-w-full sm:whitespace-nowrap">
                {cleanCopy(HEADLINE_LINE2)}
              </span>
            </H1>
          </div>

          {/* Full-width hero image — bottom margin matches flex gap above for equal rhythm to LogoStrip */}
          <div className="min-w-0 w-full mb-8 lg:mb-12 xl:mb-16">
            <div
              className={cn(
                "relative aspect-[4/3] w-full overflow-hidden rounded-2xl sm:aspect-[16/10] sm:rounded-[2rem] lg:aspect-[1280/720] lg:rounded-[3rem]"
              )}
            >
              <Image
                src={HERO_IMAGE_SRC}
                alt="Mahaana — transforming how Pakistanis invest"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1100px"
                priority
              />
            </div>
          </div>
        </div>
      </Container>
    </motion.section>
  );
}
