import { Part } from '@pivot/client/breadcrumb';
import { Route } from '@pivot/client/router';

import { BreadcrumbService, breadcrumbService } from '~app/modules/breadcrumb';
import { selectRoute } from '~app/modules/router';
import { config } from '~app/modules/router/router.config';

/**
 * Set the breadcrumbs.
 */
export const setBreadcrumb = {
  selector: selectRoute,
  handler: (service: BreadcrumbService) => (route?: Route | null) => {
    if (!route) {
      return;
    }

    const parts = getParts(route?.name, route?.params);

    service.replaceParts(parts);
  },
  dependencies: [breadcrumbService],
};

function getParts(
  routeName: string,
  routeParams?: Record<string, string>,
): Part[] {
  const breadcrumbs: Part[] = [];

  function buildBreadcrumbs(route?: string, params?: Record<string, string>) {
    if (!route) {
      return;
    }

    if (!config[route]) {
      throw new Error(`Invalid route: ${route}`);
    }

    const pathParts = config[route].path
      .split('/')
      .filter((part) => part.length > 0);

    breadcrumbs.unshift({
      text: pathParts[pathParts.length - 1],
      route: {
        name: route,
        params,
      },
    });

    if (config[route].parent) {
      buildBreadcrumbs(config[route].parent, params);
    }
  }

  buildBreadcrumbs(routeName, routeParams);

  return breadcrumbs;
}
