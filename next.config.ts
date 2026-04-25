import type { NextConfig } from "next";
import { MAHAANA_PORTAL_LOGIN_URL } from "./src/lib/portal-urls";

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  trailingSlash: false,
  experimental: {
    optimizePackageImports: [
      "@untitledui/icons",
      "lucide-react",
      "react-icons",
      "@heroicons/react",
      "motion",
      "@radix-ui/react-icons",
    ],
  },
  images: {
    /** Responsive srcset widths for Next.js image optimization. */
    deviceSizes: [400, 800, 1200, 1920],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "deifkwefumgah.cloudfront.net",
        pathname: "/shadcnblocks/**",
      },
      {
        protocol: "https",
        hostname: "cdn.prod.website-files.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "play-lh.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/login",
        destination: MAHAANA_PORTAL_LOGIN_URL,
        permanent: true,
      },
    ];
  },
  async headers() {
    const projectId =
      process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "ctfatnb0";
    const studioOrigin = `https://${projectId}.sanity.studio`;
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `frame-ancestors 'self' http://localhost:3000 http://localhost:3002 ${studioOrigin} https://www.sanity.io https://*.sanity.io`,
          },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
