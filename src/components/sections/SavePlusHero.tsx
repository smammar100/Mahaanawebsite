"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { H1, TextRegular } from "@/components/ui/Typography";
import { cleanCopy } from "@/lib/copy-utils";
import { Button } from "@/components/base/buttons/button";
import { MAHAANA_APP_STORE_URL } from "@/lib/app-store-urls";
import { sectionFadeInUp, sectionViewport } from "@/lib/sectionMotion";

export function SavePlusHero() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeInUp}
      className="relative min-h-dvh overflow-hidden"
      aria-labelledby="save-plus-hero-heading"
    >
      {/* Background image */}
      <Image
        src="/images/invest/Save%2B%20image.png"
        alt="Mahaana Save+ savings and growth"
        fill
        priority
        className="object-cover object-[58%_52%]"
        sizes="100vw"
      />

      {/* Dark overlay for text contrast */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-gray-900/70 via-gray-900/50 to-transparent"
        aria-hidden
      />

      {/* Content */}
      <div className="relative z-10 flex min-h-dvh w-full flex-col items-start justify-center section-y">
        <Container className="flex w-full flex-1 items-start justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="flex h-fit w-full max-w-xl flex-col items-start gap-10">
            <div className="flex flex-col items-start gap-4">
              <H1
                id="save-plus-hero-heading"
                className="max-w-[592px] text-white"
              >
                Your Savings Account, You wished your bank could offer
              </H1>

              <TextRegular className="max-w-[446px] text-white">
                {cleanCopy(
                  "The smart alternative to your traditional bank account, offering daily shariah compliant returns."
                )}
              </TextRegular>
            </div>

            <div className="flex flex-col items-start gap-3">
              <Button
                href={MAHAANA_APP_STORE_URL}
                color="secondary"
                size="xl"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 rounded-xl px-7 py-3.5 font-bold text-text-primary shadow-[0_1px_4px_rgba(15,23,42,0.12)] hover:bg-gray-100"
              >
                {cleanCopy("Open your Save+ account")}
              </Button>
            </div>
          </div>
        </Container>
      </div>

      <div
        id="hero-intersection-sentinel"
        className="absolute bottom-0 left-0 h-px w-full pointer-events-none"
        aria-hidden
      />
    </motion.section>
  );
}
