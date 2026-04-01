import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

/**
 * On-demand revalidation for Sanity webhooks.
 * Setup: docs/sanity.md (section “Cache revalidation”). Set REVALIDATION_SECRET on Netlify
 * and in the Sanity webhook Authorization header (Bearer <secret>). Local: .env.local.
 */
export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATION_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "Revalidation not configured" },
      { status: 501 }
    );
  }

  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace(/^Bearer\s+/i, "") ?? request.nextUrl.searchParams.get("secret");
  if (token !== secret) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const _type = (body as { _type?: string })._type;

    const pathsToRevalidate = [
      "/",
      "/investor-education",
      "/reviews",
      "/micf",
      "/miietf",
      "/miirf",
      "/save-plus",
      "/retirement",
    ];

    if (
      _type === "investorEducationArticle" ||
      _type === "investorEducationNews" ||
      _type === "investorEducationVideoPodcast"
    ) {
      pathsToRevalidate.push("/investor-education", "/about");
      const slug = (body as { slug?: { current?: string } }).slug?.current;
      if (slug) revalidatePath(`/investor-education/${slug}`);
    }

    if (_type === "fundDocument") {
      revalidatePath("/micf");
      revalidatePath("/miietf");
      revalidatePath("/miirf");
    }

    for (const path of pathsToRevalidate) {
      revalidatePath(path);
    }

    return NextResponse.json({
      revalidated: true,
      paths: pathsToRevalidate,
      now: Date.now(),
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Revalidation failed", details: String(err) },
      { status: 500 }
    );
  }
}
