import { createResourceConfig } from '@pivot/client/deployment-variables';
import { DeploymentVariable } from '@pivot/client/deployment-variables';
import { injectable } from '@pivot/lib/injectable';
import { resourceService, resourceSlice } from '@pivot/lib/resource';

import { httpService } from '../http';

export const deploymentVariablesResourceSlice = injectable({
  importFn: () =>
    Promise.resolve(resourceSlice<DeploymentVariable[], any>('deploymentVariablesResource')),
});

export const deploymentVariablesHttpService = injectable({
  dependencies: [httpService],
  importFn: (http) => import('@pivot/client/deployment-variables').then((mod) => mod.http(http)),
});

export const deploymentVariablesResourceService = injectable({
  dependencies: [deploymentVariablesResourceSlice, deploymentVariablesHttpService],
  importFn: (slice, http) => Promise.resolve(resourceService(createResourceConfig(http), slice)),
});
