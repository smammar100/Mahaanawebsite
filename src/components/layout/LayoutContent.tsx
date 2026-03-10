"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");

  if (isStudio) {
    return <>{children}</>;
  }

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10000002] focus:w-auto focus:h-auto focus:overflow-visible focus:bg-purple-600 focus:text-white focus:px-4 focus:py-2 focus:rounded focus:[clip:auto] focus:whitespace-normal"
      >
        Skip to main content
      </a>
      <Header />
      <main
        id="main-content"
        className="flex-1 pt-[calc(4.5rem+env(safe-area-inset-top,0px))]"
      >
        {children}
      </main>
      <Footer />
    </>
  );
}
