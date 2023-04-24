import { createSelector } from 'reselect';

import { selectors, State } from '@pivot/client/breadcrumb';

export const selectBreadcrumb = (state: { breadcrumb: State }) =>
  state.breadcrumb;

export const selectParts = createSelector(
  selectBreadcrumb,
  (breadcrumb) => breadcrumb?.parts ?? [],
);

export const selectBreadcrumbParts = createSelector(
  selectParts,
  selectors.parts,
);
