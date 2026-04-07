"use client";

import { H3 } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";

export function AboutFigmaStats() {
  const graphCurvePath =
    "M0,258 C140,256 265,248 385,228 C515,205 640,164 758,113 C850,74 928,31 1000,2";
  const graphAreaPath = `${graphCurvePath} L1000,260 L0,260 Z`;
  const lineXs = Array.from({ length: 17 }, (_, i) => ((i + 1) * 1000) / 18);

  return (
    <section className={cn("section-y pt-0")}>
      <div className="mx-auto w-full max-w-[1100px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="relative isolate overflow-hidden rounded-2xl border border-surface-stroke bg-surface-card">
          <div className="relative z-10 flex flex-col px-6 pt-10 pb-28 sm:px-8 sm:pt-12 sm:pb-36 md:px-10 md:pb-36">
            <p className="mb-4 text-label text-system-brand">About Us</p>
            <H3 className="mb-12 max-w-4xl text-text-primary sm:mb-16">
              Our mission is to remove complexity from investing and empower you to grow your wealth with confidence whether you&rsquo;re saving, investing, or trading.
            </H3>
            <div className="relative grid max-w-2xl gap-4 pb-6 sm:grid-cols-2 sm:gap-5">
              <article className="flex flex-col gap-1 rounded-xl">
                <p className="text-4xl font-semibold text-text-primary">
                  1,000,000+
                </p>
                <p className="text-body text-text-tertiary">Diagnoses Made</p>
              </article>
              <article className="flex flex-col gap-1 rounded-xl">
                <p className="text-4xl font-semibold text-text-primary">
                  95%
                </p>
                <p className="text-body text-text-tertiary">Diagnostic Accuracy</p>
              </article>
              <article className="flex flex-col gap-1 rounded-xl">
                <p className="text-4xl font-semibold text-text-primary">
                  3,000+
                </p>
                <p className="text-body text-text-tertiary">Healthcare Providers</p>
              </article>
              <article className="flex flex-col gap-1 rounded-xl">
                <p className="text-4xl font-semibold text-text-primary">
                  2.5s
                </p>
                <p className="text-body text-text-tertiary">Latency</p>
              </article>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-44 sm:h-52 md:h-60">
            <svg
              viewBox="0 0 1000 260"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
              aria-hidden
            >
              <defs>
                <linearGradient id="stats-curve-fill" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="var(--color-system-brand)" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="var(--color-system-brand)" stopOpacity="0.03" />
                </linearGradient>
                <clipPath id="stats-curve-clip">
                  <path d={graphAreaPath} />
                </clipPath>
              </defs>

              <g clipPath="url(#stats-curve-clip)">
                {lineXs.map((x) => (
                  <line
                    key={x}
                    x1={x}
                    y1="260"
                    x2={x}
                    y2="0"
                    stroke="currentColor"
                    strokeOpacity="0.12"
                    strokeWidth="1"
                    strokeDasharray="7 7"
                  />
                ))}
              </g>

              <path
                d={graphAreaPath}
                fill="url(#stats-curve-fill)"
                className="text-foreground"
              />
              <path
                d={graphCurvePath}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                className="text-foreground/50"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
