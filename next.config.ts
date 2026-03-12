import type { NextConfig } from "next";

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
    ],
  },
  async headers() {
    const projectId =
      process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "ke6ev8q3";
    const studioOrigin = `https://${projectId}.sanity.studio`;
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `frame-ancestors 'self' http://localhost:3000 http://localhost:3002 ${studioOrigin} https://www.sanity.io`,
          },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
