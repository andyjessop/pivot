import { Deployment } from '@pivot/client/deployments';
import { injectable } from '@pivot/lib/injectable';
import { resourceService } from '@pivot/lib/resource';
import { Draft } from '@pivot/util/model';

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
            query: (deployment: Draft<Deployment>) => http.post(deployment),
          },
          read: {
            query: (uuid: string) => http.get(uuid),
          },
        },
        slice,
      ),
    ),
});
