import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hides the dev overlay indicator; nextjs-portal may still exist for error overlay
  devIndicators: false,
};

export default nextConfig;
