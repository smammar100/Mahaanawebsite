import { NextResponse } from "next/server";
import { resolveStoreUrlFromUserAgent } from "@/lib/store-redirect";

export async function GET(request: Request) {
  const ua = request.headers.get("user-agent");
  const url = resolveStoreUrlFromUserAgent(ua);
  return NextResponse.redirect(url, 302);
}
