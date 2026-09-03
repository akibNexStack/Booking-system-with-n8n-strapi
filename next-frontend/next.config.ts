import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Add remote image domains here when Strapi media is migrated.
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
