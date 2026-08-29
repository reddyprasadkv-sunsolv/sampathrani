import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
const isStaticExport = process.env.STATIC_EXPORT === 'true';
const repoName = 'sampathrani';
const basePath = isGithubActions || isStaticExport ? `/${repoName}` : '';

const nextConfig: NextConfig = {
  output: isGithubActions || isStaticExport ? 'export' : undefined,
  basePath: basePath || undefined,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
