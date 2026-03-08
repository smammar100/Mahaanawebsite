"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ChevronRight } from "@untitledui/icons";
import { Container } from "@/components/layout/Container";
import { H2 } from "@/components/ui/Typography";
import { sectionFadeInUp, sectionViewport } from "@/lib/sectionMotion";

const NEWS_ITEMS = [
  {
    title: "PSX formally marks listing of Mahaana Islamic Index ETF in gong ceremony",
    href: "/investor-education",
    image: "/images/invest/hero-bg.jpg",
  },
  {
    title: "PACRA Assigns Initial Stability Rating to Mahaana Islamic Cash Fund",
    href: "/investor-education",
    image: "/images/invest/hero-bg.jpg",
  },
  {
    title: "PSX lists Mahaana Islamic Index Exchange Traded Fund (MIIETF)",
    href: "/investor-education",
    image: "/images/invest/hero-bg.jpg",
  },
];

export function AboutNewsSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeInUp}
      className="w-full bg-surface-bg py-12 sm:py-16 lg:py-16"
      aria-labelledby="about-news-heading"
    >
      <Container className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col gap-8 sm:gap-10">
          <H2 id="about-news-heading" className="text-left text-text-primary">
            In news & media
          </H2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {NEWS_ITEMS.map((item) => (
              <article
                key={item.title}
                className="flex flex-col gap-6 rounded-2xl"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-surface-card">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 767px) 100vw, 33vw"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <h3 className="font-body text-medium font-semibold leading-tight text-text-primary">
                    {item.title}
                  </h3>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-0.5 font-body text-small font-semibold text-system-brand transition-colors hover:text-primary-300"
                  >
                    Learn more
                    <ChevronRight className="size-5 shrink-0" aria-hidden />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </motion.section>
  );
}
