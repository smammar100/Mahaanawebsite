import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { Container } from "./Container";
import { H4, TextSmall } from "@/components/ui/Typography";
import { cleanCopy } from "@/lib/copy-utils";

type RegulatoryBadge = {
  label: string;
  title: string;
  imageSrc?: string;
  imageAlt?: string;
};

const REGULATORY_BADGES: RegulatoryBadge[] = [
  {
    label: "MEMBER OF",
    title: "Mutual Funds Association of Pakistan (MUFAP)",
    imageSrc: "/images/invest/MUFAP.svg",
    imageAlt: "MUFAP",
  },
  {
    label: "LICENSED BY",
    title: "Securities & Exchange Commission of Pakistan (SECP)",
    imageSrc: "/images/invest/SECP%20logo%20color.svg",
    imageAlt: "SECP",
  },
  {
    label: "CUSTODIAN",
    title: "Central Depository Company (CDC)",
    imageSrc: "/images/invest/CDC%20color.svg",
    imageAlt: "CDC",
  },
];

function RegulatoryBadgeCard({ badge }: { badge: RegulatoryBadge }) {
  return (
    <div className="flex min-w-0 max-w-[220px] flex-1 items-center gap-2.5 rounded-lg border border-surface-stroke bg-white px-3 py-2.5 sm:max-w-none sm:gap-3 sm:px-3.5">
      {badge.imageSrc ? (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-md border border-surface-stroke/20 bg-white">
          <Image
            src={badge.imageSrc}
            alt={badge.imageAlt ?? ""}
            width={36}
            height={36}
            className="h-8 w-8 object-contain"
          />
        </div>
      ) : (
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-surface-stroke/25 bg-surface-bg text-[10px] font-semibold leading-tight text-text-tertiary"
          aria-hidden
        >
          MUFAP
        </div>
      )}
      <div className="min-w-0 flex-1">
        <TextSmall
          weight="medium"
          className="text-[10px] uppercase leading-tight tracking-wide text-text-tertiary sm:text-[11px]"
        >
          {badge.label}
        </TextSmall>
        <TextSmall
          weight="semibold"
          className="mt-0.5 block text-[11px] leading-snug text-text-primary sm:text-xs"
        >
          {badge.title}
        </TextSmall>
      </div>
    </div>
  );
}

function NavColumn({
  heading,
  links,
}: {
  heading: ReactNode;
  links: { href: string; label: string }[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-nav-heading font-semibold text-text-primary max-[768px]:mb-1 md:mb-0">
        {heading}
      </div>
      <ul className="flex flex-col gap-2">
        {links.map(({ href, label }) => (
          <li key={label}>
            <Link
              href={href}
              className="text-body-sm text-text-tertiary transition-colors hover:text-text-primary max-[768px]:block max-[768px]:py-0.5"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

const SECP_BANNER_SRC = "/images/invest/SECP%20banner.jpg";

/** Vertical rhythm between footer blocks (1.5rem top + bottom) */
const footerSubsectionY = "py-[1.5rem]";

function InvestorComplaintsBanner() {
  return (
    <section
      className="overflow-hidden rounded-2xl shadow-lg shadow-black/10 ring-1 ring-black/10"
      aria-label={cleanCopy(
        "Securities and Exchange Commission of Pakistan — investor complaints: toll-free 0800-88008; file complaints online at sdms.secp.gov.pk"
      )}
    >
      <Image
        src={SECP_BANNER_SRC}
        alt={cleanCopy(
          "SECP investor complaints banner: toll-free 0800-88008 and online complaint filing at sdms.secp.gov.pk"
        )}
        width={1100}
        height={200}
        className="h-auto w-full object-contain"
        sizes="(max-width: 1100px) 100vw, 1100px"
      />
    </section>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer role="contentinfo" className="mt-auto border-t border-surface-stroke bg-surface-card">
      <Container className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {/* Logo + regulatory badges */}
        <div
          className={`flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12 ${footerSubsectionY}`}
        >
          <div className="flex flex-col gap-5 lg:max-w-xs lg:shrink-0">
            <Link
              href="/"
              className="flex w-fit items-center"
              aria-label="Mahaana home"
            >
              <Image
                src="/images/invest/Logo.svg"
                alt="Mahaana"
                width={146}
                height={24}
                className="h-6 w-auto"
              />
            </Link>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="https://www.youtube.com/@mahaanawealth"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-text-tertiary transition-colors hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system-brand"
              >
                <svg
                  className="size-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/mahaanawealth"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-text-tertiary transition-colors hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system-brand"
              >
                <svg
                  className="size-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/mahaanawealth?igshid=OGQ5ZDc2ODk2ZA%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-text-tertiary transition-colors hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system-brand"
              >
                <svg
                  className="size-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/mahaana/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-text-tertiary transition-colors hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system-brand"
              >
                <svg
                  className="size-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-end lg:min-w-0 lg:flex-1 lg:justify-end">
            {REGULATORY_BADGES.map((badge) => (
              <RegulatoryBadgeCard key={badge.label} badge={badge} />
            ))}
          </div>
        </div>

        {/* Four-column navigation */}
        <div
          className={`grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-8 md:grid-cols-2 lg:grid-cols-4 ${footerSubsectionY}`}
        >
          <NavColumn
            heading="Our products"
            links={[
              { href: "/save-plus", label: "Save+" },
              { href: "/retirement", label: "Retirement" },
              { href: "/micf", label: "MICF" },
              { href: "/miietf", label: "MIIETF" },
              { href: "/miirf", label: "MIIRF" },
            ]}
          />
          <NavColumn
            heading="Company"
            links={[
              { href: "/about", label: "About us" },
              { href: "/careers", label: "Careers" },
              { href: "/security", label: "Security" },
              { href: "/legal", label: "Legal information" },
            ]}
          />
          <NavColumn
            heading="Resources"
            links={[
              { href: "/investor-education", label: "Investor education" },
              { href: "/investment-calculator", label: "Investment calculator" },
              { href: "/legal", label: "Policies" },
            ]}
          />
          <NavColumn
            heading="Support / Help"
            links={[
              { href: "/help-center", label: "FAQs" },
              { href: "/contact", label: "Contact us" },
            ]}
          />
        </div>

        <div className={footerSubsectionY}>
          <InvestorComplaintsBanner />
        </div>

        {/* Disclaimers & licenses */}
        <div className={`space-y-4 ${footerSubsectionY}`}>
          <H4 className="text-text-primary">
            {cleanCopy("Disclaimers & licenses")}
          </H4>
          <p className="text-body-xs leading-relaxed text-text-tertiary">
            {cleanCopy(
              "Mahaana Wealth Limited is a licensed Asset Management Company and Investment Advisor, registered as an NBFC (Non-Banking Financial Company) and regulated by the Securities & Exchange Commission of Pakistan (SECP). Central Depository Company (CDC) performs the custodial functions for Mahaana Wealth Limited products and funds."
            )}
          </p>
          <p className="text-body-xs leading-relaxed text-text-tertiary">
            {cleanCopy(
              "Past performance is not indicative of future results. All investments are subject to market risks. NAV / unit / stock prices may fluctuate based on market conditions."
            )}
          </p>
          <p className="text-body-xs leading-relaxed text-text-tertiary">
            {cleanCopy(
              "Should your concerns remain unresolved, you may file a complaint with SECP. It is important to note that SECP will only entertain complaints that were initially raised with Mahaana Wealth Limited."
            )}
          </p>
          <p className="text-body-xs leading-relaxed text-text-tertiary">
            {cleanCopy(
              "Investment products are not bank deposits and are not insured by a deposit protection scheme. Returns are not guaranteed and you may get back less than you invest. Please see our "
            )}
            <Link
              href="/terms-conditions"
              className="underline transition-colors hover:text-text-primary"
            >
              terms and conditions
            </Link>
            {cleanCopy(" and ")}
            <Link
              href="/privacy-policy"
              className="underline transition-colors hover:text-text-primary"
            >
              privacy policy
            </Link>
            {cleanCopy(".")}
          </p>
          <p className="text-body-xs text-text-tertiary">
            © {currentYear} Mahaana Wealth Limited. All rights reserved.
          </p>
        </div>
      </Container>

      {/* Edge-to-edge: breaks out of page max-width and horizontal padding */}
      <div
        className="relative left-1/2 mt-8 w-screen max-w-none -translate-x-1/2 sm:mt-10"
        aria-hidden
      >
        <Image
          src="/images/invest/Pakistan%20Places%20-%20SVG%202.svg"
          alt=""
          width={1190}
          height={107}
          className="h-auto w-full object-cover object-center opacity-60"
        />
      </div>
    </footer>
  );
}
