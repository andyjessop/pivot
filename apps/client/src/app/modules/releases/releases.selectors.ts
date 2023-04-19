import { createSelector } from 'reselect';

import { projectId } from '@pivot/client/project';
import { isReleasesRoute } from '@pivot/client/releases';

import { selectRouteName, selectRouteParams } from '../router';

import { ReleasesResourceState } from './releases-resource.service';

export const selectIsReleasesRoute = createSelector(
  selectRouteName,
  isReleasesRoute,
);

export const selectReleasesProjectId = createSelector(
  selectIsReleasesRoute,
  selectRouteParams,
  projectId,
);

export const selectReleasesResource = (state: unknown) =>
  (state as any).releasesResource as ReleasesResourceState;

export const selectReleasesResourceData = createSelector(
  selectReleasesResource,
  (releasesResource) => releasesResource?.data,
);
