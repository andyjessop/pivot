import { createSelector } from 'reselect';

import { selectIsAuthenitcated, selectIsWaiting } from '@pivot/client/auth';
import { Router, routerService, selectRouteName } from '@pivot/client/router';

const authenticatedRoutes = ['projects', 'project'];

export const selectIsAuthorized = createSelector(
  selectIsAuthenitcated,
  selectIsWaiting,
  selectRouteName,
  (isAuthenitcated, isWaiting, routeName) => {
    if (!routeName || isWaiting) {
      return true;
    }

    const isAuthenticatedRoute = authenticatedRoutes.includes(routeName);

    if (isAuthenticatedRoute && isAuthenitcated) {
      return true;
    }

    return false;
  },
);

export const selectShouldRedirectToNotFound = createSelector(
  selectIsAuthorized,
  selectRouteName,
  (isAuthorized, routeName) => {
    if (!isAuthorized && routeName !== 'notFound') {
      return true;
    }

    return false;
  },
);

/**
 * Auth-Router subscription. This handles the redirecting of the user to the not-found page
 * if they are not authorized to view the current route.
 */
export const authRouter = {
  selector: selectShouldRedirectToNotFound,
  handler: (router: Router) => (shouldRedirect: boolean) => {
    if (shouldRedirect) {
      router.navigate({ name: 'notFound' });
    }
  },
  dependencies: [routerService],
};
