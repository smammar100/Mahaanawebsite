/**
 * Single source of truth for header nav dropdowns (Products, Resources, Company).
 * Used by both desktop dropdown panels and mobile expandable sections.
 */

export interface NavLinkItem {
  href: string
  label: string
}

export interface NavSection {
  heading: string
  links: NavLinkItem[]
}

export interface NavDropdownConfig {
  label: string
  /** Sections with headings (Products, Resources) or single list (Company). */
  sections: NavSection[]
}

export const navDropdowns: NavDropdownConfig[] = [
  {
    label: 'Products',
    sections: [
      {
        heading: 'Products',
        links: [
          { href: '/save-plus', label: 'Save+' },
          { href: '/retirement', label: 'Retirement' },
        ],
      },
      {
        heading: 'Funds',
        links: [
          { href: '/micf', label: 'MICF' },
          { href: '/miietf', label: 'MIIETF' },
          { href: '/miirf', label: 'MIIRF' },
        ],
      },
    ],
  },
  {
    label: 'Resources',
    sections: [
      {
        heading: 'Tools',
        links: [
          { href: '/retirement-calculator', label: 'Retirement Calculator' },
          { href: '/investment-calculator', label: 'Saving Calculator' },
        ],
      },
      {
        heading: 'Investor Education',
        links: [{ href: '/investor-education', label: 'Investor Education' }],
      },
    ],
  },
  {
    label: 'Company',
    sections: [
      {
        heading: '',
        links: [
          { href: '/about', label: 'About Us' },
          { href: '/security', label: 'Security' },
          { href: '/careers', label: 'Careers' },
          { href: '/reviews', label: 'Reviews' },
        ],
      },
    ],
  },
]
