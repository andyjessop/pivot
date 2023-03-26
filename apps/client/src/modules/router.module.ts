import { injectable } from '@pivot/injectable';
import { slice } from '@pivot/slice';
import { initialState, reducers, router } from '@pivot/client-router';

export const routerSlice = injectable({
  importFn: () => Promise.resolve(slice('router', initialState, reducers)),
});

export const routerService = injectable({
  importFn: (sliceObj) =>
    Promise.resolve(
      router(
        {
          project: '/projects/:id',
          projects: '/projects',
        },
        sliceObj.api,
      ),
    ),
  dependencies: [routerSlice],
  onDestroy: (service) => service.destroy(),
});
