'use client'

import { useState, useEffect } from 'react'
import { breakpoints } from '@/lib/breakpoints'

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    setMatches(media.matches)
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [query])

  return matches
}

export function useBreakpoint(breakpoint: keyof typeof breakpoints): boolean {
  const width = breakpoints[breakpoint]
  return useMediaQuery(`(min-width: ${width})`)
}
