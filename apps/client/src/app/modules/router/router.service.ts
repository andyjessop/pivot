import { service } from '@pivot/client/router';
import { injectable } from '@pivot/lib/injectable';

import { routes } from '~routes';

import { routerSlice } from './router.slice';

export const routerService = injectable({
  importFn: (sliceObj) => Promise.resolve(service(routes, sliceObj.api)),
  dependencies: [routerSlice],
  onDestroy: (service) => service.destroy(),
});
