"use client";

import dynamic from "next/dynamic";
import { AppStoreButton, GooglePlayButton } from "@/components/base/buttons/app-store-buttons";
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
}

const defaultAvatars = [
  "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=50",
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=50",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=50&h=50&auto=format&fit=crop",
];

export function CallToAction1({
  className,
  badgeText = "Join community of 20K+ investors",
  headline = (
    <>
      We're changing the way Pakistanis Save
      <br className="hidden md:block" />
      & Invest every day
    </>
  ),
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
        <H2 className="mt-5 max-w-xl text-[2rem] font-semibold leading-tight text-gray-100 sm:text-[2.5rem] sm:leading-[1.2] lg:text-h2">
          {headline}
        </H2>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:mt-8 sm:flex-row sm:gap-4">
          <AppStoreButton size="lg" className="shrink-0" />
          <GooglePlayButton size="lg" className="shrink-0" />
        </div>
      </div>
    </div>
  );
}
