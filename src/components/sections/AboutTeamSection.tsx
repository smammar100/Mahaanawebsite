"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { LinkedInIcon } from "@/components/ui/LinkedInIcon";
import { H3, TextRegular, TextSmall } from "@/components/ui/Typography";
import { cleanCopy } from "@/lib/copy-utils";
import { sectionFadeInUp, sectionViewport } from "@/lib/sectionMotion";

const TEAM = [
  {
    name: "Muhammad Shamoon Tariq",
    title: "CFA, FDP Chief Executive Officer & Founder",
    image: "/images/invest/Shamoon.png",
    linkedinUrl: undefined as string | undefined,
  },
  {
    name: "Mubashir Zuberi",
    title: "CFA Chief Investment Officer",
    image: "/images/invest/Mubashir.png",
    linkedinUrl: undefined as string | undefined,
  },
  {
    name: "Zeeshan Shabbir Abbasi",
    title: "BSc Chief Technology Officer",
    image: "/images/invest/Zeeshan.png",
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
      className="w-full border-t border-surface-stroke/80 bg-surface-bg py-10 sm:py-12 md:py-14 lg:py-16"
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
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-12 lg:grid-cols-12">
            {TEAM.map((person) => (
              <div
                key={person.name}
                className="flex flex-col items-start gap-4 text-left sm:col-span-6 lg:col-span-3"
              >
                <div className="relative size-24 overflow-hidden rounded-full border-[1.5px] border-surface-stroke sm:size-[136px]">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 639px) 96px, 136px"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex flex-wrap items-center justify-start gap-2">
                    <p className="text-stat text-text-primary">
                      {person.name}
                    </p>
                    <a
                      href={person.linkedinUrl ?? "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-tertiary transition-colors hover:text-system-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-system-brand focus-visible:ring-offset-2 rounded"
                      aria-label={`LinkedIn profile of ${person.name}`}
                    >
                      <LinkedInIcon size={20} className="shrink-0" />
                    </a>
                  </div>
                  <TextSmall className="text-text-tertiary">
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
