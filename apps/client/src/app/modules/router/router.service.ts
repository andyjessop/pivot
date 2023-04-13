import { service } from '@pivot/client/router';
import { injectable } from '@pivot/lib/injectable';

import { routerSlice } from './router.slice';

const config = {
  notFound: '/404',
  project: '/projects/:id',
  projects: '/projects',
};

export const authenticatedRoutes = ['project', 'projects'];

export const routerService = injectable({
  importFn: (sliceObj) => Promise.resolve(service(config, sliceObj.api)),
  dependencies: [routerSlice],
  onDestroy: (service) => service.destroy(),
});
