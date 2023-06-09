import { getParts } from '@pivot/client/breadcrumb';

import { BreadcrumbService, breadcrumbService } from '~app/modules/breadcrumb';
import { selectRoute } from '~app/modules/router';
import { routes } from '~routes';

import { Route } from '../router/router.types';

/**
 * Set the breadcrumbs.
 */
export const setBreadcrumb = {
  dependencies: [breadcrumbService],
  handler: (service: BreadcrumbService) => (route?: Route | null) => {
    if (!route) {
      return;
    }

    const parts = getParts(routes, route?.name, route?.params);

    service.replaceParts(parts);
  },
  selector: selectRoute,
};
