"use client";

import {
  Cpu,
  LineChart,
  Moon,
  PieChart,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

import { SparklesCore } from "@/components/shadcnblocks/sparkles";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Cpu,
    title: "100% Digital setup",
    description:
      "Open an account in under 10 minutes. No paperwork, no branches.",
  },
  {
    icon: RefreshCw,
    title: "Auto Invest",
    description:
      "Schedule contributions and watch your savings grow effortlessly.",
  },
  {
    icon: LineChart,
    title: "Daily profit updates",
    description:
      "Track daily returns with transparent reporting and instant growth net worth.",
  },
  {
    icon: Moon,
    title: "Fully Shariah Compliant",
    description:
      "We invest only in 100% Shariah compliant products. We are also endorsed by Al Hilal",
  },
  {
    icon: ShieldCheck,
    title: "Data & Fund protection",
    description:
      "Bank-grade encryption, CDC custody, and SECP regulation at your back.",
  },
  {
    icon: PieChart,
    title: "Smart Portfolio Rebalancing",
    description:
      "We optimize your portfolio to keep it aligned with your goals.",
  },
];

interface Feature128Props {
  className?: string;
}

const Feature128 = ({ className }: Feature128Props) => {
  return (
    <section
      className={cn(
        "relative w-full overflow-hidden py-32",
        className,
      )}
      style={{ backgroundColor: "#1a0a2e" }}
    >
      <div className="relative mx-auto flex h-full w-full flex-col items-center justify-center text-center">
        <div className="w-full">
          <h2 className="font-heading relative z-20 w-full text-white">
            All in one, Shariah Compliant Investment Platform
          </h2>
          <p className="body-xl mt-4 font-normal text-white/80">
            Our features are designed to be easy to use and integrate.
          </p>
        </div>

        {/* Decorative divider: gradient lines + SparklesCore + mask overlay */}
        <div className="relative mt-5 mb-10 h-20 w-full max-w-[40rem] overflow-visible">
          <div className="absolute inset-0 z-0 h-full w-full">
            <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={500}
              className="h-full w-full"
              particleColor="#FFFFFF"
            />
          </div>
          <div
            className="absolute inset-0 z-10 h-10 w-full [mask-image:radial-gradient(350px_80px_at_top,transparent_20%,white)]"
            style={{ backgroundColor: "#1a0a2e" }}
            aria-hidden
          />
          <div className="absolute inset-0 z-20 pointer-events-none" aria-hidden>
            <div className="absolute inset-x-20 top-0 h-[2px] w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm" />
            <div className="absolute inset-x-20 top-0 h-px w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
            <div className="absolute inset-x-60 top-0 h-[5px] w-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent blur-sm" />
            <div className="absolute inset-x-60 top-0 h-px w-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
          </div>
        </div>

        <div className="grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 [&>div]:justify-self-center">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="flex max-w-sm gap-4 text-left">
                <IconComponent
                  className="w-12 shrink-0 stroke-1 text-sky-400"
                  aria-hidden
                />
                <div className="space-y-2">
                  <h4 className="body-xl font-body font-medium text-white">
                    {feature.title}
                  </h4>
                  <p className="body-md text-white/70">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export { Feature128 };
