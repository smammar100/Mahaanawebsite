import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hides the dev overlay indicator; nextjs-portal may still exist for error overlay
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.figma.com",
        pathname: "/api/mcp/asset/**",
      },
    ],
  },
};

export default nextConfig;
