import { createSelector } from 'reselect';

import { isDeploymentsRoute } from '@pivot/client/deployments';
import { projectId } from '@pivot/client/project';
import { humanReadableDate } from '@pivot/util/time';
import { stripProtocol } from '@pivot/util/url';

import { selectEnvironmentsResourceData } from '../environments';
import { selectReleasesResourceData } from '../releases';
import { selectRouteName, selectRouteParams } from '../router';

import { DeploymentsResourceState } from './deployments-resource.service';

export const selectIsDeploymentsRoute = createSelector(selectRouteName, isDeploymentsRoute);

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

export const selectDeploymentsData = createSelector(
  selectDeploymentsResourceData,
  selectEnvironmentsResourceData,
  selectReleasesResourceData,
  (deployments, environments, releases) =>
    deployments?.map((deployment) => ({
      ...deployment,
      created_at: humanReadableDate(deployment.created_at),
      environment: environments?.find(
        (environment) => environment.uuid === deployment.environment_id,
      ),
      release: releases?.find((release) => release.uuid === deployment.release_id),
      url: deployment.url,
      urlText: stripProtocol(deployment.url),
    })),
);
