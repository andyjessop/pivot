import { Model } from '@pivot/client/project';
import { injectable } from '@pivot/lib/injectable';
import { resourceService, State } from '@pivot/lib/resource';
import { Service as ResourceService } from '@pivot/lib/resource';

import { httpService } from '../http';

import { projectResourceSlice } from './project-resource.slice';

export const projectHttp = injectable({
  dependencies: [httpService],
  importFn: (http) => import('@pivot/client/project').then((mod) => mod.http(http)),
});

export const projectResourceService = injectable({
  dependencies: [projectResourceSlice, projectHttp],
  importFn: (slice, http) =>
    Promise.resolve(
      resourceService(
        {
          read: {
            pollingInterval: 5000,
            query: (uuid: string) => http.get(uuid),
          },
        },
        slice,
      ),
    ),
});

export type ProjectResource = ResourceService<Model, Error, [string]>;
export type ProjectResourceState = State<Model, Error>;
