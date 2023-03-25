import { injectable } from '@pivot/pivot-injectable';
import { slice } from '@pivot/slice';

export const routerSlice = injectable({
  importFn: () =>
    import('@pivot/client-router').then((m) =>
      slice('router', m.initialState, m.reducers),
    ),
});

export const routerService = injectable({
  importFn: (sliceObj) =>
    import('@pivot/client-router').then((m) =>
      m.router(
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
