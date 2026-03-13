import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { Container } from "./Container";
import {
  AppStoreButton,
  GooglePlayButton,
} from "@/components/base/buttons/app-store-buttons";

function NavColumn({
  heading,
  links,
  subheading = false,
}: {
  heading: ReactNode;
  links: { href: string; label: string }[];
  subheading?: boolean;
}) {
  return (
    <div className="flex flex-col gap-4">
      <h3
        className={
          subheading
            ? "font-body text-tiny font-semibold uppercase tracking-wide text-text-secondary max-[768px]:text-xs max-[768px]:font-bold max-[768px]:uppercase max-[768px]:tracking-[0.08em] max-[768px]:text-text-primary max-[768px]:mb-3 md:mb-0"
            : "font-heading text-small font-semibold tracking-heading text-text-primary max-[768px]:text-xs max-[768px]:font-bold max-[768px]:uppercase max-[768px]:tracking-[0.08em] max-[768px]:text-text-primary max-[768px]:mb-3 md:mb-0"
        }
      >
        {heading}
      </h3>
      <ul className="flex flex-col gap-2">
        {links.map(({ href, label }) => (
          <li key={label}>
            <Link
              href={href}
              className="font-body text-small text-text-tertiary transition-colors hover:text-text-primary max-[768px]:block max-[768px]:text-sm max-[768px]:font-normal max-[768px]:text-text-tertiary max-[768px]:py-1 max-[768px]:leading-[1.5]"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer role="contentinfo" className="mt-auto border-t border-surface-stroke bg-surface-card">
      <Container className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {/* Top section: logo + app buttons | nav grid */}
        <div className="flex flex-col gap-6 py-8 sm:py-10 md:py-12 lg:gap-6 lg:py-14 xl:flex-row xl:items-start xl:gap-12 xl:pt-14 xl:pb-4">
          {/* Left: logo + app buttons + social */}
          <div className="flex flex-col gap-6 xl:min-w-0 xl:max-w-sm xl:shrink-0">
            <Link
              href="/"
              className="flex items-center"
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
            <div className="flex flex-row gap-3">
              <AppStoreButton href="#" className="shrink-0" />
              <GooglePlayButton href="#" className="shrink-0" />
            </div>
            <div className="flex items-center gap-4">
              <a
                href="#"
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
                href="#"
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
                href="#"
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
            </div>
          </div>

          {/* Right: 5-column nav grid (2 cols on mobile) */}
          <div className="grid flex-1 grid-cols-2 items-start gap-4 max-[768px]:gap-0 max-[768px]:[&>:nth-child(odd)]:border-r max-[768px]:[&>:nth-child(odd)]:border-surface-stroke md:grid-cols-2 xl:grid-cols-5">
            <div className="max-[768px]:border-b max-[768px]:border-surface-stroke max-[768px]:pt-5 max-[768px]:pr-4 max-[768px]:pb-5 max-[768px]:pl-0 md:border-0 md:p-0">
              <NavColumn
                heading="Products"
                links={[
                  { href: "/save-plus", label: "Save+" },
                  { href: "/retirement", label: "Retirement" },
                ]}
              />
            </div>
            <div className="max-[768px]:border-b max-[768px]:border-surface-stroke max-[768px]:pt-5 max-[768px]:pr-4 max-[768px]:pb-5 max-[768px]:pl-0 md:border-0 md:p-0">
              <NavColumn
                heading="Funds"
                links={[
                  { href: "/micf", label: "MICF" },
                  { href: "/miietf", label: "MIIETF" },
                  { href: "/miirf", label: "MIIRF" },
                ]}
              />
            </div>
            <div className="max-[768px]:border-b max-[768px]:border-surface-stroke max-[768px]:pt-5 max-[768px]:pr-4 max-[768px]:pb-5 max-[768px]:pl-0 md:border-0 md:p-0">
              <NavColumn
                heading="Tools"
                links={[
                  { href: "/retirement-calculator", label: "Retirement Calculator" },
                  { href: "/investment-calculator", label: "Savings Calculator" },
                ]}
              />
            </div>
            <div className="max-[768px]:border-b max-[768px]:border-surface-stroke max-[768px]:pt-5 max-[768px]:pr-4 max-[768px]:pb-5 max-[768px]:pl-0 md:border-0 md:p-0">
              <NavColumn
                heading="Investor Education"
                links={[
                  { href: "#", label: "Articles" },
                  { href: "/help-center", label: "Help Center" },
                ]}
              />
            </div>
            <div className="max-[768px]:border-b max-[768px]:border-surface-stroke max-[768px]:pt-5 max-[768px]:pr-4 max-[768px]:pb-5 max-[768px]:pl-0 md:border-0 md:p-0">
              <NavColumn
                heading="About"
                links={[
                  { href: "/about", label: "About" },
                  { href: "/security", label: "Security" },
                  { href: "#", label: "Reviews" },
                  { href: "#", label: "Careers" },
                  { href: "#", label: "Legal" },
                  { href: "#", label: "Investor Relations" },
                  { href: "#", label: "Sitemap" },
                  { href: "#", label: "Back to top" },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-surface-stroke" />

        {/* Legal section */}
        <div className="space-y-4 py-6 sm:py-8">
          <p className="font-body text-tiny leading-relaxed text-text-tertiary">
            Mahaana and its products are offered by Mahaana Capital (Pvt) Ltd.
            Investment products are not bank deposits and are not insured by the
            deposit protection scheme. Returns are not guaranteed and you may
            get back less than you invest.
          </p>
          <p className="font-body text-tiny leading-relaxed text-text-tertiary">
            Past performance is not a reliable indicator of future results. The
            information on this site is for general information only and does
            not constitute financial, tax or legal advice. Please see our{" "}
            <Link
              href="#"
              className="underline transition-colors hover:text-text-primary"
            >
              terms and conditions
            </Link>{" "}
            and{" "}
            <Link
              href="#"
              className="underline transition-colors hover:text-text-primary"
            >
              privacy policy
            </Link>
            .
          </p>
          <p className="font-body text-tiny leading-relaxed text-text-tertiary">
            © {currentYear} Mahaana. All rights reserved.
          </p>
          <ol className="list-inside list-decimal space-y-1 font-body text-tiny leading-relaxed text-text-tertiary">
            <li>
              Shariah compliance is subject to oversight by our Shariah advisory
              board. Product availability may vary by jurisdiction.
            </li>
            <li>
              App available on iOS and Android. Data rates may apply.
            </li>
            <li>
              Calculators and projections are for illustrative purposes only and
              do not constitute a guarantee of future performance.
            </li>
          </ol>
        </div>

        {/* SECP banner */}
        <div className="pb-6 sm:pb-8">
          <Image
            src="/images/invest/SECP%20banner.webp"
            alt="SECP regulatory banner"
            width={1100}
            height={120}
            className="h-auto w-full rounded-lg object-contain"
          />
        </div>
      </Container>
    </footer>
  );
}
