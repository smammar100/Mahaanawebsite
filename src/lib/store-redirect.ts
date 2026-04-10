import {
  MAHAANA_APP_STORE_URL,
  MAHAANA_GOOGLE_PLAY_URL,
} from "@/lib/app-store-urls";

/** Picks App Store vs Play Store from User-Agent (QR / smart link landing). */
export function resolveStoreUrlFromUserAgent(userAgent: string | null): string {
  const ua = userAgent ?? "";
  if (/iPhone|iPad|iPod/i.test(ua)) {
    return MAHAANA_APP_STORE_URL;
  }
  if (/Android/i.test(ua)) {
    return MAHAANA_GOOGLE_PLAY_URL;
  }
  return MAHAANA_GOOGLE_PLAY_URL;
}
