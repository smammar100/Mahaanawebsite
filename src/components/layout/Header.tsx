'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { Container } from './Container'
import { Button } from '@/components/base/buttons/button'
import { ButtonUtility } from '@/components/base/buttons/button-utility'
import { ChevronDown, ChevronRight } from '@untitledui/icons'
import { navDropdowns, type NavDropdownConfig } from './navConfig'
import { cx } from '@/utils/cx'

const HOVER_CLOSE_DELAY_MS = 200

type OpenDropdownId = 'products' | 'resources' | 'company' | null

function DropdownPanelContent({
  config,
  isTransparent,
  onClose,
}: {
  config: NavDropdownConfig
  isTransparent: boolean
  onClose: () => void
}) {
  const textPrimary = isTransparent ? 'text-gray-100' : 'text-text-primary'
  const hoverBrand = 'hover:text-system-brand'

  return (
    <div className="py-2">
      {config.sections.map((section) => (
        <div key={section.heading || 'main'} className={section.heading ? 'mb-4 last:mb-0' : ''}>
          {section.heading ? (
            <p
              className={cx(
                'mb-2 font-body text-tiny font-semibold uppercase tracking-wide',
                'text-system-brand'
              )}
            >
              {section.heading}
            </p>
          ) : null}
          <ul className="flex flex-col gap-0.5">
            {section.links.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cx(
                    'block rounded-lg px-3 py-2 font-body text-small font-medium transition-colors',
                    textPrimary,
                    hoverBrand
                  )}
                  onClick={onClose}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

function DesktopNavDropdown({
  config,
  id,
  isOpen,
  onOpenChange,
  isTransparent,
  onMouseEnter,
  onMouseLeave,
}: {
  config: NavDropdownConfig
  id: OpenDropdownId
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  isTransparent: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
}) {
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearCloseTimeout = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
  }

  const scheduleClose = () => {
    closeTimeoutRef.current = setTimeout(() => {
      onOpenChange(false)
      closeTimeoutRef.current = null
    }, HOVER_CLOSE_DELAY_MS)
  }

  const handlePointerEnter = () => {
    clearCloseTimeout()
    onMouseEnter()
  }

  const handlePointerLeave = () => {
    scheduleClose()
  }

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onOpenChange(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onOpenChange])

  return (
    <div
      className="relative"
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label={`${config.label} menu`}
        onClick={() => onOpenChange(!isOpen)}
        className={cx(
          'flex items-center gap-1 rounded-lg font-body font-medium text-base tracking-[-0.24px] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-system-brand focus-visible:ring-offset-2',
          isTransparent ? 'text-gray-100 hover:text-gray-100' : 'text-text-primary hover:text-system-brand'
        )}
      >
        {config.label}
        <ChevronDown
          className={cx(
            'size-6 shrink-0 transition-transform',
            isOpen && 'rotate-180',
            isTransparent ? 'text-gray-300' : 'text-text-tertiary'
          )}
        />
      </button>
      {isOpen && (
        <div
          className="absolute left-0 top-full pt-0 min-w-[200px] rounded-xl border border-surface-stroke bg-surface-bg p-4 shadow-lg outline-none z-[1]"
          style={{ zIndex: 10000001 }}
          role="menu"
        >
          <DropdownPanelContent
            config={config}
            isTransparent={false}
            onClose={() => onOpenChange(false)}
          />
        </div>
      )}
    </div>
  )
}

function MobileNavSection({
  config,
  isExpanded,
  onToggle,
  isTransparent,
  onNavigate,
}: {
  config: NavDropdownConfig
  isExpanded: boolean
  onToggle: () => void
  isTransparent: boolean
  onNavigate: () => void
}) {
  const textPrimary = isTransparent ? 'text-gray-100' : 'text-text-primary'
  const textSecondary = isTransparent ? 'text-gray-300' : 'text-text-secondary'
  const borderColor = isTransparent ? 'border-gray-500/50' : 'border-surface-stroke'

  return (
    <div className="flex flex-col">
      <button
        type="button"
        aria-expanded={isExpanded}
        aria-controls={`mobile-nav-${config.label.toLowerCase()}`}
        id={`mobile-nav-trigger-${config.label.toLowerCase()}`}
        className={cx(
          'flex min-h-[44px] items-center justify-between py-2 font-medium transition-colors',
          textPrimary,
          'hover:text-system-brand'
        )}
        onClick={onToggle}
      >
        {config.label}
        <ChevronRight
          className={cx('size-5 shrink-0 transition-transform', isExpanded && 'rotate-90')}
        />
      </button>
      <div
        id={`mobile-nav-${config.label.toLowerCase()}`}
        role="region"
        aria-labelledby={`mobile-nav-trigger-${config.label.toLowerCase()}`}
        className={cx(
          'overflow-hidden transition-all duration-200 ease-out',
          isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className={cx('flex flex-col gap-1 border-l-2 pl-4', borderColor)}>
          {config.sections.map((section) => (
            <div key={section.heading || 'main'} className="py-1">
              {section.heading ? (
                <p
                  className={cx(
                    'mb-1 font-body text-tiny font-semibold uppercase tracking-wide',
                    textSecondary
                  )}
                >
                  {section.heading}
                </p>
              ) : null}
              <ul className="flex flex-col gap-0">
                {section.links.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cx(
                        'block min-h-[44px] py-2.5 font-body text-small font-medium transition-colors',
                        textPrimary,
                        'hover:text-system-brand'
                      )}
                      onClick={onNavigate}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openDesktopId, setOpenDesktopId] = useState<OpenDropdownId>(null)
  const [openMobileId, setOpenMobileId] = useState<OpenDropdownId>(null)
  const pathname = usePathname()
  const [scrolledPastHero, setScrolledPastHero] = useState(false)

  const isHeroPage = pathname === '/' || pathname === '/retirement'

  useEffect(() => {
    if (pathname != null && !isHeroPage) {
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
  }, [pathname, isHeroPage])

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
    isHeroPage && scrolledPastHero
      ? 'bg-transparent border-b border-transparent transition-colors duration-200'
      : 'bg-surface-bg border-b border-surface-stroke transition-colors duration-200'

  const isTransparent = isHeroPage && scrolledPastHero
  const textClasses = isTransparent
    ? 'text-gray-100'
    : 'text-gray-900'

  const desktopDropdownIds: OpenDropdownId[] = ['products', 'resources', 'company']

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

          {/* Desktop nav - center with dropdowns */}
          <nav className="hidden lg:flex items-center gap-8 flex-1 justify-center">
            {navDropdowns.map((config, index) => (
              <DesktopNavDropdown
                key={config.label}
                config={config}
                id={desktopDropdownIds[index]}
                isOpen={openDesktopId === desktopDropdownIds[index]}
                onOpenChange={(open) =>
                  setOpenDesktopId(open ? desktopDropdownIds[index] : null)
                }
                isTransparent={isTransparent}
                onMouseEnter={() => setOpenDesktopId(desktopDropdownIds[index])}
                onMouseLeave={() => {}}
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

        {/* Mobile nav - expandable sections */}
        {mobileMenuOpen && (
          <nav
            className={`flex flex-col gap-2 pb-4 pt-4 lg:hidden border-t ${
              isTransparent ? 'border-gray-500/50' : 'border-surface-stroke'
            }`}
          >
            {navDropdowns.map((config, index) => (
              <MobileNavSection
                key={config.label}
                config={config}
                isExpanded={openMobileId === desktopDropdownIds[index]}
                onToggle={() =>
                  setOpenMobileId((prev) =>
                    prev === desktopDropdownIds[index] ? null : desktopDropdownIds[index]
                  )
                }
                isTransparent={isTransparent}
                onNavigate={() => setMobileMenuOpen(false)}
              />
            ))}
            <Link
              href="/login"
              className={`py-2 font-medium hover:text-system-brand transition-colors min-h-[44px] flex items-center ${
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
