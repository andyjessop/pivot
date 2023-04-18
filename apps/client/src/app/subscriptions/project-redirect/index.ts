import { createSelector } from 'reselect';

import { Route, Router } from '@pivot/client/router';

import { routerService, selectRoute } from '../../modules/router';

export const selectProjectRoute = createSelector(selectRoute, (route) => {
  if (route?.name === 'project') {
    return route;
  }
});

/**
 * Redirect /projects/:id to /projects/:id/deployments.
 */
export const projectRedirect = {
  selector: selectProjectRoute,
  handler: (router: Router) => (projectRoute: Route) => {
    if (!projectRoute) {
      return;
    }

    router.navigate({
      name: 'projectDeployments',
      params: projectRoute.params,
    });
  },
  dependencies: [routerService],
};
