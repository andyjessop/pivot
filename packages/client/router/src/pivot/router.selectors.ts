import { createSelector } from 'reselect';

import {
  routeHash,
  routeName,
  routeParams,
  routeSearch,
} from '../domain/selectors';
import { RouterState } from '../domain/types';

export const selectRouter = (state: { router: RouterState }) => state.router;

export const selectRoute = createSelector(
  selectRouter,
  (state) => state?.route,
);

export const selectRouteHash = createSelector(selectRoute, routeHash);

export const selectRouteName = createSelector(selectRoute, routeName);

export const selectRouteParams = createSelector(selectRoute, routeParams);

export const selectRouteSearch = createSelector(selectRoute, routeSearch);
