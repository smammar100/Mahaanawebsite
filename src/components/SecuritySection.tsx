"use client";

import { Check, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

const savePlusChecklist = [
  "Build wealth securely with low-risk, optimized funds",
  "Completely liquid—withdraw your money anytime you want",
  "Secure, SECP-regulated, and built for your peace of mind",
];

const retirementChecklist = [
  "Claim up to a 20% income tax credit on your contributions",
  "100% Shariah-compliant, expert-curated portfolios",
  "Personalized to your unique risk level and retirement goals",
];

function CheckIcon({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex size-7 shrink-0 items-center justify-center rounded-xl bg-brand-100",
        className,
      )}
      aria-hidden
    >
      <Check className="size-4 text-brand-600" />
    </div>
  );
}

export default function SecuritySection() {
  return (
    <section
      id="security"
      aria-labelledby="section-heading"
      className="w-full bg-gradient-to-b from-brand-800 to-brand-950 py-8 md:py-16 lg:py-16"
    >
      <div className="page-container flex flex-col gap-14">
        {/* Header - Figma 2627-4801 */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col gap-3">
            <div className="flex justify-center">
              <div className="rounded-2xl bg-brand-50 px-2 py-0.5">
                <span className="body-xs font-medium text-brand-700">
                  What we offer
                </span>
              </div>
            </div>
            <h2
              id="section-heading"
              className="font-heading text-center font-semibold text-white"
            >
              Find the Perfect Way to Invest
            </h2>
          </div>
          <p className="body-lg mx-auto max-w-[65ch] text-center font-body text-white/90">
            Everyone invests differently that&apos;s why Mahaana gives you
            options that fit your goals, lifestyle, and pace.
          </p>
        </div>

        {/* Block 1: Text left, image right */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-12">
          <div className="flex flex-1 flex-col gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border-2 border-brand-50 bg-brand-100 p-2">
                <Image
                  src="/images/save+.svg"
                  alt=""
                  width={32}
                  height={32}
                  aria-hidden
                />
              </div>
              <div className="flex flex-col gap-4">
                <h4
                  id="saveplus-heading"
                  className="font-heading text-xl font-semibold text-white md:text-2xl"
                >
                  High-yield savings, without the bank restrictions.
                </h4>
                <p className="body-md font-body text-white/80">
                  Protect your purchasing power and build your safety net. Save+
                  gives you access to institutional-level, low-risk funds that
                  deliver steady growth, all with the flexibility to access your
                  money whenever you need it.
                </p>
              </div>
            </div>
            <ul className="flex flex-col gap-4 pl-0">
              {savePlusChecklist.map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckIcon />
                  <span className="body-md font-body text-white/80">{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/save-plus"
              className="inline-flex min-h-[44px] w-fit items-center gap-2 body-md font-medium text-white transition-colors hover:text-white/90 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Learn more about Mahaana Save+
              <ChevronRight className="size-5 shrink-0" aria-hidden />
            </Link>
          </div>
          <div className="relative w-full shrink-0 lg:min-h-0 lg:w-1/2">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-border bg-muted shadow-[0px_32px_64px_-12px_rgba(16,24,40,0.14)] lg:aspect-auto lg:h-full">
              <Image
                src="/images/Save+.png"
                alt="Save+ product screenshot"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>

        {/* Block 2: Image left, text right - Retirement */}
        <div className="flex flex-col gap-6 lg:flex-row lg:flex-row-reverse lg:items-stretch lg:gap-12">
          <div className="flex flex-1 flex-col gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border-2 border-brand-50 bg-brand-100 p-2">
                <Image
                  src="/images/retirement.svg"
                  alt=""
                  width={32}
                  height={32}
                  aria-hidden
                />
              </div>
              <div className="flex flex-col gap-4">
                <h4
                  id="retirement-heading"
                  className="font-heading text-xl font-semibold text-white md:text-2xl"
                >
                  Build your future. Cut your tax bill by up to 20%.
                </h4>
                <p className="body-md font-body text-white/80">
                  Grow your long-term savings with a Shariah-compliant,
                  tax-efficient retirement plan. We build a personalized
                  portfolio based on your goals, allowing you to build wealth
                  securely while significantly reducing your monthly income tax.
                </p>
              </div>
            </div>
            <ul className="flex flex-col gap-4 pl-0">
              {retirementChecklist.map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckIcon />
                  <span className="body-md font-body text-white/80">{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/services#retirement"
              className="inline-flex min-h-[44px] w-fit items-center gap-2 body-md font-medium text-white transition-colors hover:text-white/90 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Learn more about Mahaana retirement
              <ChevronRight className="size-5 shrink-0" aria-hidden />
            </Link>
          </div>
          <div className="relative w-full shrink-0 lg:min-h-0 lg:w-1/2">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-border bg-muted shadow-[0px_32px_64px_-12px_rgba(16,24,40,0.14)] lg:aspect-auto lg:h-full">
              <Image
                src="/images/retirement.png"
                alt="Retirement product screenshot"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
