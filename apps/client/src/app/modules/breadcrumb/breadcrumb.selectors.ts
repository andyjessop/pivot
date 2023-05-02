import { createSelector } from 'reselect';

import { selectors } from '@pivot/client/breadcrumb';

import { Routes } from '../router/router.types';

import { BreadcrumbState } from './breadcrumb.types';

export const selectBreadcrumb = (state: { breadcrumb: BreadcrumbState }) => state.breadcrumb;

export const selectParts = createSelector(
  selectBreadcrumb,
  (breadcrumb) => breadcrumb?.parts ?? [],
);

export const selectBreadcrumbParts = createSelector(selectParts, selectors.parts<Routes>);
