import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true, // ✅ Skip ESLint errors
  },
  typescript: {
    ignoreBuildErrors: true, // ✅ Skip TypeScript errors
  },
};

export default nextConfig;
