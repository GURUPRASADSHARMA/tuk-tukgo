import type { NextConfig } from "next";
import * as dotenv from "dotenv";
dotenv.config();


const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // ⚠️ Warning: this disables build-time linting
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true, // also skip TS errors in production builds
  },
};

export default nextConfig;
