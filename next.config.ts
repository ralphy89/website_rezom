import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  outputFileTracingRoot: path.resolve(process.cwd()),
  eslint: {
    dirs: ["app", "components", "lib", "hooks"],
  },
};

export default nextConfig;
