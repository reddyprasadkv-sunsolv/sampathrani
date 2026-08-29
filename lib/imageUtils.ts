/**
 * Resolves local image URLs with basePath support for GitHub Pages and sub-path deployments
 */
export function getImageUrl(path: string | null | undefined): string {
  if (!path) return '';
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  if (basePath && !cleanPath.startsWith(basePath)) {
    return `${basePath}${cleanPath}`;
  }

  return cleanPath;
}
