import { Feature } from '@pivot/client/features';
import { injectable } from '@pivot/lib/injectable';
import { resourceService, State } from '@pivot/lib/resource';
import { Service as ResourceService } from '@pivot/lib/resource';

import { httpService } from '../http';

import { featuresResourceSlice } from './features-resource.slice';

export const projectHttp = injectable({
  dependencies: [httpService],
  importFn: (http) => import('@pivot/client/features').then((mod) => mod.http(http)),
});

export const featuresResourceService = injectable({
  dependencies: [featuresResourceSlice, projectHttp],
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

export type FeaturesResource = ResourceService<Feature[], Error, [string]>;
export type FeaturesResourceState = State<Feature[], Error>;
