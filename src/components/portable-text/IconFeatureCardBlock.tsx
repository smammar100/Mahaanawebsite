import Image from "next/image";
import type { ComponentType, CSSProperties } from "react";
import {
  Bell01,
  CheckCircle,
  Mail01,
  ShieldTick,
  ZapCircle,
} from "@untitledui/icons";
import { urlFor } from "@/lib/sanity/image";
import { cleanCopy } from "@/lib/copy-utils";

type IconPresetKey = "checkCircle" | "shieldTick" | "bell" | "mail" | "zap";

const PRESET_ICONS: Record<
  IconPresetKey,
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>
> = {
  checkCircle: CheckCircle,
  shieldTick: ShieldTick,
  bell: Bell01,
  mail: Mail01,
  zap: ZapCircle,
};

interface IconImageValue {
  asset?: { _ref?: string; _id?: string };
  [key: string]: unknown;
}

interface IconFeatureItem {
  _key?: string;
  text?: string;
  iconImage?: IconImageValue;
  iconPreset?: string;
}

interface IconFeatureCardValue {
  heading?: string;
  intro?: string;
  items?: IconFeatureItem[];
  backgroundPreset?: "darkNavy" | "surface" | "brandTint" | "custom" | string;
  customBackgroundColor?: string;
  textColor?: "light" | "dark" | string;
}

function isPresetKey(v: string | undefined): v is IconPresetKey {
  return v != null && v in PRESET_ICONS;
}

function backgroundClass(preset: string | undefined): string {
  switch (preset) {
    case "surface":
      return "border border-surface-stroke bg-surface-card";
    case "brandTint":
      return "border border-[#d0bafe]/40 bg-[#e7dcff]";
    case "custom":
      return "";
    case "darkNavy":
    default:
      return "bg-[#0a1120]";
  }
}

function backgroundStyle(
  preset: string | undefined,
  customHex: string | undefined
): CSSProperties | undefined {
  if (preset === "custom" && customHex?.trim()) {
    return { backgroundColor: customHex.trim() };
  }
  return undefined;
}

function toneClasses(t: "light" | "dark") {
  if (t === "dark") {
    return {
      heading: "text-text-primary",
      intro: "text-text-tertiary",
      line: "text-text-tertiary",
      iconRing: "border-system-brand/35 text-system-brand",
      decor: "bg-system-brand/15",
    };
  }
  return {
    heading: "text-white",
    intro: "text-white/90",
    line: "text-white/90",
    iconRing: "border-white/35 text-system-brand",
    decor: "bg-blue-500/10",
  };
}

function IconSlot({
  item,
  ringClass,
}: {
  item: IconFeatureItem;
  ringClass: string;
}) {
  const img = item.iconImage;
  const hasAsset = Boolean(img?.asset?._ref || img?.asset?._id);

  if (hasAsset && img) {
    const src = urlFor(img as Parameters<typeof urlFor>[0])
      .width(96)
      .height(96)
      .fit("max")
      .auto("format")
      .url();
    return (
      <span
        className={`flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 p-1.5 ${ringClass}`}
      >
        <Image
          src={src}
          alt=""
          width={40}
          height={40}
          className="size-7 object-contain"
          sizes="40px"
        />
      </span>
    );
  }

  const key = isPresetKey(item.iconPreset) ? item.iconPreset : "checkCircle";
  const Icon = PRESET_ICONS[key];
  return (
    <span
      className={`flex size-10 shrink-0 items-center justify-center rounded-full border-2 p-1.5 ${ringClass}`}
      aria-hidden
    >
      <Icon className="size-5" />
    </span>
  );
}

export function IconFeatureCardBlock({ value }: { value: IconFeatureCardValue }) {
  const heading = value.heading?.trim();
  const intro = value.intro?.trim();
  const items = value.items || [];
  const preset = value.backgroundPreset || "darkNavy";
  const customHex = value.customBackgroundColor?.trim();
  const tone: "light" | "dark" = value.textColor === "dark" ? "dark" : "light";
  const tc = toneClasses(tone);

  if (!heading && items.length === 0) return null;

  const style = backgroundStyle(preset, customHex);
  const showDecor = preset === "darkNavy" || (preset === "custom" && tone === "light");

  return (
    <section
      className={`relative my-10 overflow-hidden rounded-3xl p-6 sm:p-8 ${backgroundClass(preset)}`}
      style={style}
    >
      {showDecor ? (
        <div
          className={`pointer-events-none absolute -right-8 -top-8 size-56 rounded-full ${tc.decor} blur-2xl sm:size-64`}
          aria-hidden
        />
      ) : null}

      <div className="relative">
        {heading ? (
          <h2 className={`mb-4 text-xl font-semibold sm:text-2xl ${tc.heading}`}>
            {cleanCopy(heading)}
          </h2>
        ) : null}

        {intro ? (
          <p className={`mb-6 text-body leading-relaxed ${tc.intro}`}>{cleanCopy(intro)}</p>
        ) : null}

        {items.length > 0 ? (
          <ul className="space-y-4">
            {items.map((item, index) => (
              <li key={item._key || `${item.text}-${index}`} className="flex gap-3">
                <IconSlot item={item} ringClass={tc.iconRing} />
                <span className={`min-w-0 flex-1 text-body leading-relaxed ${tc.line}`}>
                  {item.text ? cleanCopy(item.text) : null}
                </span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
