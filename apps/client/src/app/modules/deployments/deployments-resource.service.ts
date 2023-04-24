import { Deployment } from '@pivot/client/deployments';
import { injectable } from '@pivot/lib/injectable';
import { resourceService, State } from '@pivot/lib/resource';
import { Service as ResourceService } from '@pivot/lib/resource';

import { httpService } from '../http';

import { deploymentsResourceSlice } from './deployments-resource.slice';

export const projectHttp = injectable({
  importFn: (http) =>
    import('@pivot/client/deployments').then((mod) => mod.http(http)),
  dependencies: [httpService],
});

export const deploymentsResourceService = injectable({
  importFn: (slice, http) =>
    Promise.resolve(
      resourceService(
        {
          read: {
            query: (uuid: string) => http.get(uuid),
          },
        },
        slice,
      ),
    ),
  dependencies: [deploymentsResourceSlice, projectHttp],
});

export type DeploymentsResource = ResourceService<
  Deployment[],
  Error,
  [string]
>;
export type DeploymentsResourceState = State<Deployment[], Error>;
