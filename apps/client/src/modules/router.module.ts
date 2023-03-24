import { injectable } from '@pivot/pivot-injectable';
import { slice } from '@pivot/slice';

export const routerSlice = injectable(() =>
  import('@pivot/client-router').then((m) =>
    slice('router', m.initialState, m.reducers),
  ),
);

export const routerService = injectable(
  (sliceObj) =>
    import('@pivot/client-router').then((m) =>
      m.router(
        {
          project: '/projects/:id',
          projects: '/projects',
        },
        sliceObj.api,
      ),
    ),
  [routerSlice],
);
