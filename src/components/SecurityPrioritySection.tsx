"use client";

import { ChevronRight, Fingerprint, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { EvervaultCard } from "@/components/ui/evervault-card";

const ICON_COLOR = "#312361";

const securityCards = [
  {
    type: "image" as const,
    src: "/images/SECP logo.svg",
    alt: "SECP",
    description: "Licensed by Security Exchange Commission Pakistan (SECP)",
  },
  {
    type: "image" as const,
    src: "/images/CDC logo.svg",
    alt: "CDC",
    description: "Custodians Central Depository Company (CDC)",
  },
  {
    type: "icon" as const,
    icon: Fingerprint,
    description: "2FA adds an extra layer of security to safeguard your account.",
  },
  {
    type: "icon" as const,
    icon: Lock,
    description:
      "Custom security. Bank-grade encryption. 24/7 protection from fraud.",
  },
];

export default function SecurityPrioritySection() {
  return (
    <section
      aria-labelledby="security-priority-heading"
      className="w-full bg-background py-8 md:py-16 lg:py-16"
    >
      <div className="page-container">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-20">
          {/* Left column: content */}
          <div className="flex min-w-0 flex-1 flex-col gap-5">
            <div className="flex flex-col gap-3">
              <div className="w-fit rounded-2xl bg-brand-50 px-2 py-0.5">
                <span className="body-xs font-medium text-brand-700">
                  How secure is Mahaana?
                </span>
              </div>
              <div className="flex flex-col gap-5">
                <h2
                  id="security-priority-heading"
                  className="font-heading font-semibold text-foreground"
                >
                  Your security is our #1 priority
                </h2>
                <p className="body-lg max-w-[65ch] font-body text-muted-foreground">
                  Every layer of Mahaana is engineered to meet the highest
                  standards of data protection and security
                </p>
              </div>
            </div>
            <Link
              href="#security"
              className="flex min-h-[44px] items-center gap-2 body-md font-medium text-foreground transition-colors hover:text-foreground/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
              aria-label="Learn more about Mahaana security"
            >
              Learn more about Mahaana security
              <ChevronRight className="size-5 shrink-0" aria-hidden />
            </Link>
          </div>

          {/* Right column: 4 cards */}
          <div className="grid min-w-0 flex-1 grid-cols-1 gap-4 md:grid-cols-2">
            {securityCards.map((card) => {
              const Icon = card.type === "icon" ? card.icon : null;
              return (
                <EvervaultCard
                  key={card.description.slice(0, 20)}
                  className="flex w-full min-w-0 flex-col items-center justify-center gap-5 rounded-2xl bg-[#fafafa] text-center"
                >
                  <div className="flex flex-col items-center gap-5">
                    <div
                      className="flex size-[74px] shrink-0 items-center justify-center"
                      aria-hidden
                    >
                    {card.type === "image" ? (
                      <Image
                        src={card.src}
                        alt={card.alt}
                        width={74}
                        height={74}
                        className="object-contain"
                      />
                    ) : Icon ? (
                      <Icon
                        className="size-10"
                        style={{ color: ICON_COLOR }}
                        strokeWidth={1.5}
                      />
                        ) : null}
                    </div>
                    <p className="body-sm font-body text-foreground">
                      {card.description}
                    </p>
                  </div>
                </EvervaultCard>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
