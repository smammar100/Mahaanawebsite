import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";
import { getStoreRedirectQrUrl } from "@/lib/public-site-url";
import { GetAppLanding } from "@/components/get-app/GetAppLanding";

export const metadata: Metadata = buildPageMetadata({
  title: "Get the Mahaana app | Mahaana",
  description:
    "Download the Mahaana app for iOS or Android. Scan the QR code or tap through to the App Store or Google Play.",
  path: "get-app",
});

export default async function GetAppPage() {
  const storeRedirectQrUrl = await getStoreRedirectQrUrl();

  return <GetAppLanding storeRedirectQrUrl={storeRedirectQrUrl} />;
}
