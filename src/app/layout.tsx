import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { LayoutContent } from "@/components/layout/LayoutContent";
import StructuredData from "@/components/StructuredData";

const outfit = localFont({
  src: "../../node_modules/@fontsource-variable/outfit/files/outfit-latin-wght-normal.woff2",
  display: "swap",
  variable: "--font-outfit",
  weight: "100 900",
});

/** LCP hero raster preload path served from public assets. */
const heroBgPreloadHref = "/images/invest/hero-bg.webp";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mahaana.com"),
  title: "Mahaana — Changing the way Pakistanis Invest",
  description:
    "Mahaana is Pakistan's leading SECP-licensed, Shariah compliant investment platform. Earn daily returns, plan your retirement, and grow your wealth — starting from PKR 5,000.",
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={outfit.variable}>
      <head>
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <link rel="alternate" type="text/plain" title="LLM site hints" href="/llms.txt" />
        <link rel="preload" href="/images/invest/Logo.svg" as="image" />
        <link rel="preload" href={heroBgPreloadHref} as="image" type="image/webp" />
        {process.env.NODE_ENV === "development" ? (
          <style>{`nextjs-portal { display: none !important; }`}</style>
        ) : null}
      </head>
      <body className="antialiased flex min-h-screen flex-col">
        <StructuredData />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <LayoutContent>{children}</LayoutContent>
        </ThemeProvider>
        <script
          defer
          src="https://cdn.visitors.now/v.js"
          data-token="dcfcb5a6-7e2c-4f1f-be4c-e5007e3521e4"
        />
      </body>
    </html>
  );
}
