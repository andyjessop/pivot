import { Release } from '@pivot/client/releases';
import { injectable } from '@pivot/lib/injectable';
import { resourceService, State } from '@pivot/lib/resource';
import { Service as ResourceService } from '@pivot/lib/resource';

import { httpService } from '../http';

import { releasesResourceSlice } from './releases-resource.slice';

export const projectHttp = injectable({
  dependencies: [httpService],
  importFn: (http) => import('@pivot/client/releases').then((mod) => mod.http(http)),
});

export const releasesResourceService = injectable({
  dependencies: [releasesResourceSlice, projectHttp],
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

export type ReleasesResource = ResourceService<Release[], [string]>;
export type ReleasesResourceState = State<Release[], Error>;
