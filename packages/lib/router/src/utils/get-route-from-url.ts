import type { FullRoute, RouterConfig } from '../types';

export function getRouteFromUrl<T extends RouterConfig>(
  routes: T,
  fullUrl: string,
): FullRoute<T> | null {
  const { hash, pathname, searchParams } = new URL(fullUrl);

  const pathnameTokens = pathname.split('/');

  const params = {} as Record<string, string>;

  const name = Object.entries(routes).find(([_, route]) => {
    const pathTokens: string[] = route.path.split('/');

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
    ? ({
        hash,
        name,
        params,
        search: Object.fromEntries(searchParams.entries()),
      } as FullRoute<T>)
    : null;
}
