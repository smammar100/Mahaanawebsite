# Pass 2 — Typography & layout audit checklist

Do **not** auto-fix; use this as a review checklist. Tick items after you address them.

---

## Text-wrap (widow/orphan prevention)

- [x] **Headings missing `text-wrap: balance`** — **Done.** Base styles in [src/app/globals.css](src/app/globals.css) set `text-wrap: balance` on `h1, h2, h3, h4, h5, h6` to prevent widows on dynamic/responsive headings.

- [x] **Body paragraphs missing `text-wrap: pretty`** — **Done.** Base styles set `text-wrap: pretty` on `p` and on `.text-body-lg`, `.text-body-md`, `.text-body`, `.text-body-sm`, `.text-body-xs` to reduce orphaned last words.

---

## Body text alignment

- [ ] **Body text not left-aligned** — `text-align: center` or `justify` without `hyphens: auto`  
  Many sections use `text-center` for headings or hero blocks (e.g. not-found, terms hero, DownloadSection, FeaturesSection header, LegalPageContent hero). Confirm that **body paragraphs** are left-aligned; centered headings are acceptable.  
  **Files to review:** [src/app/not-found.tsx](src/app/not-found.tsx), [src/app/terms-conditions/page.tsx](src/app/terms-conditions/page.tsx), [src/components/sections/DownloadSection.tsx](src/components/sections/DownloadSection.tsx), [src/components/sections/FeaturesSection.tsx](src/components/sections/FeaturesSection.tsx), [src/app/legal/LegalPageContent.tsx](src/app/legal/LegalPageContent.tsx), and any other section using `text-center` on a wrapper that contains body copy.

---

## Text containers & line length

- [ ] **Text containers missing max-width** — Lines could exceed 75 characters on wide screens.  
  `.readable-line-length` (65ch / 75ch cap) is applied on legal, terms, privacy, and investor-education article content. Other pages (e.g. about, reviews, fund pages) may have full-width prose; confirm and add `readable-line-length` or `max-w-prose` / `max-w-[65ch]` where long body text is present.  
  **Files to review:** [src/app/about/page.tsx](src/app/about/page.tsx), [src/app/reviews/page.tsx](src/app/reviews/page.tsx), fund pages, section components that render long paragraphs.

- [ ] **Paragraphs exceeding ~90 characters per rendered line** — Same as above; check in browser on wide viewport.

---

## Line height

- [ ] **Body line-height below 1.4 or above 2.0** —  
  **Current:** `--leading-body: 1.5` in [src/app/globals.css](src/app/globals.css). **OK** (within 1.4–1.6).

- [ ] **Headings with equal margin above and below** — Should be more space above, less below.  
  **Review:** Base styles in globals.css and any component that adds `mb-*` / `mt-*` to headings. Tailwind utilities (e.g. `mt-8 mb-3`) may already give more above than below; verify per section.

---

## Fonts

- [ ] **Missing font-display: swap on @font-face** —  
  **Current:** Commented-out Switzer `@font-face` blocks in [src/app/globals.css](src/app/globals.css) include `font-display: swap`. Primary fonts are loaded via `next/font` in layout (comment says "display: swap"). **OK** if next/font is configured with `display: 'swap'`.

- [ ] **Font files served as TTF/OTF instead of WOFF2** —  
  **Current:** Commented Switzer uses `.woff2`. next/font uses Next’s optimization. **OK** unless you add custom TTF/OTF.

- [ ] **Missing font-kerning: normal on body** —  
  **Current:** Not set in [src/app/globals.css](src/app/globals.css). **Flag:** Add `font-kerning: normal` to `body` (and optionally to `.text-body`, etc.) if you want explicit kerning control.

---

## ALL CAPS & letter-spacing

- [ ] **ALL CAPS text without extra letter-spacing** —  
  **Current:** `.text-label` has `letter-spacing: 0.05em` and `text-transform: uppercase` in [src/app/globals.css](src/app/globals.css). **OK** for label style.  
  **Review:** Any other uppercase text (e.g. raw `uppercase` class) should have added letter-spacing.

---

## Dark mode

- [ ] **Dark mode styles that don’t reduce font-weight** —  
  **Current:** `.dark` in [src/app/globals.css](src/app/globals.css) only overrides colors; font-weight is unchanged. Recommendation: consider slightly lighter font-weight (e.g. 400 → 400, or 600 → 500 for headings) in dark mode to reduce glare. **Optional.**

---

## Accessibility & contrast

- [ ] **Color contrast below 4.5:1 for normal text** —  
  **Review:** Semantic tokens (e.g. `--color-text-secondary`, `--color-text-tertiary`) on `--color-surface-bg` / `--color-surface-card`. Run Lighthouse or a contrast checker on key pages (home, legal, one fund page).

- [ ] **Click/touch targets on text links smaller than 24×24px** —  
  **Review:** Footer links, nav links, inline text links. Ensure minimum 24×24px tap area (padding or min-height/min-width).

---

## Data & numbers

- [ ] **Price/data columns without font-variant-numeric: tabular-nums** —  
  **Current:** No `tabular-nums` or `font-variant-numeric` found in codebase. **Flag:** Add `font-variant-numeric: tabular-nums` (or Tailwind `tabular-nums`) to tables/cells that show currency, percentages, or aligned numbers (e.g. [TaxCreditTableSection](src/components/sections/TaxCreditTableSection.tsx), [ProjectionTable](src/components/investment/ProjectionTable.tsx), [MICFPerformanceSection](src/components/sections/MICFPerformanceSection.tsx), distribution tables).

---

## Copy & readability

- [ ] **Italic text used for emphasis on passages longer than 2 lines** —  
  **Review:** Any `<em>` or italic styling on long paragraphs; prefer bold or shorter emphasis.

- [ ] **Sentences exceeding 25 words (suggest splitting)** —  
  **Review:** Long strings in [src/app/terms-conditions/page.tsx](src/app/terms-conditions/page.tsx), [src/app/privacy-policy/page.tsx](src/app/privacy-policy/page.tsx), legal content, and Sanity-driven body copy. Manual or grep for very long sentences.

- [ ] **Filler words: "very", "really", "actually", "just", "basically"** —  
  **Review:** User-facing copy in sections and legal pages. Grep for these words and simplify where appropriate.

---

## Summary

| Category           | Status / action                                      |
|--------------------|------------------------------------------------------|
| Body alignment     | Review centered wrappers; ensure body prose is left-aligned. |
| Max-width / 75ch   | Applied on legal/terms/privacy/article; extend if needed.     |
| Line-height        | OK (1.5).                                            |
| font-display       | OK (swap in commented @font-face; next/font).        |
| WOFF2              | OK.                                                  |
| font-kerning       | Add on body if desired.                              |
| ALL CAPS           | OK for .text-label.                                  |
| Dark mode weight   | Optional: consider reducing weight in dark.           |
| Contrast           | Audit with Lighthouse.                               |
| Touch targets      | Audit footer/nav/inline links.                        |
| tabular-nums       | Add to data/price columns.                            |
| Italic/long sentences/filler | Manual review of long-form copy.              |
