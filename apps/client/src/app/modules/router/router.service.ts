import { service } from '@pivot/client/router';
import { injectable } from '@pivot/lib/injectable';

import { config } from './router.config';
import { routerSlice } from './router.slice';

export const routerService = injectable({
  importFn: (sliceObj) => Promise.resolve(service(config, sliceObj.api)),
  dependencies: [routerSlice],
  onDestroy: (service) => service.destroy(),
});
