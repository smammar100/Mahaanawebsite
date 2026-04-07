"use client";

import { motion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { AboutProfileCard } from "@/components/sections/AboutProfileCard";
import { H3, TextRegular } from "@/components/ui/Typography";
import { cleanCopy } from "@/lib/copy-utils";
import { sectionFadeInUp, sectionViewport } from "@/lib/sectionMotion";

const BOARD = [
  {
    name: "David Nangle",
    title: "CEO, Vostok Emerging Finance, Sweden",
    image: "/images/invest/David.png",
    linkedinUrl: undefined as string | undefined,
  },
  {
    name: "Osman Nasir",
    title: "Ex-CEO, Pakistan Software Export Board (PSEB)",
    image: "/images/invest/Osman.png",
    linkedinUrl: undefined as string | undefined,
  },
  {
    name: "Mattias Martinsson",
    title: "Founder, Tundra Fonder",
    image: "/images/invest/Mattias.png",
    linkedinUrl: undefined as string | undefined,
  },
  {
    name: "Cecilia Seddigh",
    title: "Board member, Tundra Fonder",
    image: "/images/invest/Cecilia.png",
    linkedinUrl: undefined as string | undefined,
  },
];

export function AboutBoardSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeInUp}
      className="w-full bg-surface-bg section-y"
      aria-labelledby="about-board-heading"
    >
      <Container className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col gap-8 sm:gap-10">
          <div className="flex max-w-3xl flex-col gap-3 sm:gap-4">
            <p className="text-label text-system-brand">
              {cleanCopy("GOVERNANCE")}
            </p>
            <H3 id="about-board-heading" className="text-text-primary">
              Our esteemed board & advisors
            </H3>
            <TextRegular className="max-w-2xl text-text-tertiary">
              {cleanCopy(
                "Experienced leaders who guide strategy, risk, and governance as we scale a regulated, client-first wealth platform."
              )}
            </TextRegular>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-4 lg:grid-cols-4">
            {BOARD.map((person) => (
              <AboutProfileCard
                key={person.name}
                name={person.name}
                title={person.title}
                imageSrc={person.image}
                imageSizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                linkedinUrl={person.linkedinUrl}
              />
            ))}
          </div>
        </div>
      </Container>
    </motion.section>
  );
}
