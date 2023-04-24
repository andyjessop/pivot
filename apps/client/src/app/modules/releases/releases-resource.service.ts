import { Release } from '@pivot/client/releases';
import { injectable } from '@pivot/lib/injectable';
import { resourceService, State } from '@pivot/lib/resource';
import { Service as ResourceService } from '@pivot/lib/resource';

import { httpService } from '../http';

import { releasesResourceSlice } from './releases-resource.slice';

export const projectHttp = injectable({
  importFn: (http) =>
    import('@pivot/client/releases').then((mod) => mod.http(http)),
  dependencies: [httpService],
});

export const releasesResourceService = injectable({
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
  dependencies: [releasesResourceSlice, projectHttp],
});

export type ReleasesResource = ResourceService<Release[], Error, [string]>;
export type ReleasesResourceState = State<Release[], Error>;
