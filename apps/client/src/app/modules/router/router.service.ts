import { injectable } from '@pivot/lib/injectable';
import { service } from '@pivot/lib/router';

import { routes } from '~routes';

import { routerSlice } from './router.slice';

export const routerService = injectable({
  dependencies: [routerSlice],
  importFn: (sliceObj) => Promise.resolve(service(routes, sliceObj.api)),
  onDestroy: (service) => service.destroy(),
});
