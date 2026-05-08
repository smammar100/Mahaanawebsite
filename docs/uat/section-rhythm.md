# UAT — Section vertical rhythm

Validation matrix for the unified section-rhythm system introduced in `src/components/layout/Section.tsx` and the corresponding utilities in `src/app/globals.css`.

## System under test

- **Component:** [`Section`](../../src/components/layout/Section.tsx) — `<Section size="default|compact|generous|hero|none" position="first|last|middle">`.
- **CSS utilities** (in [globals.css](../../src/app/globals.css)):
  - `.section-y` — `py-10 sm:py-12 md:py-14 lg:py-16` (40 / 48 / 56 / 64 / 64 px). lg cascades up to xl.
  - `.section-y-compact` — `py-6 sm:py-8 md:py-10 lg:py-12 xl:py-14` (24 / 32 / 40 / 48 / 56 px).
  - `.section-y-generous` — `py-14 sm:py-20 md:py-24 lg:py-28 xl:py-32` (56 / 80 / 96 / 112 / 128 px).
  - `.section-y-first` — `padding-top: 0`.
  - `.section-y-last` — `padding-bottom: 0`.

## Breakpoint reference

This project overrides Tailwind v4 breakpoints in [globals.css:10-16](../../src/app/globals.css):

| Tailwind breakpoint | Min width |
|---|---|
| (base) | 0 |
| `xs` | 320 px |
| `sm` | 512 px |
| `md` | 600 px |
| `lg` | 800 px |
| `xl` | 1100 px |
| `2xl` | 1400 px |
| `3xl` | 1920 px |

## Test cases

### Padding values (computed style)

For each, in DevTools console: `getComputedStyle(document.querySelector('.section-y')).paddingBlock`.

| # | Viewport | Expected `padding-block` (top + bottom each) | Pass criteria |
|---|---|---|---|
| 1 | 1440 × 900 | `56px` (cascaded from `lg:py-14`) | At/above `xl` (1100); no `xl` override. |
| 2 | 1100 × 800 | `56px` (cascaded from `lg:py-14`) | Min width for `xl`. |
| 3 | 800 × 768 | `56px` (`lg:py-14`) | At the `lg` breakpoint min. |
| 4 | 600 × 1024 | `48px` (`md:py-12`) | At the `md` breakpoint min. |
| 5 | 512 × 1024 | `40px` (`sm:py-10`) | At the `sm` breakpoint min. |
| 6 | 375 × 812 | `32px` (`py-8`) | Below `sm`. |

For `.section-y-compact`: 24 / 32 / 40 / 48 / 56 px. For `.section-y-generous`: 56 / 80 / 96 / 112 / 128 px.

### First / last adjacency resets

| # | Case | Pass criteria |
|---|---|---|
| 7 | `<Section position="first">` after a hero | `padding-top: 0px`; the only top spacing comes from the hero's bottom or the section's content layout. |
| 8 | `<Section position="last">` before a footer | `padding-bottom: 0px`; gap to footer comes solely from the footer's own top spacing. |
| 9 | `<Section position="middle">` (default) | Full top + bottom padding from `size`. |

### Homepage rhythm sweep (visual)

Open `http://localhost:3000` at 1440 × 900. Scroll from top to bottom and rate each gap.

| # | Gap between | Pass criteria |
|---|---|---|
| 10 | InvestHero ↔ LogoStrip | LogoStrip uses `section-y-compact` → 56 px on `xl`. Visually balanced; no jarring sudden whitespace. |
| 11 | LogoStrip ↔ WhyMahaanaTrade | Both `.section-y` (compact + default) — total ~96 + 56 = 152 px. Reads as a clear "section break". |
| 12 | WhyMahaanaTrade ↔ FeatureCards | Both default → ~192 px between content. **No `pb-32` outlier on FeatureCards.** |
| 13 | FeatureCards ↔ FeaturesSection | Default ↔ default. Uniform with #12. |
| 14 | FeaturesSection ↔ TestimonialsSection | Uniform. |
| 15 | TestimonialsSection ↔ ComplianceSection | Uniform. |
| 16 | ComplianceSection ↔ BlogSection | Uniform. |
| 17 | BlogSection ↔ Cta6Section | Uniform. |
| 18 | Cta6Section ↔ Footer | Cta `pb` (96 px) + Footer `pt-12` (48 px) = 144 px. Comfortable "wind-down" rhythm before footer. |

### FeatureCards regression

| # | Case | Pass criteria |
|---|---|---|
| 19 | FeatureCards `padding-bottom` | At `xl`, equals `96px` (from `.section-y`), **not** the old `128px` (`pb-32`). The PinContainer 3D hover effect still appears within card bounds (it was always absolute, never relied on outer `pb`). |
| 20 | FeatureCards top padding | At `xl`, equals `96px` (`.section-y`), matching the old `pt-16` value semantically (now larger from cascade — desired). |

### Other-page cascade (no migration applied)

Open each page at 1440 × 900. Scroll once.

| # | Page | Pass criteria |
|---|---|---|
| 21 | `/retirement` | All `.section-y` users render with new moderate padding (96 px on `xl`); RetirementHero visually unchanged; no broken layouts. |
| 22 | `/save-plus` | Same. |
| 23 | `/security` | Same. ComplianceSection still shows the spotlight + 4 cards (cards visible because page passes default `showCards={true}`). |
| 24 | `/micf`, `/miietf`, `/miirf` | Fund pages cascade cleanly; FundHero unaffected; per-section padding consistent. |

### Reduced-motion safety

| # | Case | Pass criteria |
|---|---|---|
| 25 | DevTools "Emulate prefers-reduced-motion: reduce" | Padding values identical to non-reduced-motion. The Section component is purely structural; no animation tied to its API. (`section-fade-in-up` is a separate, opt-in concern that already animates on `useInView` regardless of motion preference — unrelated to this system.) |

## How to run

1. Start dev server: `npm run dev` (already managed via `preview_start` in this repo's setup).
2. Open `http://localhost:3000`.
3. For each viewport in cases 1–6, resize the browser (DevTools "Responsive" mode or window resize via Chrome MCP).
4. For computed-style assertions, paste in DevTools console: `Array.from(document.querySelectorAll('section.section-y, .section-y')).map(s => ({el: s.tagName, py: getComputedStyle(s).paddingTop}))`.
5. For visual sweeps, scroll start-to-end and confirm uniform rhythm.

## Sign-off

- [ ] Cases 1–6 (padding values) pass at all breakpoints.
- [ ] Cases 7–9 (first/last resets) pass.
- [ ] Cases 10–18 (homepage rhythm) pass — gaps feel uniform on a desktop sweep.
- [ ] Cases 19–20 (FeatureCards regression) pass.
- [ ] Cases 21–24 (other pages cascade) pass — no visual regressions on existing pages.
- [ ] Case 25 (reduced motion) passes.
