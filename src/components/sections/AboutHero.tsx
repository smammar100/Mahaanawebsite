"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { H1 } from "@/components/ui/Typography";
import { sectionFadeInUp, sectionViewport } from "@/lib/sectionMotion";

const HEADLINE = "We are transforming how Pakistanis invest.";
const HERO_IMAGE_SRC = "/images/invest/hero-bg.webp";

export function AboutHero() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeInUp}
      className="w-full bg-surface-bg pt-[calc(8rem+env(safe-area-inset-top,0px))] pb-12 sm:pb-16 lg:pb-16"
      aria-labelledby="about-hero-heading"
    >
      <Container className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col items-center gap-6 text-center sm:gap-8">
          <H1
            id="about-hero-heading"
            className="max-w-[650px] text-text-primary"
          >
            {HEADLINE}
          </H1>
          <div className="relative w-full max-w-[1280px] aspect-[1280/720] overflow-hidden rounded-2xl sm:rounded-[2rem] lg:rounded-[3rem]">
            <Image
              src={HERO_IMAGE_SRC}
              alt="Mahaana — transforming how Pakistanis invest"
              fill
              className="object-cover"
              sizes="(max-width: 1100px) 100vw, 1280px"
              priority
            />
          </div>
        </div>
      </Container>
    </motion.section>
  );
}
