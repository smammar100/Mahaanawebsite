import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/metadata";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = buildPageMetadata({
  title: "Sitemap | Mahaana",
  description: "Browse all pages on Mahaana — products, funds, tools, investor education, and company information.",
  path: "site-map",
  noIndex: true,
});

const SITEMAP_GROUPS: { heading: string; links: { href: string; label: string }[] }[] = [
  {
    heading: "Products & Funds",
    links: [
      { href: "/", label: "Home" },
      { href: "/save-plus", label: "Save+" },
      { href: "/retirement", label: "Retirement" },
      { href: "/micf", label: "MICF" },
      { href: "/miietf", label: "MIIETF" },
      { href: "/miirf", label: "MIIRF" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { href: "/investment-calculator", label: "Saving Calculator" },
      { href: "/retirement-calculator", label: "Retirement Calculator" },
      { href: "/investor-education", label: "Investor Education" },
      { href: "/help-center", label: "Help Center" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/security", label: "Security" },
      { href: "/reviews", label: "Reviews" },
      { href: "/careers", label: "Careers" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { href: "/legal", label: "Legal" },
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms-conditions", label: "Terms & Conditions" },
    ],
  },
];

export default function SitemapPage() {
  return (
    <main className="min-h-screen bg-surface-bg py-12 md:py-16">
      <Container className="max-w-[65ch] readable-line-length">
        <h1 className="mb-2 text-2xl font-semibold text-text-primary">Sitemap</h1>
        <p className="mb-8 text-text-secondary">
          A list of all main pages on Mahaana. For search engines, use the{" "}
          <Link href="/sitemap.xml" className="text-system-brand underline underline-offset-2 hover:no-underline">
            XML sitemap
          </Link>
          .
        </p>
        <nav aria-label="Sitemap" className="flex flex-col gap-8">
          {SITEMAP_GROUPS.map((group) => (
            <section key={group.heading}>
              <h2 className="mb-3 font-body text-sm font-semibold uppercase tracking-wide text-text-tertiary">
                {group.heading}
              </h2>
              <ul className="flex flex-col gap-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-text-primary underline underline-offset-2 hover:text-system-brand hover:no-underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </nav>
      </Container>
    </main>
  );
}
