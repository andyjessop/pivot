import { Variable } from '@pivot/client/variables';
import { injectable } from '@pivot/lib/injectable';
import { resourceService, State } from '@pivot/lib/resource';
import { Service as ResourceService } from '@pivot/lib/resource';

import { httpService } from '../http';

import { variablesResourceSlice } from './variables-resource.slice';

export const variablesHttp = injectable({
  dependencies: [httpService],
  importFn: (http) => import('@pivot/client/variables').then((mod) => mod.http(http)),
});

export const variablesResourceService = injectable({
  dependencies: [variablesResourceSlice, variablesHttp],
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

export type VariablesResource = ResourceService<Variable[], [string]>;
export type VariablesResourceState = State<Variable[], Error>;
