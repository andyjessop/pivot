import { createSelector } from 'reselect';

import { isDeploymentsRoute } from '@pivot/client/deployments';
import { projectId } from '@pivot/client/project';

import { selectRouteName, selectRouteParams } from '../router';

import { DeploymentsResourceState } from './deployments-resource.service';

export const selectIsDeploymentsRoute = createSelector(
  selectRouteName,
  isDeploymentsRoute,
);

export const selectDeploymentsProjectId = createSelector(
  selectIsDeploymentsRoute,
  selectRouteParams,
  projectId,
);

export const selectDeploymentsResource = (state: unknown) =>
  (state as any).deploymentsResource as DeploymentsResourceState;

export const selectDeploymentsResourceData = createSelector(
  selectDeploymentsResource,
  (deploymentsResource) => deploymentsResource?.data,
);
