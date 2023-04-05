import { createSelector } from 'reselect';

import { selectIsAuthenitcated, selectIsWaiting } from '@pivot/client/auth';
import { routerService, selectRouteName } from '@pivot/client/router';
import { injectable } from '@pivot/lib/injectable';

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

export const authRouter = injectable({
  importFn: (router) =>
    Promise.resolve((shouldRedirect: boolean) => {
      if (shouldRedirect) {
        router.navigate({ name: 'notFound' });
      }
    }),
  dependencies: [routerService],
});
