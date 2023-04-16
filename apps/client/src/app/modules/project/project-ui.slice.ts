import { injectable } from '@pivot/lib/injectable';
import { slice } from '@pivot/lib/slice';

export const projectUiSlice = injectable({
  importFn: () =>
    import('@pivot/client/project').then((mod) =>
      slice('project', mod.initialState, mod.reducers),
    ),
});
