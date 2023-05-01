import { pick } from '@pivot/util/object';

import { Part } from '../types';

/**
 * Get the breadcrumb parts for a given route. This will recursively build the breadcrumb
 * parts for the given route and all of its parents.
 *
 * Dynamic parts will contain the part id as the text:
 *
 * @example
 *
 * const config = {
 *   project: {
 *     path: '/projects/:id',
 *     parent: 'projects',
 *   },
 *   projects: {
 *     path: '/projects',
 *   },
 * };
 *
 * const parts = getParts(config, 'project', { id: '123' });
 *
 * // parts = [
 * //  { text: 'projects', route: { name: 'projects' } },
 * //  { text: ':id', route: { name: 'project', params: { id: '123' } } },
 * // ];
 *
 * The id is to be subsituted by the route handler.
 */
export function getParts(
  config: Record<string, { parent?: string; path: string }>,
  routeName: string,
  routeParams?: Record<string, string | undefined>,
): Part[] {
  const breadcrumbs: Part[] = [];

  buildBreadcrumb(routeName, routeParams);

  return breadcrumbs;

  function buildBreadcrumb(route?: string, params?: Record<string, string | undefined>) {
    if (!route) {
      return;
    }

    if (!config[route]) {
      throw new Error(`Invalid route: ${route}`);
    }

    const pathParts = config[route].path.split('/').filter((part) => part.length > 0);

    const pathParamKeys = pathParts
      .filter((part) => part.startsWith(':'))
      .map((part) => part.slice(1));

    const pathParams = params && pick(params, pathParamKeys);

    breadcrumbs.unshift({
      route: {
        name: route,
        params: pathParamKeys.length ? pathParams : undefined,
      },
      text: pathParts[pathParts.length - 1],
    });

    if (config[route].parent) {
      buildBreadcrumb(config[route].parent, params);
    }
  }
}
