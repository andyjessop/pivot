import type { FullRoute } from '../types';

export function getRouteFromUrl(
  config: Record<string, string>,
  fullUrl: string,
): FullRoute | null {
  const { hash, pathname, searchParams } = new URL(fullUrl);

  const pathnameTokens = pathname.split('/');

  const params = {} as Record<string, string>;

  const name = Object.entries(config).find(([_, path]) => {
    const pathTokens: string[] = path.split('/');

    if (pathTokens.length !== pathnameTokens.length) {
      return false;
    }

    return pathTokens.every((token, index) => {
      if (token.startsWith(':')) {
        params[token.replace(':', '')] = pathnameTokens[index];

        return true;
      }

      return token === pathnameTokens[index];
    });
  })?.[0];

  return name
    ? {
        hash,
        name,
        params,
        search: Object.fromEntries(searchParams.entries()),
      }
    : null;
}
