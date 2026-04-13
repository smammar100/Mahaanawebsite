# Mahaana — product marketing context

Use this file as the source of truth for positioning, SEO copy, and agent skills. Update when products or messaging change.

## 1. Product overview

- **One line:** SECP-licensed, Shariah-compliant digital investment platform for Pakistan.
- **What we do:** Mahaana Wealth offers Save+ (money market / MICF), MIIETF (Islamic index ETF), Mahaana Islamic IGI Retirement Fund (MIIRF), retirement (VPS) products, and investor education—via web and mobile.
- **Category:** Digital wealth management / mutual funds / Islamic finance (Pakistan).
- **Primary URL:** https://www.mahaana.com

## 2. Target audience

- **Who:** Retail investors and professionals in Pakistan seeking regulated, Shariah-aligned savings and long-term investing.
- **Jobs to be done:** Earn competitive returns on cash, invest in funds/ETF, plan retirement with tax-aware VPS, learn via investor education.

## 3. Products (names to use consistently)

| Name        | Notes                                      |
| ----------- | ------------------------------------------ |
| Save+       | Often paired with MICF (cash fund)       |
| MICF        | Mahaana Islamic Cash Fund                  |
| MIIETF      | Mahaana Islamic Index ETF                  |
| MIIRF       | Mahaana IGI Islamic Retirement Fund      |
| Retirement  | VPS / retirement account (IGI partnership) |

## 4. Compliance & trust language

- SECP-regulated; Shariah compliance where stated; CDC custodian context where relevant.
- No guaranteed returns unless legally approved wording; use “illustrative” for calculators.

## 5. SEO & content rules

- Canonical site: `https://www.mahaana.com` (see `src/lib/metadata.ts`).
- Every public page should use `buildPageMetadata` with a unique `title` and `description`.
- Investor education articles: CMS-driven titles/descriptions; structured data as Article/NewsArticle as appropriate.
- Help Center: FAQPage JSON-LD must mirror visible Q&A exactly.

## 6. Words to prefer / avoid

- **Prefer:** Pakistan, SECP, Shariah compliant, transparent, regulated.
- **Avoid:** Guaranteed returns (unless statutory), unverified competitor claims.

## 7. Non-goals

- This repo is the marketing site, not the trading app.
- No competitor “alternatives” battle pages unless product explicitly adds them.
