import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['i.ytimg.com', 'img.youtube.com'],
  },
  serverExternalPackages: ['puppeteer'],
};

export default nextConfig;
