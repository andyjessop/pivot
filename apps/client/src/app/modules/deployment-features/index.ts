import { createResourceConfig, DeploymentFeature } from '@pivot/client/deployment-features';
import { injectable } from '@pivot/lib/injectable';
import { resourceService, resourceSlice } from '@pivot/lib/resource';

import { httpService } from '../http';

export const deploymentsResourceSlice = injectable({
  importFn: () =>
    Promise.resolve(resourceSlice<DeploymentFeature[], any>('deploymentFeaturesResource')),
});

export const deploymentFeaturesHttpService = injectable({
  dependencies: [httpService],
  importFn: (http) => import('@pivot/client/deployment-features').then((mod) => mod.http(http)),
});

export const deploymentFeaturesResourceService = injectable({
  dependencies: [deploymentsResourceSlice, deploymentFeaturesHttpService],
  importFn: (slice, http) => Promise.resolve(resourceService(createResourceConfig(http), slice)),
});
