import { injectable } from '@pivot/lib/injectable';
import { slice } from '@pivot/lib/slice';

export const pendingDeploymentSlice = injectable({
  importFn: () =>
    import('@pivot/client/pending-deployment').then((mod) =>
      slice('pendingDeployment', mod.initialState, mod.reducers),
    ),
});
