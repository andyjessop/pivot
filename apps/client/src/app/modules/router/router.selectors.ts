import { createSelector } from 'reselect';

import { selectors } from '@pivot/lib/router';

import { RouterState, Routes } from './router.types';

export const selectRouter = (state: { router: RouterState }) => state.router;

export const selectRoute = createSelector(selectRouter, selectors.route<Routes>);

export const selectRouteHash = createSelector(selectRoute, selectors.routeHash);

export const selectRouteName = createSelector(selectRoute, selectors.routeName);

export const selectRouteParams = createSelector(selectRoute, selectors.routeParams);

export const selectRouteSearch = createSelector(selectRoute, selectors.routeSearch);
