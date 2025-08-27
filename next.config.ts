import type { NextConfig } from "next";
import path from "node:path";

const LOADER = path.resolve(
  __dirname,
  "src/visual-edits/component-tagger-loader.js"
);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  // Only enable turbopack in development
  ...(process.env.NODE_ENV === "development" && {
    experimental: {
      turbo: {
        rules: {
          "*.{jsx,tsx}": {
            loaders: [LOADER],
          },
        },
      },
    },
  }),
};

export default nextConfig;
