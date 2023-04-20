import { pick } from '@pivot/util/object';

import { Part } from '../types';

export function getParts(
  config: Record<string, { path: string; parent?: string }>,
  routeName: string,
  routeParams?: Record<string, string>,
): Part[] {
  const breadcrumbs: Part[] = [];

  buildBreadcrumb(routeName, routeParams);

  return breadcrumbs;

  function buildBreadcrumb(route?: string, params?: Record<string, string>) {
    if (!route) {
      return;
    }

    if (!config[route]) {
      throw new Error(`Invalid route: ${route}`);
    }

    const pathParts = config[route].path
      .split('/')
      .filter((part) => part.length > 0);

    const pathParamKeys = pathParts
      .filter((part) => part.startsWith(':'))
      .map((part) => part.slice(1));

    const pathParams = params && pick(params, pathParamKeys);

    breadcrumbs.unshift({
      text: pathParts[pathParts.length - 1],
      route: {
        name: route,
        params: pathParamKeys.length ? pathParams : undefined,
      },
    });

    if (config[route].parent) {
      buildBreadcrumb(config[route].parent, params);
    }
  }
}
