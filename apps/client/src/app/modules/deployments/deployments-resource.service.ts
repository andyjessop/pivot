import { Deployment } from '@pivot/client/deployments';
import { Model as PendingDeployment } from '@pivot/client/pending-deployment';
import { injectable } from '@pivot/lib/injectable';
import { resourceService, State } from '@pivot/lib/resource';
import { Service as ResourceService } from '@pivot/lib/resource';

import { httpService } from '../http';

import { deploymentsResourceSlice } from './deployments-resource.slice';

export const deploymentsHttpService = injectable({
  dependencies: [httpService],
  importFn: (http) => import('@pivot/client/deployments').then((mod) => mod.http(http)),
});

export const deploymentsResourceService = injectable({
  dependencies: [deploymentsResourceSlice, deploymentsHttpService],
  importFn: (slice, http) =>
    Promise.resolve(
      resourceService(
        {
          create: {
            query: (deployment: PendingDeployment) => http.post(deployment),
          },
          read: {
            query: (uuid: string) => http.get(uuid),
          },
        },
        slice,
      ),
    ),
});

export type DeploymentsResource = ResourceService<Deployment[], Error, [string]>;
export type DeploymentsResourceState = State<Deployment[], Error>;
