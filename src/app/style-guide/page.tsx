import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";
import { Container } from "@/components/layout/Container";
import {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  TextLarge,
  TextMedium,
  TextRegular,
  TextSmall,
  TextTiny,
  Tagline,
} from "@/components/ui/Typography";
import { Button } from "@/components/base/buttons/button";
import {
  GooglePlayButton,
  AppStoreButton,
} from "@/components/base/buttons/app-store-buttons";
import {
  GooglePlayButton as GooglePlayButtonOutline,
  AppStoreButton as AppStoreButtonOutline,
} from "@/components/base/buttons/app-store-buttons-outline";
import { IconButtonsShowcase } from "./IconButtonsShowcase";
import { breakpoints } from "@/lib/breakpoints";

export const metadata: Metadata = buildPageMetadata({
  title: "Style Guide | Mahaana",
  description:
    "Mahaana design system — typography, colors, breakpoints, and UI components.",
  path: "style-guide",
  noIndex: true,
});

const buttonVariants = [
  { color: "primary" as const, label: "Primary" },
  { color: "secondary" as const, label: "Secondary" },
  { color: "tertiary" as const, label: "Tertiary" },
  { color: "link-gray" as const, label: "Link gray" },
  { color: "link-color" as const, label: "Link color" },
  { color: "primary-destructive" as const, label: "Primary destructive" },
  { color: "secondary-destructive" as const, label: "Secondary destructive" },
  { color: "tertiary-destructive" as const, label: "Tertiary destructive" },
  { color: "link-destructive" as const, label: "Link destructive" },
];

const buttonSizes = ["sm", "md", "lg", "xl"] as const;

const colorSwatches: { name: string; bg: string; text: string }[][] = [
  [
    { name: "gray", bg: "bg-gray-100", text: "text-gray-900" },
    { name: "gray-200", bg: "bg-gray-200", text: "text-gray-900" },
    { name: "gray-300", bg: "bg-gray-300", text: "text-gray-900" },
    { name: "gray-400", bg: "bg-gray-400", text: "text-gray-100" },
    { name: "gray-600", bg: "bg-gray-600", text: "text-gray-100" },
    { name: "gray-700", bg: "bg-gray-700", text: "text-gray-100" },
    { name: "gray-800", bg: "bg-gray-800", text: "text-gray-100" },
    { name: "gray-900", bg: "bg-gray-900", text: "text-gray-100" },
  ],
  [
    { name: "primary-100", bg: "bg-primary-100", text: "text-gray-900" },
    { name: "primary-150", bg: "bg-primary-150", text: "text-gray-900" },
    { name: "primary-200", bg: "bg-primary-200", text: "text-gray-100" },
    { name: "primary-300", bg: "bg-primary-300", text: "text-gray-100" },
    { name: "primary-400", bg: "bg-primary-400", text: "text-gray-100" },
  ],
  [
    { name: "success-100", bg: "bg-success-100", text: "text-gray-900" },
    { name: "success-150", bg: "bg-success-150", text: "text-gray-900" },
    { name: "success-200", bg: "bg-success-200", text: "text-gray-100" },
    { name: "success-300", bg: "bg-success-300", text: "text-gray-100" },
    { name: "success-400", bg: "bg-success-400", text: "text-gray-100" },
  ],
  [
    { name: "warning-100", bg: "bg-warning-100", text: "text-gray-900" },
    { name: "warning-150", bg: "bg-warning-150", text: "text-gray-900" },
    { name: "warning-200", bg: "bg-warning-200", text: "text-gray-900" },
    { name: "warning-300", bg: "bg-warning-300", text: "text-gray-900" },
    { name: "warning-400", bg: "bg-warning-400", text: "text-gray-100" },
  ],
  [
    { name: "error-100", bg: "bg-error-100", text: "text-gray-900" },
    { name: "error-150", bg: "bg-error-150", text: "text-gray-900" },
    { name: "error-200", bg: "bg-error-200", text: "text-gray-100" },
    { name: "error-300", bg: "bg-error-300", text: "text-gray-100" },
    { name: "error-400", bg: "bg-error-400", text: "text-gray-100" },
  ],
  [
    { name: "info-100", bg: "bg-info-100", text: "text-gray-900" },
    { name: "info-150", bg: "bg-info-150", text: "text-gray-900" },
    { name: "info-200", bg: "bg-info-200", text: "text-gray-100" },
    { name: "info-300", bg: "bg-info-300", text: "text-gray-100" },
    { name: "info-400", bg: "bg-info-400", text: "text-gray-100" },
  ],
  [
    { name: "coral-100", bg: "bg-coral-100", text: "text-gray-900" },
    { name: "coral-150", bg: "bg-coral-150", text: "text-gray-900" },
    { name: "coral-200", bg: "bg-coral-200", text: "text-gray-100" },
    { name: "coral-300", bg: "bg-coral-300", text: "text-gray-100" },
    { name: "coral-400", bg: "bg-coral-400", text: "text-gray-100" },
  ],
  [
    { name: "teal-100", bg: "bg-teal-100", text: "text-gray-900" },
    { name: "teal-150", bg: "bg-teal-150", text: "text-gray-900" },
    { name: "teal-200", bg: "bg-teal-200", text: "text-gray-100" },
    { name: "teal-300", bg: "bg-teal-300", text: "text-gray-900" },
    { name: "teal-400", bg: "bg-teal-400", text: "text-gray-100" },
  ],
];
const paletteLabels = ["gray", "primary", "success", "warning", "error", "info", "coral", "teal"];

const semanticTokens = [
  { name: "text-primary", class: "text-text-primary", label: "Primary text" },
  { name: "text-secondary", class: "text-text-secondary", label: "Secondary text" },
  { name: "text-tertiary", class: "text-text-tertiary", label: "Tertiary text" },
  { name: "system-brand", class: "text-system-brand", label: "Brand accent" },
  { name: "system-success", class: "text-system-success", label: "Success" },
  { name: "system-warning", class: "text-system-warning", label: "Warning" },
  { name: "system-error", class: "text-system-error", label: "Error" },
  { name: "system-info", class: "text-system-info", label: "Info" },
];

export default function StyleGuidePage() {
  return (
    <div className="bg-surface-bg">
      <Container className="py-12 sm:py-16 lg:py-24 space-y-16">
        {/* Hero */}
        <section>
          <H1 className="text-text-primary">Style Guide</H1>
          <TextLarge className="mt-4 text-text-secondary max-w-2xl">
            Foundations for the Mahaana design system — typography, colors,
            breakpoints, and tokens.
          </TextLarge>
        </section>

        {/* Typography */}
        <section className="space-y-8">
          <H3 className="text-text-primary">Typography</H3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left column — Headings */}
            <div className="space-y-6">
              <TextSmall className="block text-text-tertiary uppercase tracking-wider mb-4">
                Headings
              </TextSmall>
              <div className="border-b border-surface-stroke pb-4">
                <H1 className="text-text-primary">Heading 1</H1>
                <TextSmall className="mt-2 text-text-tertiary">
                  font-heading · 40px → 56px (lg) · 120%
                </TextSmall>
              </div>
              <div className="border-b border-surface-stroke pb-4">
                <H2 className="text-text-primary">Heading 2</H2>
                <TextSmall className="mt-2 text-text-tertiary">
                  font-heading · 36px → 48px (lg) · 120%
                </TextSmall>
              </div>
              <div className="border-b border-surface-stroke pb-4">
                <H3 className="text-text-primary">Heading 3</H3>
                <TextSmall className="mt-2 text-text-tertiary">
                  font-heading · 32px → 40px (lg) · 120%
                </TextSmall>
              </div>
              <div className="border-b border-surface-stroke pb-4">
                <H4 className="text-text-primary">Heading 4</H4>
                <TextSmall className="mt-2 text-text-tertiary">
                  font-heading · 24px · 140%
                </TextSmall>
              </div>
              <div className="border-b border-surface-stroke pb-4">
                <H5 className="text-text-primary">Heading 5</H5>
                <TextSmall className="mt-2 text-text-tertiary">
                  font-heading · 20px · 140%
                </TextSmall>
              </div>
              <div className="border-b border-surface-stroke pb-4">
                <H6 className="text-text-primary">Heading 6</H6>
                <TextSmall className="mt-2 text-text-tertiary">
                  font-heading · 18px · 140%
                </TextSmall>
              </div>
            </div>

            {/* Right column — Body text */}
            <div className="space-y-6">
              <TextSmall className="block text-text-tertiary uppercase tracking-wider mb-4">
                Body text
              </TextSmall>
              <div className="border-b border-surface-stroke pb-4">
                <TextLarge className="text-text-secondary block">
                  TextLarge
                </TextLarge>
                <TextSmall className="mt-2 text-text-tertiary">
                  1.25rem · 150% line-height
                </TextSmall>
              </div>
              <div className="border-b border-surface-stroke pb-4">
                <TextMedium className="text-text-secondary block">
                  TextMedium
                </TextMedium>
                <TextSmall className="mt-2 text-text-tertiary">
                  1.125rem · 150% line-height
                </TextSmall>
              </div>
              <div className="border-b border-surface-stroke pb-4">
                <TextRegular className="text-text-secondary block">
                  TextRegular
                </TextRegular>
                <TextSmall className="mt-2 text-text-tertiary">
                  1rem · 150% line-height
                </TextSmall>
              </div>
              <div className="border-b border-surface-stroke pb-4">
                <TextSmall className="text-text-secondary block">
                  TextSmall
                </TextSmall>
                <TextSmall className="mt-2 text-text-tertiary">
                  0.875rem · 150% line-height
                </TextSmall>
              </div>
              <div className="border-b border-surface-stroke pb-4">
                <TextTiny className="text-text-secondary block">
                  TextTiny
                </TextTiny>
                <TextSmall className="mt-2 text-text-tertiary">
                  0.75rem · 150% line-height
                </TextSmall>
              </div>
              <div className="border-b border-surface-stroke pb-4">
                <Tagline className="text-text-tertiary block">Tagline</Tagline>
                <TextSmall className="mt-2 text-text-tertiary">
                  1rem · 150% line-height
                </TextSmall>
              </div>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section className="space-y-8">
          <H3 className="text-text-primary">Buttons</H3>
          <TextLarge className="text-text-secondary max-w-2xl">
            Untitled UI button components styled with Mahaana design system
            colors (primary-200, surface-card, text-primary, system-brand,
            system-error).
          </TextLarge>

          <div className="space-y-8">
            <div>
              <H4 className="mb-4 text-text-primary">Variants</H4>
              <div className="flex flex-wrap gap-4 items-center">
                {buttonVariants.map(({ color, label }) => (
                  <div key={color} className="flex flex-col gap-2 items-center">
                    <Button color={color}>{label}</Button>
                    <TextTiny className="text-text-tertiary">{color}</TextTiny>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <H4 className="mb-4 text-text-primary">Sizes</H4>
              <div className="flex flex-wrap gap-4 items-end">
                {buttonSizes.map((size) => (
                  <div key={size} className="flex flex-col gap-2 items-center">
                    <Button size={size} color="primary">
                      {size}
                    </Button>
                    <TextTiny className="text-text-tertiary">{size}</TextTiny>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <H4 className="mb-4 text-text-primary">States</H4>
              <div className="flex flex-wrap gap-4 items-center">
                <Button color="primary">Default</Button>
                <Button color="primary" isLoading>
                  Loading
                </Button>
                <Button color="primary" isDisabled>
                  Disabled
                </Button>
              </div>
            </div>

            <IconButtonsShowcase />
          </div>
        </section>

        {/* App Store buttons */}
        <section className="space-y-8">
          <H3 className="text-text-primary">App Store buttons</H3>
          <TextLarge className="text-text-secondary max-w-2xl">
            Untitled UI App Store and Google Play badge buttons, styled with
            design system tokens (surface-stroke, text-primary, system-brand).
          </TextLarge>

          <div className="space-y-8">
            <div>
              <H4 className="mb-4 text-text-primary">Filled (black badges)</H4>
              <div className="flex flex-wrap gap-4 items-center">
                <AppStoreButton />
                <GooglePlayButton />
                <AppStoreButton size="lg" />
                <GooglePlayButton size="lg" />
              </div>
            </div>

            <div>
              <H4 className="mb-4 text-text-primary">Outline</H4>
              <div className="flex flex-wrap gap-4 items-center">
                <AppStoreButtonOutline />
                <GooglePlayButtonOutline />
                <AppStoreButtonOutline size="lg" />
                <GooglePlayButtonOutline size="lg" />
              </div>
            </div>
          </div>
        </section>

        {/* Font families */}
        <section className="space-y-4">
          <H3 className="text-text-primary">Font families</H3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-surface-stroke bg-surface-card p-6">
              <p className="font-heading text-lg text-text-primary">
                Outfit — Headings
              </p>
              <TextSmall className="mt-2 text-text-tertiary">
                Weights: 300–800 · tracking-heading (-2%)
              </TextSmall>
            </div>
            <div className="rounded-lg border border-surface-stroke bg-surface-card p-6">
              <p className="font-body text-lg text-text-primary">
                Switzer — Body
              </p>
              <TextSmall className="mt-2 text-text-tertiary">
                Self-hosted · weights 300–800
              </TextSmall>
            </div>
          </div>
        </section>

        {/* Semantic tokens */}
        <section className="space-y-6">
          <H3 className="text-text-primary">Semantic tokens</H3>
          <div>
            <H4 className="mb-4 text-text-primary">Text colors</H4>
            <div className="flex flex-wrap gap-4">
              {semanticTokens.map((t) => (
                <div
                  key={t.name}
                  className="rounded-lg border border-surface-stroke bg-surface-card px-4 py-3"
                >
                  <p className={`text-sm font-medium ${t.class}`}>{t.label}</p>
                  <TextTiny className="text-text-tertiary">{t.name}</TextTiny>
                </div>
              ))}
            </div>
          </div>
          <div>
            <H4 className="mb-4 text-text-primary">Surface colors</H4>
            <div className="flex flex-wrap gap-4">
              <div className="h-20 w-40 rounded-lg bg-surface-bg border border-surface-stroke flex flex-col justify-end p-3">
                <TextTiny className="text-text-primary">surface-bg</TextTiny>
                <TextTiny className="text-text-tertiary">Page background</TextTiny>
              </div>
              <div className="h-20 w-40 rounded-lg bg-surface-card border border-surface-stroke flex flex-col justify-end p-3">
                <TextTiny className="text-text-primary">surface-card</TextTiny>
                <TextTiny className="text-text-tertiary">Card background</TextTiny>
              </div>
              <div className="h-20 w-40 rounded-lg bg-surface-bg border-4 border-surface-stroke flex flex-col justify-end p-3">
                <TextTiny className="text-text-primary">surface-stroke</TextTiny>
                <TextTiny className="text-text-tertiary">Borders, dividers</TextTiny>
              </div>
            </div>
          </div>
        </section>

        {/* Primitive colors */}
        <section className="space-y-8">
          <H3 className="text-text-primary">Primitive colors</H3>
          {colorSwatches.map((swatches, i) => (
            <div key={paletteLabels[i]}>
              <H4 className="mb-4 text-text-primary capitalize">
                {paletteLabels[i]}
              </H4>
              <div className="flex flex-wrap gap-2">
                {swatches.map(({ name, bg, text }) => (
                  <div
                    key={name}
                    className={`h-16 w-24 rounded-lg flex flex-col items-center justify-center p-2 ${bg} ${text}`}
                  >
                    <span className="text-tiny font-medium">
                      {name.split("-").pop()}
                    </span>
                    <span className="text-[10px] opacity-80">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Breakpoints */}
        <section className="space-y-4">
          <H3 className="text-text-primary">Breakpoints</H3>
          <div className="overflow-x-auto rounded-lg border border-surface-stroke">
            <table className="w-full min-w-[400px] text-left">
              <thead>
                <tr className="border-b border-surface-stroke bg-surface-card">
                  <th className="px-4 py-3 text-text-primary">Prefix</th>
                  <th className="px-4 py-3 text-text-primary">Size</th>
                  <th className="px-4 py-3 text-text-secondary">Usage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-stroke">
                {Object.entries(breakpoints).map(([prefix, size]) => (
                  <tr key={prefix} className="bg-surface-card">
                    <td className="px-4 py-3 font-mono text-system-brand">
                      {prefix}:
                    </td>
                    <td className="px-4 py-3 text-text-primary">{size}</td>
                    <td className="px-4 py-3 text-text-secondary">
                      min-width media query
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </Container>
    </div>
  );
}
