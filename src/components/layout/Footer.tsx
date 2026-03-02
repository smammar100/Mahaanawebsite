import Link from 'next/link'
import { Container } from './Container'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-surface-stroke bg-surface-card mt-auto">
      <Container>
        <div className="flex flex-col gap-4 py-8 sm:py-10 sm:flex-row sm:items-center sm:justify-between md:py-12 lg:py-14 xl:py-16">
          <p className="text-sm text-text-secondary">
            © {currentYear} Mahaana. All rights reserved.
          </p>
          <nav className="flex gap-6">
            <Link
              href="/"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              About
            </Link>
            <Link
              href="/retirement-calculator"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              Retirement Calculator
            </Link>
            <Link
              href="/investment-calculator"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              Investment Calculator
            </Link>
            <Link
              href="/style-guide"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              Style Guide
            </Link>
          </nav>
        </div>
      </Container>
    </footer>
  )
}
