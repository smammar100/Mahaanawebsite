import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { LayoutContent } from "@/components/layout/LayoutContent";
import StructuredData from "@/components/StructuredData";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600"],
});

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" href="/images/invest/Logo.svg" as="image" />
        <link rel="preload" href="/images/invest/hero-bg.webp" as="image" />
        <script
          src="https://cdn.visitors.now/v.js"
          data-token="dcfcb5a6-7e2c-4f1f-be4c-e5007e3521e4"
        />
        {process.env.NODE_ENV === "development" ? (
          <style>{`nextjs-portal { display: none !important; }`}</style>
        ) : null}
      </head>
      <body className="antialiased flex min-h-screen flex-col">
        <StructuredData />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <LayoutContent>{children}</LayoutContent>
        </ThemeProvider>
      </body>
    </html>
  );
}
