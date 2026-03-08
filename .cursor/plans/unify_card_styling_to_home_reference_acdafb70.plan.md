---
name: Unify card styling to home reference
overview: "Align all benefit/feature cards across the site to the home page reference styling: light grey background (#f8f8f7), rounded-2xl, consistent padding (p-6), and icon-in-primary-100 pattern. Three sections already match; two need updates (ComplianceSection, FeatureCards). Optional typography normalization on Why Retirement / Why Save+."
todos: []
isProject: false
---

# Unify card styling to home page reference

## Reference (source of truth)

The home page “Why MAHAANA” section in [WhyMahaanaTrade.tsx](src/components/sections/WhyMahaanaTrade.tsx) defines the reference card style:

- **Card container:** `flex flex-col gap-6 rounded-2xl border border-surface-stroke bg-[#f8f8f7] p-6 dark:bg-surface-card`
- **Icon wrapper:** `flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary-100 p-2` with icon `size-6 text-primary-200`
- **Content:** `flex flex-col gap-2`; title `TextLarge weight="semibold" text-text-primary`; description `TextRegular text-text-tertiary`
- **Grid:** `grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3`

---

## Current state


| Section              | File                                                                         | Match? | Notes                                                                                          |
| -------------------- | ---------------------------------------------------------------------------- | ------ | ---------------------------------------------------------------------------------------------- |
| WhyMahaanaTrade      | [WhyMahaanaTrade.tsx](src/components/sections/WhyMahaanaTrade.tsx)           | Yes    | Reference                                                                                      |
| WhyRetirementSection | [WhyRetirementSection.tsx](src/components/sections/WhyRetirementSection.tsx) | Near   | Same card/icon; title has `text-[1.25rem] leading-7`                                           |
| WhySavePlusSection   | [WhySavePlusSection.tsx](src/components/sections/WhySavePlusSection.tsx)     | Near   | Same card/icon; title has `text-[1.25rem] leading-7`                                           |
| ComplianceSection    | [ComplianceSection.tsx](src/components/sections/ComplianceSection.tsx)       | No     | `bg-transparent`, no `p-2` on icon, raw `<p>` and different text classes, `min-h-[190px]`      |
| FeatureCards         | [FeatureCards.tsx](src/components/sections/FeatureCards.tsx)                 | No     | `bg-surface-card p-4`; step cards with image (different layout but should share surface style) |


---

## Changes to make

### 1. ComplianceSection — align to reference

**File:** [ComplianceSection.tsx](src/components/sections/ComplianceSection.tsx)

- **Card container:** Replace  
`flex min-h-[190px] flex-col gap-6 rounded-2xl border border-surface-stroke bg-transparent p-6 lg:min-h-[206px]`  
with the reference container (no `min-h`):  
`flex flex-col gap-6 rounded-2xl border border-surface-stroke bg-[#f8f8f7] p-6 dark:bg-surface-card`
- **Icon wrapper:** Add `p-2` and `shrink-0` so it matches:  
`flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary-100 p-2` and keep icon `size-6 text-primary-200` (use `text-primary-200` if not already).
- **Content:** Use shared typography components for consistency: wrap title in `TextLarge weight="semibold" className="text-text-primary"` and description in `TextRegular className="text-text-tertiary"` (or `text-text-secondary` if you prefer), and keep the same `flex flex-col gap-2` wrapper. Remove any redundant `<p>` classes so styling comes from these components.

Result: Compliance cards look like the home page “Why MAHAANA” cards (same background, padding, icon treatment, typography).

### 2. FeatureCards — align card surface to reference

**File:** [FeatureCards.tsx](src/components/sections/FeatureCards.tsx)

- **Card container (PinContainer content):** Change  
`className="flex h-full flex-col rounded-2xl border border-surface-stroke bg-surface-card p-4"`  
to use reference background and padding:  
`className="flex h-full flex-col rounded-2xl border border-surface-stroke bg-[#f8f8f7] p-6 dark:bg-surface-card"`

Layout (image, step number, title, description) and behavior stay the same; only the card panel styling matches the reference.

### 3. (Optional) Typography normalization — Why Retirement & Why Save+

**Files:** [WhyRetirementSection.tsx](src/components/sections/WhyRetirementSection.tsx), [WhySavePlusSection.tsx](src/components/sections/WhySavePlusSection.tsx)

- Both use `TextLarge` with extra `text-[1.25rem] leading-7` on the title. The reference uses `TextLarge weight="semibold" text-text-primary` with no size override.
- **Option A:** Remove `text-[1.25rem] leading-7` from both so title styling is identical to WhyMahaanaTrade.
- **Option B:** Add `text-[1.25rem] leading-7` to WhyMahaanaTrade titles so all three sections use the same title size. Choose one direction and apply consistently.

---

## Out of scope (no change)

- **SecurityBenefitsSection:** Single large panel (grid + image), not a grid of small cards; already updated in prior work.
- **TestimonialsSection:** Quote/avatar cards; different content type. Can optionally switch to `bg-[#f8f8f7] dark:bg-surface-card` for visual consistency; not required for “same styling as reference” for the icon+title+description cards.
- **BenefitsSection / retirement calculator / save-plus benefit cards:** Different component (headline, body, risk buttons, images); not the same card pattern as the reference.

---

## Summary

- **ComplianceSection:** Full alignment (card container, icon wrapper, typography) to WhyMahaanaTrade.
- **FeatureCards:** Card surface only (background + padding) to match reference.
- **Optional:** Normalize title typography across WhyMahaanaTrade, WhyRetirementSection, and WhySavePlusSection (either remove or add `text-[1.25rem] leading-7` consistently).

