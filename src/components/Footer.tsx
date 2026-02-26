"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { FooterIcons } from "@/components/footer-icons";
import { FlickeringGrid } from "@/components/ui/flickering-grid";

const siteConfig = {
  hero: {
    description: "Shariah-compliant investing for Pakistan.",
  },
  footerLinks: [
    {
      title: "Company",
      links: [
        { id: 1, title: "About", url: "/about" },
        { id: 2, title: "Contact", url: "/contact" },
      ],
    },
    {
      title: "Products",
      links: [
        { id: 3, title: "Save+", url: "/services#save-plus" },
        { id: 4, title: "Retirement", url: "/services#retirement" },
        { id: 5, title: "All Products", url: "/services" },
      ],
    },
    {
      title: "Resources",
      links: [
        { id: 6, title: "Privacy Policy", url: "/privacy" },
        { id: 7, title: "Terms of Service", url: "/terms" },
      ],
    },
  ],
};

function useMediaQuery(query: string) {
  const [value, setValue] = useState(false);

  useEffect(() => {
    function checkQuery() {
      setValue(window.matchMedia(query).matches);
    }
    checkQuery();
    const mediaQuery = window.matchMedia(query);
    mediaQuery.addEventListener("change", checkQuery);
    window.addEventListener("resize", checkQuery);
    return () => {
      mediaQuery.removeEventListener("change", checkQuery);
      window.removeEventListener("resize", checkQuery);
    };
  }, [query]);

  return value;
}

export default function Footer() {
  const tablet = useMediaQuery("(max-width: 1024px)");

  return (
    <footer id="footer" className="w-full border-t border-border bg-background pb-0">
      <div className="page-container flex flex-col py-8 md:flex-row md:items-center md:justify-between md:py-16 lg:py-16">
        <div className="flex max-w-xs flex-col items-start justify-start gap-y-5">
          <Link
            href="/"
            className="flex items-center gap-2 font-heading font-semibold text-foreground transition-colors hover:text-foreground/90"
          >
            <FooterIcons.logo className="size-8" />
            <span className="text-xl">Mahaana</span>
          </Link>
          <p className="body-sm font-medium tracking-tight text-muted-foreground">
            {siteConfig.hero.description}
          </p>
          <div className="flex items-center gap-2 dark:hidden">
            <FooterIcons.soc2 className="size-12" />
            <FooterIcons.hipaa className="size-12" />
            <FooterIcons.gdpr className="size-12" />
          </div>
          <div className="hidden items-center gap-2 dark:flex">
            <FooterIcons.soc2Dark className="size-12" />
            <FooterIcons.hipaaDark className="size-12" />
            <FooterIcons.gdprDark className="size-12" />
          </div>
        </div>
        <div className="pt-5 md:w-1/2 md:pt-0">
          <div className="flex flex-col items-start justify-start gap-y-5 md:flex-row md:items-center md:justify-between lg:pl-10">
            {siteConfig.footerLinks.map((column, columnIndex) => (
              <ul key={columnIndex} className="flex flex-col gap-y-2">
                <li className="body-sm mb-2 font-semibold text-foreground">
                  {column.title}
                </li>
                {column.links.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.url}
                      className="group inline-flex cursor-pointer items-center justify-start gap-1 text-[15px] leading-snug text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.title}
                      <span
                        className={cn(
                          "flex size-4 translate-x-0 items-center justify-center rounded border border-border opacity-0 transition-all duration-300 ease-out",
                          "group-hover:translate-x-1 group-hover:opacity-100",
                        )}
                        aria-hidden
                      >
                        <ChevronRight className="size-4" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
      <div className="relative z-0 mt-24 h-48 w-full md:h-64">
        <div
          className="absolute inset-0 z-10 from-40% bg-gradient-to-t from-transparent to-background"
          aria-hidden
        />
        <div className="absolute inset-0 px-4 md:px-8 lg:px-16">
          <FlickeringGrid
            text={tablet ? "Mahaana" : "Shariah-compliant investing"}
            fontSize={tablet ? 70 : 90}
            className="h-full w-full"
            squareSize={2}
            gridGap={tablet ? 2 : 3}
            color="#6B7280"
            maxOpacity={0.3}
            flickerChance={0.1}
          />
        </div>
      </div>
    </footer>
  );
}
