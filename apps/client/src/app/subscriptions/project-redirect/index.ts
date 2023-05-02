import { createSelector } from 'reselect';

import { Router } from '@pivot/lib/router';

import { Route } from '~app/modules/router/router.types';

import { routerService, selectRoute } from '../../modules/router';

export const selectProjectRoute = createSelector(selectRoute, (route?: Route | null) => {
  if (route?.name === 'project') {
    return route;
  }
});

/**
 * Redirect /projects/:id to /projects/:id/deployments.
 */
export const projectRedirect = {
  dependencies: [routerService],
  handler: (router: Router) => (projectRoute: Route) => {
    if (!projectRoute) {
      return;
    }

    router.navigate({
      name: 'deployments',
      params: projectRoute.params,
    });
  },
  selector: selectProjectRoute,
};
