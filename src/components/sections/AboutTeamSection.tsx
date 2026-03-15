"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { LinkedInIcon } from "@/components/ui/LinkedInIcon";
import { H3, TextSmall } from "@/components/ui/Typography";
import { sectionFadeInUp, sectionViewport } from "@/lib/sectionMotion";

const TEAM = [
  {
    name: "Muhammad Shamoon Tariq",
    title: "CFA, FDP Chief Executive Officer & Founder",
    image: "/images/invest/Shamoon.webp",
    linkedinUrl: undefined as string | undefined,
  },
  {
    name: "Mubashir Zuberi",
    title: "CFA Chief Investment Officer",
    image: "/images/invest/Mubashir.webp",
    linkedinUrl: undefined as string | undefined,
  },
  {
    name: "Zeeshan Shabbir Abbasi",
    title: "BSc Chief Technology Officer",
    image: "/images/invest/Zeeshan.webp",
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
      className="w-full bg-surface-bg py-8 sm:py-12 lg:py-16"
      aria-labelledby="about-team-heading"
    >
      <Container className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col gap-8 sm:gap-10">
          <H3 id="about-team-heading" className="text-text-primary">
            Introducing our dedicated team
          </H3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((person) => (
              <div
                key={person.name}
                className="flex flex-col items-center gap-4 text-center"
              >
                <div className="relative size-24 overflow-hidden rounded-full border-[1.5px] border-surface-stroke sm:size-[136px]">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 639px) 96px, 136px"
                  />
                  <div
                    className="absolute inset-0 rounded-full bg-gradient-to-b from-transparent via-transparent to-black/10 from-50% to-100% mix-blend-multiply"
                    aria-hidden
                  />
                  <div
                    className="absolute inset-0 rounded-full bg-gradient-to-b from-primary-200/20 to-primary-400/80 opacity-80"
                    aria-hidden
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <p className="text-stat text-text-primary">
                      {person.name}
                    </p>
                    <a
                      href={person.linkedinUrl ?? "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-secondary transition-colors hover:text-system-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-system-brand focus-visible:ring-offset-2 rounded"
                      aria-label={`LinkedIn profile of ${person.name}`}
                    >
                      <LinkedInIcon size={20} className="shrink-0" />
                    </a>
                  </div>
                  <TextSmall className="text-text-secondary">
                    {person.title}
                  </TextSmall>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </motion.section>
  );
}
