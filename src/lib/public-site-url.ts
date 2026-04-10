import { headers } from "next/headers";
import { SITE_URL } from "@/lib/metadata";

/** Public site origin from env (e.g. https://www.mahaana.com), no trailing slash. */
export function getPublicSiteOriginFromEnv(): string | null {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return null;
  try {
    return new URL(raw).origin;
  } catch {
    return null;
  }
}

/**
 * Origin for absolute URLs (QR codes, etc.). Prefer NEXT_PUBLIC_SITE_URL; else request Host; else SITE_URL.
 */
export async function getPublicSiteOrigin(): Promise<string> {
  const fromEnv = getPublicSiteOriginFromEnv();
  if (fromEnv) return fromEnv;

  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "https";
  if (host) {
    return `${proto}://${host}`;
  }

  try {
    return new URL(SITE_URL).origin;
  } catch {
    return "https://www.mahaana.com";
  }
}

/** Full URL to the smart store redirect (for QR encoding). */
export async function getStoreRedirectQrUrl(): Promise<string> {
  const origin = await getPublicSiteOrigin();
  return `${origin}/api/store-redirect`;
}
