import { createSelector } from 'reselect';

import { selectIsAuthenitcated, selectIsWaiting } from '@pivot/client/auth';

import {
  routeHash,
  routeName,
  routeParams,
  routeSearch,
} from '../domain/selectors';
import { RouterState } from '../domain/types';

import { authenticatedRoutes } from './router.config';

export const selectRouter = (state: { router: RouterState }) => state.router;

export const selectRoute = createSelector(
  selectRouter,
  (state) => state?.route,
);

export const selectRouteHash = createSelector(selectRoute, routeHash);

export const selectRouteName = createSelector(selectRoute, routeName);

export const selectRouteParams = createSelector(selectRoute, routeParams);

export const selectRouteSearch = createSelector(selectRoute, routeSearch);

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
