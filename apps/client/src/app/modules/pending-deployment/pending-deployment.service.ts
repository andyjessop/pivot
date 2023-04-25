import { injectable } from '@pivot/lib/injectable';

import { pendingDeploymentSlice } from './pending-deployment.slice';

export const pendingDeploymentService = injectable({
  importFn: (slice) =>
    import('@pivot/client/pending-deployment').then((mod) =>
      mod.service(slice.api),
    ),
  dependencies: [pendingDeploymentSlice],
});
