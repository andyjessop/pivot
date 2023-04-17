import { injectable } from '@pivot/lib/injectable';
import { slice } from '@pivot/lib/slice';

export const headSlice = injectable({
  importFn: () =>
    import('@pivot/client/head').then((mod) =>
      slice('head', mod.initialState, mod.reducers),
    ),
});
