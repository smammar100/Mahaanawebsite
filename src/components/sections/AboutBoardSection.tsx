"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { LinkedInIcon } from "@/components/ui/LinkedInIcon";
import { H2, TextSmall } from "@/components/ui/Typography";
import { sectionFadeInUp, sectionViewport } from "@/lib/sectionMotion";

const BOARD = [
  {
    name: "David Nangle",
    title: "CEO, Vostok Emerging Finance, Sweden",
    image: "/images/invest/David.webp",
    linkedinUrl: undefined as string | undefined,
  },
  {
    name: "Osman Nasir",
    title: "Ex-CEO, Pakistan Software Export Board (PSEB)",
    image: "/images/invest/Osman.webp",
    linkedinUrl: undefined as string | undefined,
  },
  {
    name: "Mattias Martinsson",
    title: "Founder, Tundra Fonder",
    image: "/images/invest/Mattias.webp",
    linkedinUrl: undefined as string | undefined,
  },
  {
    name: "Cecilia Seddigh",
    title: "Board member, Tundra Fonder",
    image: "/images/invest/Cecilia.webp",
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
      className="w-full bg-surface-bg py-8 sm:py-12 lg:py-16"
      aria-labelledby="about-board-heading"
    >
      <Container className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col gap-8 sm:gap-10">
          <H2 id="about-board-heading" className="text-text-primary">
            Our esteemed board & advisors
          </H2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {BOARD.map((person) => (
              <div
                key={person.name}
                className="flex flex-col items-start justify-center gap-4 text-center"
              >
                <div className="relative size-24 overflow-hidden rounded-full border-[1.5px] border-surface-stroke sm:size-[136px]">
                  <Image
                    src={person.image}
                    alt=""
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
                  <div className="flex flex-wrap items-center justify-start gap-2">
                    <p className="font-body text-medium font-semibold text-text-primary text-left">
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
                  <TextSmall className="text-text-secondary text-left">
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
