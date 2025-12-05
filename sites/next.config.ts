import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // For GitHub Pages - uncomment and set your repo name if deploying to github.io/repo-name
  // basePath: "/your-repo-name",
  // assetPrefix: "/your-repo-name/",
};

export default nextConfig;
