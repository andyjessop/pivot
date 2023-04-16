import { injectable } from '@pivot/lib/injectable';
import { resourceService } from '@pivot/lib/resource';

import { httpService } from '../http';

import { projectResourceSlice } from './project-resource.slice';

export const projectHttp = injectable({
  importFn: (http) =>
    import('@pivot/client/project').then((mod) => mod.http(http)),
  dependencies: [httpService],
});

export const projectResourceService = injectable({
  importFn: (slice, http) =>
    Promise.resolve(
      resourceService(
        {
          read: {
            pollingInterval: 1000,
            query: (uuid: string) => http.get(`/project/${uuid}`),
          },
        },
        slice,
      ),
    ),
  dependencies: [projectResourceSlice, httpService],
});
