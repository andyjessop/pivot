import { createSelector } from 'reselect';

import { isProjectRoute } from '@pivot/client/project';

import { selectRouteName } from '../router';

export const selectIsProjectRoute = createSelector(
  selectRouteName,
  isProjectRoute,
);
