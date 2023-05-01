import { Model } from '@pivot/client/project';
import { injectable } from '@pivot/lib/injectable';
import { resourceService, State } from '@pivot/lib/resource';
import { Service as ResourceService } from '@pivot/lib/resource';

import { httpService } from '../http';

import { projectResourceSlice } from './project-resource.slice';

export const projectHttp = injectable({
  importFn: (http) => import('@pivot/client/project').then((mod) => mod.http(http)),
  dependencies: [httpService],
});

export const projectResourceService = injectable({
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
  dependencies: [projectResourceSlice, projectHttp],
});

export type ProjectResource = ResourceService<Model, Error, [string]>;
export type ProjectResourceState = State<Model, Error>;
