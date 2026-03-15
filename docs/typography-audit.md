# Typography Audit — Mahaana

**Date:** 2025-03-15  
**Scope:** All `src/app/**/page.tsx` and `src/components/**/*.tsx` with text elements.

## Summary

- **Global:** `globals.css` sets only `font-family` and `letter-spacing` for h1–h6; no font-size, font-weight, or line-height for headings or `p`.
- **Typography.tsx:** H1–H6 and Text* apply fixed Tailwind sizes; many usages override via `className`.
- **60+ files** use raw `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<p>`, `<span>` or Typography with ad-hoc typography classes.

## Inconsistencies flagged

### h1
| File | Current |
|------|--------|
| MIIETFHero | raw h1 `text-[2.5rem] sm:text-5xl lg:text-[4.375rem]` |
| SavePlusHero | H1 `text-[2.5rem] sm:text-[3rem] lg:text-h1` |
| RetirementHero | raw h1 `text-[2.5rem] sm:text-[3rem] lg:text-[3.5rem]` |
| MICFHero | raw h1 `text-2xl sm:text-3xl lg:text-[3.5rem]` |
| FundHero | H1 `text-[2rem] sm:text-[2.5rem] lg:text-h1` |
| DownloadSection | raw h2 as hero `text-4xl sm:text-5xl md:text-6xl` |
| ResultsBar | p as hero `text-4xl sm:text-5xl lg:text-6xl` |
| PortableTextRenderer | h1 `text-[2rem] font-semibold lg:text-h2` |
| StudioRouteClient | h1 `text-xl font-semibold` |

### h2 (section headings)
| File | Current |
|------|--------|
| SituationCard, SummaryCard, InputCard | raw h2 `text-2xl font-bold lg:text-3xl` |
| PortableTextRenderer | h2 `text-xl font-semibold` |
| Many sections | H2 with `text-2xl sm:text-3xl lg:text-h2` overrides |

### h3
| File | Current |
|------|--------|
| BlogCard | h3 `text-medium font-bold` (body font) |
| ProjectionSection, InvestmentCalculator | h3 `text-2xl font-bold` |
| InvestorEducationContent | h3 `text-[20px] font-medium` |
| PortableTextRenderer | h3 `text-large font-semibold` |

### h4
| File | Current |
|------|--------|
| MIIRFPortfolioSection, MIIETFPortfolioSection, etc. | H4 `text-xl lg:text-2xl` |
| MIIRFOverviewSection, MICFOverviewSection | H4 `text-lg sm:text-xl` |
| SituationCard, StrategyCard | H4 `font-bold` |
| FeaturesSection | H3 `text-[1.75rem] sm:text-[1.875rem] lg:text-h4` |

### p / body
| File | Current |
|------|--------|
| Many | `font-body text-small` or `text-small` |
| Many | `text-base` |
| Footer links | `text-small` + `max-[768px]:text-sm max-[768px]:font-normal max-[768px]:leading-[1.5]` |
| TaxCreditTableSection | `font-body text-small` in cells |
| call-to-action-1 | `text-gray-100` (one-off color) |

### Colors
- Mix of `text-text-primary`, `text-text-secondary`, `text-text-tertiary`, `text-white`, `text-system-brand`, `text-primary-150`, `text-gray-100`.
- No single “light background” vs “dark background” scheme enforced.

### Intentional overrides (excluded from strip)
- Chart/axis/legend: inline `fontSize`/`fontWeight` in MICFPortfolioSection, ProjectionSection, HighchartsPerformanceChart, HighchartsVariablePieChartInner.
- Display numbers: e.g. ResultsBar hero number, NAV/stat blocks in heroes (e.g. TextMedium `text-[1.25rem]`).
- Labels: form labels, table headers, uppercase overlines (e.g. “Get Started”) — can standardize to one small/label style.

## Files with text elements (for Steps 3–4)

App: page.tsx (home, about, careers, security, save-plus, retirement, retirement-calculator, miietf, micf, miirf, reviews, investor-education, investor-education/[slug], help-center, investment-calculator, style-guide, studio).  
Components: All section components (MIIETFHero, SavePlusHero, RetirementHero, MICFHero, FundHero, DownloadSection, BenefitsSection, FeaturesSection, FAQSection, etc.), layout (Header, Footer), ui (Typography, PortableTextRenderer, accordion, badge, breadcrumb, button, call-to-action-1, chart, sheet, Field, etc.), retirement (FIRECalculator, ProjectionSection, ResultsBar, SituationCard, StrategyCard), investment (InvestmentCalculator, SummaryCard, InputCard, etc.), base (buttons, tooltip, input).
