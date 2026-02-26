"use client";

import { cn } from "@/lib/utils";
import { FeatureSteps } from "@/components/FeatureSteps";

const featuresData = [
  {
    step: "Step 1",
    title: "Sign up & answer a few questions",
    content:
      "Create your account in minutes. No paperwork, no branches—100% digital.",
    image: "/images/Step 1.png",
    buttonLabel: "Get started",
    buttonHref: "#",
  },
  {
    step: "Step 2",
    title: "Fund your account",
    content:
      "Add funds and set your goals. Schedule contributions and customize your portfolio.",
    image: "/images/Step 2.png",
    buttonLabel: "Add funds",
    buttonHref: "#",
  },
  {
    step: "Step 3",
    title: "Voilà! Watch your savings grow",
    content:
      "Watch your savings grow. Track daily returns and enjoy Shariah-compliant growth.",
    image: "/images/Step 3.png",
    buttonLabel: "Learn more",
    buttonHref: "#",
  },
];

interface Feature132Props {
  className?: string;
}

const Feature132 = ({ className }: Feature132Props) => {
  return (
    <section
      className={cn(
        "w-full bg-background py-8 md:py-16 lg:py-16",
        className,
      )}
    >
      <div className="page-container flex flex-col items-start justify-start gap-10 text-left">
        <div className="flex flex-col items-start justify-start gap-4">
          <div className="w-fit rounded-2xl bg-brand-50 px-2 py-0.5">
            <span className="body-xs font-medium text-brand-700">
              Get started with Mahaana
            </span>
          </div>
          <h2 className="font-heading text-left font-semibold text-foreground">
            Open your Mahaana account
            <br />
            in just less than 10 mins
          </h2>
          <p className="body-lg text-left text-muted-foreground">
            Investing your money shouldn&apos;t take weeks to figure out.
            <br />
            Here&apos;s what you can achieve with Mahaana from day one.
          </p>
        </div>
        <FeatureSteps
          features={featuresData}
          title=""
          autoPlayInterval={3000}
        />
      </div>
    </section>
  );
};

export { Feature132 };
