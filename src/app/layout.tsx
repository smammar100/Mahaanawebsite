import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Mahaana",
  description: "Mahaana - Responsive Next.js website",
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
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased flex min-h-screen flex-col overflow-x-hidden">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Header />
          <main className="flex-1 pt-[calc(4.5rem+env(safe-area-inset-top,0px))]">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
