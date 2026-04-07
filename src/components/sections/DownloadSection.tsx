"use client";

import { motion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { H3 } from "@/components/ui/Typography";
import { PhoneMockup } from "@/components/ui/PhoneMockup";
import { AppStoreButton, GooglePlayButton } from "@/components/base/buttons/app-store-buttons";
import { cleanCopy } from "@/lib/copy-utils";
import { sectionFadeInUp, sectionViewport } from "@/lib/sectionMotion";
import { cx } from "@/utils/cx";

const PLACEHOLDER_PHONE_1 =
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-phone-1.svg";
const PLACEHOLDER_PHONE_2 =
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-phone-2.svg";
const PLACEHOLDER_PHONE_3 =
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-phone-3.svg";

interface DownloadSectionProps {
  className?: string;
}

export function DownloadSection({ className }: DownloadSectionProps) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionFadeInUp}
      className={cx(
        "section-y",
        className
      )}
      aria-labelledby="download-heading"
    >
      <Container>
        <div className="flex flex-col items-center gap-10">
          <p className="text-label text-system-brand">
            {cleanCopy("Get Started")}
          </p>
          <H3
            id="download-heading"
            className="text-center text-balance text-text-primary"
          >
            Download our app and transform your workflow today
          </H3>
        </div>
        <div className="mt-16 flex flex-col items-center justify-center gap-6 sm:flex-row">
          <AppStoreButton className="shrink-0" />
          <GooglePlayButton className="shrink-0" />
        </div>
        <div className="mt-16 flex items-end justify-center gap-4 sm:mt-28">
          <div className="order-1 hidden h-[250px] w-full max-w-sm overflow-hidden md:block lg:h-[350px] xl:h-[450px]">
            <PhoneMockup
              src={PLACEHOLDER_PHONE_2}
              className="size-full"
            />
          </div>
          <div className="order-2 h-[600px] w-full max-w-sm overflow-hidden md:h-[350px] lg:h-[450px] xl:h-[600px]">
            <PhoneMockup
              src={PLACEHOLDER_PHONE_1}
              className="size-full"
            />
          </div>
          <div className="order-3 hidden h-[250px] w-full max-w-sm overflow-hidden md:block lg:h-[350px] xl:h-[450px]">
            <PhoneMockup
              src={PLACEHOLDER_PHONE_3}
              className="size-full"
            />
          </div>
        </div>
      </Container>
    </motion.section>
  );
}
