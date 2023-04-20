import { createSelector } from 'reselect';

import { RouterState, selectors } from '@pivot/client/router';

// import { config } from './router.config';

export const selectRouter = (state: { router: RouterState }) => state.router;

export const selectRoute = createSelector(selectRouter, selectors.route);

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
