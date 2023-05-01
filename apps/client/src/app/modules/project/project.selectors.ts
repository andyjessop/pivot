import { createSelector } from 'reselect';

import { isProjectRoute, projectId } from '@pivot/client/project';

import { selectRouteName, selectRouteParams } from '../router';

import { ProjectResourceState } from './project-resource.service';

export const selectIsProjectRoute = createSelector(selectRouteName, isProjectRoute);

export const selectProjectId = createSelector(selectIsProjectRoute, selectRouteParams, projectId);

export const selectProjectResource = (state: unknown) =>
  (state as any).projectResource as ProjectResourceState;

export const selectProjectResourceData = createSelector(
  selectProjectResource,
  (projectResource) => projectResource?.data,
);

export const selectProjectName = createSelector(
  selectProjectResourceData,
  (project) => project?.name,
);
