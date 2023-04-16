import { createSelector } from 'reselect';

import { isProjectRoute, projectId } from '@pivot/client/project';

import { selectRouteName, selectRouteParams } from '../router';

export const selectIsProjectRoute = createSelector(
  selectRouteName,
  isProjectRoute,
);

export const selectProjectId = createSelector(
  selectIsProjectRoute,
  selectRouteParams,
  projectId,
);
