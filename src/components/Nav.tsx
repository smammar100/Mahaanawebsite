"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const productsLinks = [
  { href: "/services#save-plus", label: "Save+" },
  { href: "/services#retirement", label: "Retirement" },
  { href: "/services", label: "All Products" },
] as const;

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

const resourcesLinks = [
  { href: "/services", label: "Help" },
  { href: "/contact", label: "FAQ" },
] as const;

function NavDesktop() {
  return (
    <div className="hidden items-center gap-4 md:flex">
      <NavigationMenu className="max-w-none">
        <NavigationMenuList className="gap-1">
          <NavigationMenuItem>
            <NavigationMenuTrigger className="body-md font-medium text-foreground">
              Products
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-1 p-2 w-48">
                {productsLinks.map(({ href, label }) => (
                  <li key={href}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={href}
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "flex h-auto flex-col items-start justify-start rounded-md p-3"
                        )}
                      >
                        {label}
                      </Link>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="body-md font-medium text-foreground">
              Company
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-1 p-2 w-48">
                {companyLinks.map(({ href, label }) => (
                  <li key={href}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={href}
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "flex h-auto flex-col items-start justify-start rounded-md p-3"
                        )}
                      >
                        {label}
                      </Link>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="body-md font-medium text-foreground">
              Resources
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-1 p-2 w-48">
                {resourcesLinks.map(({ href, label }) => (
                  <li key={href}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={href}
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "flex h-auto flex-col items-start justify-start rounded-md p-3"
                        )}
                      >
                        {label}
                      </Link>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Button
        asChild
        className="rounded-full bg-brand-600 px-6 font-medium hover:bg-brand-700"
      >
        <Link href="/contact">Get Started</Link>
      </Button>
    </div>
  );
}

function NavMobile() {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Open menu"
        >
          <Menu className="size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[280px] sm:w-[320px]">
        <SheetHeader>
          <SheetTitle className="font-heading">Menu</SheetTitle>
        </SheetHeader>
        <nav
          className="flex flex-col gap-6 pt-4"
          aria-label="Mobile navigation"
        >
          <div>
            <p className="body-sm font-semibold text-muted-foreground mb-2">
              Products
            </p>
            <ul className="flex flex-col gap-1">
              {productsLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="body-md block rounded-md px-3 py-2 text-foreground hover:bg-muted"
                    onClick={() => setOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="body-sm font-semibold text-muted-foreground mb-2">
              Company
            </p>
            <ul className="flex flex-col gap-1">
              {companyLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="body-md block rounded-md px-3 py-2 text-foreground hover:bg-muted"
                    onClick={() => setOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="body-sm font-semibold text-muted-foreground mb-2">
              Resources
            </p>
            <ul className="flex flex-col gap-1">
              {resourcesLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="body-md block rounded-md px-3 py-2 text-foreground hover:bg-muted"
                    onClick={() => setOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Button
            asChild
            className="mt-4 w-full rounded-full bg-brand-600 hover:bg-brand-700"
          >
            <Link href="/contact" onClick={() => setOpen(false)}>
              Get Started
            </Link>
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export default function Nav() {
  return (
    <nav aria-label="Main navigation" className="flex items-center gap-4">
      <NavDesktop />
      <NavMobile />
    </nav>
  );
}
