import type { Metadata, Viewport } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { LayoutContent } from "@/components/layout/LayoutContent";
import StructuredData from "@/components/StructuredData";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body-sans",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mahaana.netlify.app"),
  title: "Mahaana — Changing the way Pakistanis Invest",
  description:
    "Mahaana is Pakistan's leading SECP-licensed, Shariah-compliant investment platform. Earn daily returns, plan your retirement, and grow your wealth — starting from PKR 5,000.",
  keywords: [
    "investment pakistan",
    "shariah compliant investment",
    "mahaana",
    "mutual funds",
    "retirement planning",
    "SECP licensed",
    "daily returns",
  ],
  openGraph: {
    title: "Mahaana — Changing the way Pakistanis Invest",
    description:
      "Pakistan's #1 SECP-licensed, Shariah-compliant investment platform. Earn daily returns, cut your tax bill by 20%, and invest from PKR 5,000.",
    type: "website",
    url: "https://mahaana.netlify.app/",
    siteName: "Mahaana",
    images: [
      {
        url: "/images/invest/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Mahaana Investment Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahaana — Changing the way Pakistanis Invest",
    description:
      "Pakistan's #1 SECP-licensed investment platform. Earn daily, save smart, retire rich.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://mahaana.netlify.app/" },
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
    <html lang="en" suppressHydrationWarning className={`${outfit.variable} ${dmSans.variable}`}>
      <head>
        <link rel="preload" href="/images/invest/Logo.svg" as="image" />
      </head>
      <body className="antialiased flex min-h-screen flex-col">
        <StructuredData />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <LayoutContent>{children}</LayoutContent>
        </ThemeProvider>
      </body>
    </html>
  );
}
