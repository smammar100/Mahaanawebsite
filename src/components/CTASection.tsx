"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const GOOGLE_PLAY_URL = "#";
const APP_STORE_URL = "#";

// Figma asset URLs (expire in ~7 days; replace with permanent assets in public/images/)
const AVATAR_URLS = [
  "https://www.figma.com/api/mcp/asset/7e70b755-d562-4e54-a24c-47b985fe26dd",
  "https://www.figma.com/api/mcp/asset/aec6345b-301b-48a9-a402-ffd9c6e3fdac",
  "https://www.figma.com/api/mcp/asset/08922cf8-8dea-4eac-9b4f-02d00e2be3d0",
  "https://www.figma.com/api/mcp/asset/75c83682-8edc-40c8-855d-b869ada78e5b",
];

const FLOATING_IMAGES = [
  { src: "https://www.figma.com/api/mcp/asset/9bcecba2-9db1-480a-91dd-7172b2215ffc", position: "top-left" },
  { src: "https://www.figma.com/api/mcp/asset/00e4588b-3373-48aa-b0a7-986738a75c53", position: "top-right" },
  { src: "https://www.figma.com/api/mcp/asset/0c3fccbe-168d-40ea-ae65-674c5be2a9f3", position: "mid-left" },
  { src: "https://www.figma.com/api/mcp/asset/c7641005-438d-4910-ab2c-872cf68a523e", position: "mid-right" },
  { src: "https://www.figma.com/api/mcp/asset/ea5de369-ab58-4c50-b013-00b29bd850ef", position: "bottom-left" },
  { src: "https://www.figma.com/api/mcp/asset/5da669d7-3a42-4290-af80-eb39b342c1b6", position: "bottom-right" },
];

export default function CTASection() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="relative w-full overflow-hidden py-8 md:py-16 lg:py-16"
    >
      {/* Floating images - hidden on mobile */}
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        <div className="absolute left-[4%] top-[15%] h-[160px] w-[160px] overflow-hidden rounded-2xl md:h-[140px] md:w-[140px] lg:h-[200px] lg:w-[200px]">
          <img
            src={FLOATING_IMAGES[0].src}
            alt=""
            className="size-full object-cover"
          />
        </div>
        <div className="absolute right-[4%] top-[15%] h-[160px] w-[240px] overflow-hidden rounded-2xl md:h-[140px] md:w-[200px] lg:h-[200px] lg:w-[280px]">
          <img
            src={FLOATING_IMAGES[1].src}
            alt=""
            className="size-full object-cover"
          />
        </div>
        <div className="absolute left-[6%] top-[45%] h-[140px] w-[140px] overflow-hidden rounded-2xl md:h-[120px] md:w-[120px] lg:h-[180px] lg:w-[180px]">
          <img
            src={FLOATING_IMAGES[2].src}
            alt=""
            className="size-full object-cover"
          />
        </div>
        <div className="absolute right-[6%] top-[45%] h-[140px] w-[140px] overflow-hidden rounded-2xl md:h-[120px] md:w-[120px] lg:h-[180px] lg:w-[180px]">
          <img
            src={FLOATING_IMAGES[3].src}
            alt=""
            className="size-full object-cover"
          />
        </div>
        <div className="absolute bottom-[20%] left-[3%] h-[120px] w-[180px] overflow-hidden rounded-2xl md:h-[100px] md:w-[150px] lg:h-[160px] lg:w-[220px]">
          <img
            src={FLOATING_IMAGES[4].src}
            alt=""
            className="size-full object-cover"
          />
        </div>
        <div className="absolute bottom-[20%] right-[3%] h-[120px] w-[180px] overflow-hidden rounded-2xl md:h-[100px] md:w-[150px] lg:h-[160px] lg:w-[220px]">
          <img
            src={FLOATING_IMAGES[5].src}
            alt=""
            className="size-full object-cover"
          />
        </div>
      </div>

      <div className="page-container relative z-10 px-8 md:px-16 lg:px-32">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-8 text-center">
          <div className="flex flex-col items-center gap-6">
            {/* Avatars + 10K+ users */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {AVATAR_URLS.map((url, i) => (
                  <div
                    key={i}
                    className={cn(
                      "relative overflow-hidden rounded-xl border-2 border-border",
                      "size-8 shrink-0",
                      i > 0 && "-ml-3",
                    )}
                  >
                    <Image
                      src={url}
                      alt=""
                      width={32}
                      height={32}
                      className="size-full object-cover"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
              <span className="body-sm font-medium text-muted-foreground">
                20K+ users
              </span>
            </div>

            <div className="flex flex-col gap-6">
              <h3
                id="cta-heading"
                className="max-w-[50ch] font-heading text-foreground"
              >
                Unlock your pathway
                <br />
                to financial freedom
              </h3>
              <p className="body-md w-full text-muted-foreground">
                Thousands of Pakistanis are already growing their savings daily.
                Your turn starts now.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:gap-2">
            <Link
              href={GOOGLE_PLAY_URL}
              className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground rounded-lg overflow-hidden opacity-90 transition-opacity hover:opacity-100"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/images/google-play-badge.png"
                alt="Get it on Google Play"
                className="h-10 w-auto sm:h-12"
                width={135}
                height={40}
              />
            </Link>
            <Link
              href={APP_STORE_URL}
              className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground rounded-lg overflow-hidden opacity-90 transition-opacity hover:opacity-100"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/images/app-store-badge.png"
                alt="Download on the App Store"
                className="h-10 w-auto sm:h-12"
                width={135}
                height={40}
              />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
