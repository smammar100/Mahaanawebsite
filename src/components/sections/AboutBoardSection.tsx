"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { LinkedInIcon } from "@/components/ui/LinkedInIcon";
import { H3, TextRegular, TextSmall } from "@/components/ui/Typography";
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
      className="w-full border-t border-surface-stroke/80 bg-surface-bg py-10 sm:py-12 md:py-14 lg:py-16"
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
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-12 lg:grid-cols-12">
            {BOARD.map((person) => (
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
