import { injectable } from '@pivot/lib/injectable';
import { slice } from '@pivot/lib/slice';

export const toasterSlice = injectable({
  importFn: () =>
    import('@pivot/client/toaster').then((m) => slice('breadcrumb', m.initialState, m.reducers)),
});
