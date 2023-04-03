import { authSlice } from '@pivot/client/auth';
import { injectable } from '@pivot/lib/injectable';

import { service } from '../domain';

import { routerSlice } from './router.slice';

const config = {
  notFound: '/404',
  project: '/projects/:id',
  projects: '/projects',
};

export const authenticatedRoutes = ['project', 'projects'];

export const routerService = injectable({
  importFn: (sliceObj, auth) =>
    Promise.resolve(
      service(config, sliceObj.api, auth.select, authenticatedRoutes),
    ),
  dependencies: [routerSlice, authSlice],
  onDestroy: (service) => service.destroy(),
});
