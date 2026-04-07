"use client";

import { motion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { AboutProfileCard } from "@/components/sections/AboutProfileCard";
import { H3, TextRegular } from "@/components/ui/Typography";
import { cleanCopy } from "@/lib/copy-utils";
import { sectionFadeInUp, sectionViewport } from "@/lib/sectionMotion";

/** `public/images/invest/` leadership headshots */
const INVEST_HEADSHOTS = {
  shamoon: "/images/invest/Shamoon.png",
  mubashir: "/images/invest/Mubashir.png",
  zeeshan: "/images/invest/Zeeshan.png",
} as const;

const TEAM = [
  {
    name: "Muhammad Shamoon Tariq",
    title: "CFA, FDP Chief Executive Officer & Founder",
    image: INVEST_HEADSHOTS.shamoon,
    linkedinUrl: undefined as string | undefined,
  },
  {
    name: "Mubashir Zuberi",
    title: "CFA Chief Investment Officer",
    image: INVEST_HEADSHOTS.mubashir,
    linkedinUrl: undefined as string | undefined,
  },
  {
    name: "Zeeshan Shabbir Abbasi",
    title: "BSc Chief Technology Officer",
    image: INVEST_HEADSHOTS.zeeshan,
    linkedinUrl: undefined as string | undefined,
  },
];

export function AboutTeamSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeInUp}
      className="w-full bg-surface-bg section-y"
      aria-labelledby="about-team-heading"
    >
      <Container className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col gap-8 sm:gap-10">
          <div className="flex max-w-3xl flex-col gap-3 sm:gap-4">
            <p className="text-label text-system-brand">
              {cleanCopy("OUR TEAM")}
            </p>
            <H3 id="about-team-heading" className="text-text-primary">
              Introducing our dedicated team
            </H3>
            <TextRegular className="max-w-2xl text-text-tertiary">
              {cleanCopy(
                "The leaders building Mahaana's product, investments, and technology—focused on trust, clarity, and long-term outcomes for our clients."
              )}
            </TextRegular>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-4 lg:grid-cols-3">
            {TEAM.map((person) => (
              <AboutProfileCard
                key={person.name}
                name={person.name}
                title={person.title}
                imageSrc={person.image}
                imageSizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                linkedinUrl={person.linkedinUrl}
              />
            ))}
          </div>
        </div>
      </Container>
    </motion.section>
  );
}
