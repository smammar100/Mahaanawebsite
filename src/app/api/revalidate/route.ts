import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

/**
 * On-demand revalidation for Sanity webhooks.
 * In Sanity project settings, add a webhook with:
 * - URL: https://your-domain.com/api/revalidate
 * - Trigger: Create, Update, Delete (on documents you care about)
 * - HTTP method: POST
 * - Headers: Authorization: Bearer <REVALIDATION_SECRET>
 * Set REVALIDATION_SECRET in .env.local and in the webhook payload (or use a query param).
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

    if (_type === "post") {
      pathsToRevalidate.push("/investor-education");
      const slug = (body as { slug?: { current?: string } }).slug?.current;
      if (slug) revalidatePath(`/investor-education/${slug}`);
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
