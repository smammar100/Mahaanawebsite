'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Container } from './Container';
import { Button } from '@/components/base/buttons/button';
import { AppStoreButton, GooglePlayButton } from '@/components/base/buttons/app-store-buttons';
import { ButtonUtility } from '@/components/base/buttons/button-utility';
import { navDropdowns } from './navConfig';
import { ChevronDown } from '@untitledui/icons';
import { cx } from '@/utils/cx';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const MOBILE_BREAKPOINT_PX = 800; // lg in theme

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navOpenValue, setNavOpenValue] = useState<string>('');
  const pathname = usePathname();
  const [scrolledPastHero, setScrolledPastHero] = useState(false);

  const isHeroPage = pathname === '/' || pathname === '/retirement';

  useEffect(() => {
    if (pathname != null && !isHeroPage) {
      setScrolledPastHero(true);
      return;
    }
    let observer: IntersectionObserver | null = null;
    const timeoutId = setTimeout(() => {
      const sentinel = document.getElementById('hero-intersection-sentinel');
      if (!sentinel) {
        setScrolledPastHero(true);
        return;
      }
      setScrolledPastHero(false);
      observer = new IntersectionObserver(
        ([entry]) => setScrolledPastHero(entry.isIntersecting),
        { threshold: 0 }
      );
      observer.observe(sentinel);
    }, 0);
    return () => {
      clearTimeout(timeoutId);
      observer?.disconnect();
    };
  }, [pathname, isHeroPage]);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined' && window.innerWidth >= MOBILE_BREAKPOINT_PX) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const headerClasses =
    isHeroPage && scrolledPastHero
      ? 'bg-transparent border-b border-transparent transition-colors duration-200'
      : 'bg-surface-bg border-b border-surface-stroke transition-colors duration-200';

  const isTransparent = isHeroPage && scrolledPastHero;
  const textClasses = isTransparent ? 'text-gray-100' : 'text-gray-900';

  return (
    <>
      <header
        className={cx(
          'fixed top-0 left-0 right-0 z-[10000000] w-full pt-[env(safe-area-inset-top)]',
          headerClasses
        )}
      >
        <Container className={cx('py-3 sm:py-4', textClasses)}>
          <div className="flex items-center justify-between gap-4 lg:gap-8">
            <Link
              href="/"
              className={cx(
                'shrink-0 flex-1 lg:flex-initial',
                isTransparent && '[&_img]:brightness-0 [&_img]:invert'
              )}
            >
              <Image
                src="/images/invest/Logo.svg"
                alt="Mahaana"
                width={146}
                height={24}
                className="h-6 w-auto"
                priority
              />
            </Link>

            <NavigationMenu
              className="hidden lg:block flex-1"
              value={navOpenValue}
              onValueChange={setNavOpenValue}
              viewportWrapperClassName={
                navOpenValue === `nav-${navDropdowns.length - 1}`
                  ? 'justify-end'
                  : navOpenValue === 'nav-0'
                    ? 'justify-start'
                    : undefined
              }
            >
              <NavigationMenuList className="flex flex-1 list-none items-center justify-center gap-8">
                {navDropdowns.map((config, index) => (
                  <NavigationMenuItem key={config.label} value={`nav-${index}`}>
                    <NavigationMenuTrigger
                      className={cx(
                        'h-auto bg-transparent px-2.5 font-body font-medium text-base tracking-[-0.24px]',
                        isTransparent
                          ? 'text-white hover:text-white'
                          : 'text-text-primary text-text-tertiary hover:text-system-brand'
                      )}
                    >
                      {config.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent
                      className={cx(
                        '!rounded-xl !border !border-surface-stroke !bg-surface-bg !p-0 shadow-lg'
                      )}
                    >
                      <ul
                        className="flex shrink-0 p-2"
                        style={{ width: config.sections.length * 260, minWidth: config.sections.length * 260 }}
                      >
                        {config.sections.map((section, sectionIndex) => (
                          <li
                            key={section.heading || `s-${sectionIndex}`}
                            className="flex w-[260px] min-w-[260px] flex-col"
                          >
                            <ul>
                              {section.heading ? (
                                <li className="whitespace-normal px-3 py-2 font-body text-tiny font-semibold uppercase tracking-wide text-system-brand">
                                  {section.heading}
                                </li>
                              ) : null}
                              {section.links.map((link) => (
                                <li key={link.href}>
                                  <NavigationMenuLink asChild>
                                    <Link
                                      href={link.href}
                                      className={cx(
                                        'group/link flex flex-row items-center gap-2 rounded-lg px-3 py-2 font-body text-small font-medium transition-colors',
                                        'text-black hover:text-system-brand'
                                      )}
                                    >
                                      <div className="flex min-w-0 flex-col gap-0.5">
                                        <span className="font-medium whitespace-normal">
                                          {link.label}
                                        </span>
                                      </div>
                                    </Link>
                                  </NavigationMenuLink>
                                </li>
                              ))}
                            </ul>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex flex-1 items-center justify-end gap-2 lg:flex-initial">
              <Button
                href="/login"
                color="primary"
                size="md"
                className="hidden sm:inline-flex rounded-xl"
              >
                Login
              </Button>
              <div className="flex items-center gap-2">
                <ButtonUtility
                  href="#"
                  icon={
                    <Image
                      src="/images/navbar/Apple-logo.png"
                      alt=""
                      width={20}
                      height={20}
                      className="size-5 [&_img]:size-5"
                    />
                  }
                  tooltip="Download on App Store"
                  color="secondary"
                  className="size-9 rounded-xl"
                />
                <ButtonUtility
                  href="#"
                  icon={
                    <Image
                      src="/images/navbar/Playstore-logo.png"
                      alt=""
                      width={18}
                      height={20}
                      className="size-5 [&_img]:size-5"
                    />
                  }
                  tooltip="Get it on Google Play"
                  color="secondary"
                  className="size-10 rounded-xl sm:size-9"
                />
              </div>

              <button
                type="button"
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
                className="flex flex-col items-center justify-center gap-1.5 p-3 min-w-[44px] min-h-[44px] lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span
                  className={cx(
                    'block h-0.5 w-6 bg-current transition-transform',
                    mobileMenuOpen && 'translate-y-2 rotate-45'
                  )}
                />
                <span
                  className={cx(
                    'block h-0.5 w-6 bg-current transition-opacity',
                    mobileMenuOpen && 'opacity-0'
                  )}
                />
                <span
                  className={cx(
                    'block h-0.5 w-6 bg-current transition-transform',
                    mobileMenuOpen && '-translate-y-2 -rotate-45'
                  )}
                />
              </button>
            </div>
          </div>
        </Container>
      </header>

      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent
          side="top"
          aria-describedby={undefined}
          hideOverlay
          className={cx(
            'inset-0 z-[10000003] flex min-h-dvh w-full flex-col gap-0 overflow-hidden overflow-x-hidden border-0 p-4 [&>button]:hidden',
            '!bg-white bg-[#ffffff]'
          )}
          style={{ backgroundColor: '#ffffff' }}
        >
          <div
            className={cx(
              'mobile-menu-panel flex min-h-full flex-1 flex-col gap-0 overflow-y-auto overflow-x-hidden bg-white pb-8',
              mobileMenuOpen && 'open'
            )}
            style={{ backgroundColor: '#ffffff' }}
          >
            <div className="absolute -m-px h-px w-px overflow-hidden border-0 p-0 text-nowrap whitespace-nowrap [clip:rect(0,0,0,0)]">
              <SheetTitle className="text-primary">
                Mobile Navigation
              </SheetTitle>
            </div>
            {/* 1. Menu header: logo + close */}
            <div className="menu-stagger-item mb-2 flex items-center justify-between border-b border-[#f0f0f0] pb-4">
              <Link
                href="/"
                className="shrink-0"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Image
                  src="/images/invest/Logo.svg"
                  alt="Mahaana"
                  width={146}
                  height={24}
                  className="h-6 w-auto"
                />
              </Link>
              <button
                type="button"
                aria-label="Close menu"
                className="flex size-10 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            {/* 2–5. Nav items: Products, Resources, Company with chevrons */}
            <div className="menu-stagger-item">
              <Accordion type="multiple" className="w-full bg-white" style={{ backgroundColor: '#ffffff' }}>
                {navDropdowns.map((config, index) => (
                  <AccordionItem
                    key={config.label}
                    value={`nav-${index}`}
                    className="border-b border-[#f5f5f5]"
                  >
                    <AccordionTrigger
                      className="w-full cursor-pointer border-b border-[#f0f0f0] py-4 text-base font-medium text-[#1a1a1a] hover:bg-gray-50 hover:no-underline [&[data-state=open]>svg]:rotate-180"
                    >
                      <span>{config.label}</span>
                      <ChevronDown className="size-5 shrink-0 text-[#aaaaaa] transition-transform duration-200 [&[data-state=open]>svg]:rotate-180" aria-hidden />
                    </AccordionTrigger>
                    <AccordionContent className="max-h-[60dvh] overflow-x-auto">
                      {config.sections.map((section, sectionIndex) => (
                        <div key={section.heading || `s-${sectionIndex}`}>
                          {section.heading ? (
                            <div className="px-4 pt-3 pb-1 font-body text-tiny font-semibold uppercase tracking-wide text-system-brand">
                              {section.heading}
                            </div>
                          ) : null}
                          {section.links.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              className="block py-3 px-4 font-body text-small font-medium text-[#1a1a1a] transition-colors hover:bg-gray-50"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            {/* 6. Divider */}
            <div className="menu-stagger-item border-b border-[#f0f0f0]" />
            {/* 7. App store row */}
            <div className="menu-stagger-item mb-4 mt-6 flex gap-3">
              <AppStoreButton href="#" className="min-w-0 flex-1 shrink-0" />
              <GooglePlayButton href="#" className="min-w-0 flex-1 shrink-0" />
            </div>
            {/* 8. Divider */}
            <div className="menu-stagger-item border-b border-[#f0f0f0]" />
            {/* 9. Login at bottom (mt-auto) */}
            <div className="menu-stagger-item mt-auto pt-6">
              <Button
                href="/login"
                color="primary"
                size="md"
                className="w-full !rounded-[10px] !border-0 !py-3.5 !bg-[#6B2FD9] text-[15px] font-semibold text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
