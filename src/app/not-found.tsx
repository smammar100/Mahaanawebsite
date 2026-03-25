import Link from "next/link";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";
import { Container } from "@/components/layout/Container";
import { cleanCopy } from "@/lib/copy-utils";

export const metadata: Metadata = buildPageMetadata({
  title: "Page Not Found | Mahaana",
  description:
    "Sorry, the page you're looking for doesn't exist. Explore Mahaana's investment products and tools.",
  noIndex: true,
});

export default function NotFound() {
  return (
    <div className="bg-surface-bg min-h-[60vh] flex items-center">
      <Container className="text-center px-4">
        <h1 className="text-6xl font-semibold text-text-primary mb-4">404</h1>
        <p className="text-xl text-text-tertiary mb-8">
          {cleanCopy("This page doesn't exist. Let's get you back on track.")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-system-brand text-white px-6 py-3 font-medium hover:bg-system-brand/90 transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/save-plus"
            className="inline-flex items-center justify-center rounded-xl border border-surface-stroke px-6 py-3 font-medium text-text-primary hover:bg-surface-card transition-colors"
          >
            Explore Save+
          </Link>
          <Link
            href="/help-center"
            className="inline-flex items-center justify-center rounded-xl border border-surface-stroke px-6 py-3 font-medium text-text-primary hover:bg-surface-card transition-colors"
          >
            Help Center
          </Link>
        </div>
      </Container>
    </div>
  );
}
