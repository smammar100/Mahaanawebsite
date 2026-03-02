"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { sectionFadeInUp, sectionViewport } from "@/lib/sectionMotion";

const defaultLogos = [
  { src: "/images/invest/VEF%20logo.png", alt: "VEF" },
  { src: "/images/invest/YC%20logo.jpg", alt: "YC" },
  { src: "/images/invest/Sparklabs%20logo.png", alt: "Sparklabs" },
  { src: "/images/invest/IGI%20logo.png", alt: "IGI" },
];

interface LogoStripProps {
  logos?: Array<{ src: string; alt: string }>;
}

export function LogoStrip({ logos = defaultLogos }: LogoStripProps) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeInUp}
      className="flex flex-col items-center justify-center bg-surface-bg py-4"
      aria-label="Trusted by regulatory bodies and custodians"
    >
      <Container className="flex items-center">
        <div className="grid h-full w-full max-w-full grid-cols-2 place-items-center gap-x-4 gap-y-2 sm:grid-cols-4 sm:gap-x-6 sm:gap-y-0">
          {logos.map((logo, index) => (
            <div
              key={`${logo.src}-${index}`}
              className="flex h-full max-h-16 w-full max-w-[161px] items-center justify-center overflow-hidden py-1"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={161}
                height={64}
                className="h-7 w-auto max-h-full max-w-[161px] object-contain object-center sm:h-9 lg:h-12"
              />
            </div>
          ))}
        </div>
      </Container>
    </motion.section>
  );
}
