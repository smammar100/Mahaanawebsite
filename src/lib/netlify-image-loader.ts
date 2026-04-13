import type { ImageLoaderProps } from "next/image";

/** True when Netlify Image CDN should rewrite the URL (production or `netlify dev`). */
function useNetlifyImageCdn(): boolean {
  return (
    process.env.NODE_ENV === "production" || process.env.NETLIFY === "true"
  );
}

function normalizeSrc(src: string): string {
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }
  return src.startsWith("/") ? src : `/${src}`;
}

/** SVG and GIF are served as-is — raster formats go through Netlify Image CDN. */
function shouldBypassCdn(src: string): boolean {
  const lower = src.split("?")[0]?.toLowerCase() ?? "";
  return (
    lower.endsWith(".svg") ||
    lower.endsWith(".gif") ||
    lower.endsWith(".ico")
  );
}

/**
 * Netlify Image CDN: `/.netlify/images?url=<path>&w=<width>&fm=avif&q=80`
 * @see https://docs.netlify.com/build/image-cdn/overview/
 */
export default function netlifyImageLoader({
  src,
  width,
  quality,
}: ImageLoaderProps): string {
  const normalized = normalizeSrc(src);

  if (!useNetlifyImageCdn() || shouldBypassCdn(normalized)) {
    return normalized;
  }

  const q = quality ?? 80;
  const params = new URLSearchParams();
  params.set("url", normalized);
  params.set("w", String(width));
  params.set("fm", "avif");
  params.set("q", String(q));

  return `/.netlify/images?${params.toString()}`;
}
