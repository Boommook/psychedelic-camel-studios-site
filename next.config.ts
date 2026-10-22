import type { NextConfig } from "next";
const config: NextConfig = {
  turbopack: { root: process.cwd() },
  trailingSlash: true,
  images: { unoptimized: true },
};
export default config;
