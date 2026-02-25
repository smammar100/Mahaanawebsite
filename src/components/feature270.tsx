"use client";

import {
  Cpu,
  LineChart,
  Moon,
  PieChart,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const features: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
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
      "We invest only in 100% Shariah compliant products. We are also endorsed by Al Hilal.",
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

interface Feature270Props {
  className?: string;
}

const Feature270 = ({ className }: Feature270Props) => {
  return (
    <section
      className={cn(
        "w-full bg-background py-8 md:py-12 lg:py-16",
        className,
      )}
    >
      <div className="page-container flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <div className="w-fit rounded-2xl bg-brand-50 px-2 py-0.5">
              <span className="body-xs font-medium text-brand-700">
                Why Mahaana?
              </span>
            </div>
            <h2 className="font-heading font-semibold text-foreground">
              All in one, Shariah Compliant Investment Platform
            </h2>
          </div>
          <p className="body-lg max-w-[75ch] font-body text-muted-foreground">
            Our features are designed to be easy to use and integrate.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="flex flex-1 flex-col items-start gap-5 text-left"
              >
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border-2 border-brand-50 bg-brand-100">
                  <IconComponent
                    className="size-6 text-brand-600"
                    aria-hidden
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="body-lg font-body font-medium text-foreground">
                    {feature.title}
                  </p>
                  <p className="body-md font-body text-muted-foreground">
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

export { Feature270 };
