import { createSelector } from 'reselect';

import { isEnvironmentsRoute } from '@pivot/client/environments';
import { projectId } from '@pivot/client/project';
import { stripProtocol } from '@pivot/util/url';

import { selectRouteName, selectRouteParams } from '../router';

import { EnvironmentsResourceState } from './environments-resource.service';

export const selectIsEnvironmentsRoute = createSelector(selectRouteName, isEnvironmentsRoute);

export const selectEnvironmentsProjectId = createSelector(
  selectIsEnvironmentsRoute,
  selectRouteParams,
  projectId,
);

export const selectEnvironmentsResource = (state: unknown) =>
  (state as any).environmentsResource as EnvironmentsResourceState;

export const selectEnvironmentsResourceData = createSelector(
  selectEnvironmentsResource,
  (environmentsResource) => environmentsResource?.data,
);

export const selectEnvironmentsData = createSelector(
  selectEnvironmentsResourceData,
  (environments) =>
    environments?.map((environment) => ({
      ...environment,
      urlText: environment.url && stripProtocol(environment.url),
    })),
);
