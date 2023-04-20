import { getParts } from '@pivot/client/breadcrumb';
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

    const parts = getParts(config, route?.name, route?.params);

    service.replaceParts(parts);
  },
  dependencies: [breadcrumbService],
};
