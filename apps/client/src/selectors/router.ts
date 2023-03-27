import { createSelector } from 'reselect';

import { selectors } from '@pivot/client-router';

import { select } from '~store';

export const selectRouter = () => select('router');

export const selectRoute = createSelector(
  selectRouter,
  (state) => state?.route,
);

export const selectRouteHash = createSelector(selectRoute, selectors.routeHash);

export const selectRouteName = createSelector(selectRoute, selectors.routeName);

export const selectRouteParams = createSelector(
  selectRoute,
  selectors.routeParams,
);

export const selectRouteSearch = createSelector(
  selectRoute,
  selectors.routeSearch,
);
