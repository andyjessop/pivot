import { initialState, reducers, service } from '@pivot/client/router';
import { injectable } from '@pivot/lib/injectable';
import { slice } from '@pivot/lib/slice';

const config = {
  project: '/projects/:id',
  projects: '/projects',
};

export const routerSlice = injectable({
  importFn: () => Promise.resolve(slice('router', initialState, reducers)),
});

export const routerService = injectable({
  importFn: (sliceObj) => Promise.resolve(service(config, sliceObj.api)),
  dependencies: [routerSlice],
  onDestroy: (service) => service.destroy(),
});
