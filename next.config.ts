import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
const isStaticExport = process.env.STATIC_EXPORT === 'true';

// Served from a custom domain (www.sampathrani.com), so the site lives at the root.
const basePath = '';

const nextConfig: NextConfig = {
  output: isGithubActions || isStaticExport ? 'export' : undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
