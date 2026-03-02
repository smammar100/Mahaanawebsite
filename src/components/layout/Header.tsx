'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { Container } from './Container'
import { Button } from '@/components/base/buttons/button'
import { ButtonUtility } from '@/components/base/buttons/button-utility'
import { ChevronDown } from '@untitledui/icons'

const navLinks = [
  { href: '/products', label: 'Products' },
  { href: '/resource', label: 'Resource' },
  { href: '/company', label: 'Company' },
]

function NavLink({
  href,
  label,
  light = false,
}: {
  href: string
  label: string
  light?: boolean
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-1 font-body font-medium text-base tracking-[-0.24px] hover:text-system-brand transition-colors ${
        light ? 'text-gray-100' : 'text-text-primary'
      }`}
    >
      {label}
      <ChevronDown
        className={`size-6 shrink-0 ${light ? 'text-gray-300' : 'text-text-tertiary'}`}
      />
    </Link>
  )
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const [scrolledPastHero, setScrolledPastHero] = useState(false)

  useEffect(() => {
    if (pathname != null && pathname !== '/') {
      setScrolledPastHero(true)
      return
    }
    let observer: IntersectionObserver | null = null
    const timeoutId = setTimeout(() => {
      const sentinel = document.getElementById('hero-intersection-sentinel')
      if (!sentinel) {
        setScrolledPastHero(true)
        return
      }
      setScrolledPastHero(false)
      observer = new IntersectionObserver(
        ([entry]) => setScrolledPastHero(entry.isIntersecting),
        { threshold: 0 }
      )
      observer.observe(sentinel)
    }, 0)
    return () => {
      clearTimeout(timeoutId)
      observer?.disconnect()
    }
  }, [pathname])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const headerClasses =
    pathname === '/' && scrolledPastHero
      ? 'bg-transparent border-b border-transparent transition-colors duration-200'
      : 'bg-surface-bg border-b border-surface-stroke transition-colors duration-200'

  const isTransparent = pathname === '/' && scrolledPastHero
  const textClasses = isTransparent
    ? 'text-gray-100'
    : 'text-gray-900'

  return (
    <header className={`fixed top-0 left-0 right-0 z-[10000000] w-full pt-[env(safe-area-inset-top)] ${headerClasses}`}>
      <Container className={`py-3 sm:py-4 ${textClasses}`}>
        <div className="flex items-center justify-between gap-4 lg:gap-8">
          {/* Logo */}
          <Link
            href="/"
            className={`shrink-0 flex-1 lg:flex-initial ${isTransparent ? '[&_img]:brightness-0 [&_img]:invert' : ''}`}
          >
            <Image
              src="/images/invest/Logo.svg"
              alt="Mahaana"
              width={146}
              height={24}
              className="h-6 w-auto"
            />
          </Link>

          {/* Desktop nav - center */}
          <nav className="hidden lg:flex items-center gap-8 flex-1 justify-center">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                light={isTransparent}
              />
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center justify-end gap-2 flex-1 lg:flex-initial">
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

            {/* Mobile hamburger */}
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
              className="flex flex-col items-center justify-center gap-1.5 p-3 min-w-[44px] min-h-[44px] lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span
                className={`block h-0.5 w-6 bg-current transition-transform ${
                  mobileMenuOpen ? 'translate-y-2 rotate-45' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-current transition-opacity ${
                  mobileMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-current transition-transform ${
                  mobileMenuOpen ? '-translate-y-2 -rotate-45' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile nav dropdown */}
        {mobileMenuOpen && (
          <nav
            className={`flex flex-col gap-2 pb-4 pt-4 lg:hidden border-t ${
              isTransparent ? 'border-gray-500/50' : 'border-surface-stroke'
            }`}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 py-2 font-medium hover:text-system-brand transition-colors ${
                  isTransparent ? 'text-gray-100' : 'text-text-primary'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
                <ChevronDown
                  className={`size-5 -rotate-90 ${
                    isTransparent ? 'text-gray-300' : 'text-text-tertiary'
                  }`}
                />
              </Link>
            ))}
            <Link
              href="/login"
              className={`py-2 font-medium hover:text-system-brand transition-colors ${
                isTransparent ? 'text-gray-100' : 'text-text-primary'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </Link>
          </nav>
        )}
      </Container>
    </header>
  )
}
