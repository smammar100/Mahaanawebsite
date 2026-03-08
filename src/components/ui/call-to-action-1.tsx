"use client";

import dynamic from "next/dynamic";
import { AppStoreButton, GooglePlayButton } from "@/components/base/buttons/app-store-buttons";
import { Button } from "@/components/base/buttons/button";
import { H2 } from "@/components/ui/Typography";
import { cx } from "@/utils/cx";

const DynamicSilkBackground = dynamic(
  () => import("@/components/ui/SilkBackground").then((m) => m.SilkBackground),
  { ssr: false }
);

interface CallToAction1Props {
  className?: string;
  badgeText?: string;
  headline?: React.ReactNode;
  /** When provided with ctaHref, shows a single CTA button instead of app store buttons */
  ctaText?: string;
  ctaHref?: string;
}

const defaultAvatars = [
  "/images/testimonials/avatar-1.jpg",
  "/images/testimonials/avatar-2.jpg",
  "/images/testimonials/avatar-3.jpg",
];

export function CallToAction1({
  className,
  badgeText = "Join community of 20K+ investors",
  headline = (
    <>
      We're changing the way
      <br />
      Pakistanis Save & Invest every day
    </>
  ),
  ctaText,
  ctaHref,
}: CallToAction1Props) {
  return (
    <div
      className={cx(
        "relative flex min-h-[280px] flex-col items-center justify-center overflow-hidden rounded-xl p-6 text-center text-white sm:p-8 md:p-10 lg:p-12",
        className
      )}
    >
      <div
        className="absolute inset-0 z-0 rounded-xl"
        style={{
          background: "linear-gradient(180deg, #443087 0%, #30225F 100%)",
        }}
        aria-hidden
      />
      <DynamicSilkBackground
        color="#8952fd"
        speed={5}
        scale={1}
        noiseIntensity={1.5}
      />
      <div className="relative z-10 flex flex-col items-center justify-center">
        <div className="flex flex-wrap items-center justify-center gap-2 rounded-full border border-purple-500/40 bg-purple-600/10 px-4 py-2 backdrop-blur sm:gap-3">
          <div className="flex items-center -space-x-2">
            {defaultAvatars.map((src, i) => (
              <img
                key={i}
                className="size-6 shrink-0 rounded-full border-2 border-white object-cover sm:size-7"
                src={src}
                alt=""
              />
            ))}
          </div>
          <p className="font-body text-small font-medium text-gray-100">
            {badgeText}
          </p>
        </div>
        <H2 className="mt-5 max-w-3xl text-[2rem] font-semibold leading-tight text-gray-100 sm:text-[2.5rem] sm:leading-[1.2] lg:text-h2">
          {headline}
        </H2>
        {ctaText && ctaHref ? (
          <div className="mt-6 sm:mt-8">
            <Button href={ctaHref} color="secondary" size="xl" className="bg-white text-primary-200 hover:bg-gray-100">
              {ctaText}
            </Button>
          </div>
        ) : (
          <div className="mt-6 flex flex-col justify-center gap-3 sm:mt-8 sm:flex-row sm:gap-4">
            <AppStoreButton size="lg" className="shrink-0" />
            <GooglePlayButton size="lg" className="shrink-0" />
          </div>
        )}
      </div>
    </div>
  );
}
