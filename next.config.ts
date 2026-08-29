import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
const repoName = 'sampathrani';

const nextConfig: NextConfig = {
  output: isGithubActions || process.env.STATIC_EXPORT === 'true' ? 'export' : undefined,
  basePath: isGithubActions ? `/${repoName}` : '',
  assetPrefix: isGithubActions ? `/${repoName}/` : undefined,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
