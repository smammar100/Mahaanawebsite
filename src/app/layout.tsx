import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Mahaana",
  description: "Mahaana website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="untitled-brand">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap"
        />
      </head>
      <body className="min-h-screen antialiased flex flex-col w-full h-fit">
        <header className="border-b border-border w-full">
          <div className="page-container py-4 flex items-center justify-between">
            <Link href="/" className="h6 font-heading text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground rounded">
              Mahaana
            </Link>
            <Nav />
          </div>
        </header>
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
