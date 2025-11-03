import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
    dangerouslyAllowSVG: true,
  },
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
