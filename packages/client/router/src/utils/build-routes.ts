import { Routes } from './types';

/**
 * Takes a route configuration and returns a new route configuration with
 * parent routes added to each route entry.
 */
export function buildRoutes(routes: Routes): Routes {
  const updatedRoutes: Routes = {};

  const findParent = (currentKey: string, currentPathParts: string[]): string | undefined => {
    for (const key in routes) {
      if (key === currentKey) {
        continue;
      }

      const pathParts = routes[key].path.split('/').filter((part) => part !== '');

      if (
        pathParts.length === currentPathParts.length - 1 &&
        pathParts.every((part, i) => part === currentPathParts[i])
      ) {
        return key;
      }
    }

    return undefined;
  };

  for (const key in routes) {
    const currentRoute = routes[key];
    const pathParts = currentRoute.path.split('/').filter((part) => part !== '');
    const parentKey = currentRoute.parent ?? findParent(key, pathParts);

    updatedRoutes[key] = parentKey
      ? {
          ...currentRoute,
          parent: parentKey,
        }
      : {
          ...currentRoute,
        };
  }

  return updatedRoutes;
}
