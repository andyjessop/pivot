import { Environment } from '@pivot/client/environments';
import { injectable } from '@pivot/lib/injectable';
import { resourceService, State } from '@pivot/lib/resource';
import { Service as ResourceService } from '@pivot/lib/resource';

import { httpService } from '../http';

import { environmentsResourceSlice } from './environments-resource.slice';

export const projectHttp = injectable({
  dependencies: [httpService],
  importFn: (http) => import('@pivot/client/environments').then((mod) => mod.http(http)),
});

export const environmentsResourceService = injectable({
  dependencies: [environmentsResourceSlice, projectHttp],
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
});

export type EnvironmentsResource = ResourceService<Environment, Error, [string]>;
export type EnvironmentsResourceState = State<Environment[], Error>;
