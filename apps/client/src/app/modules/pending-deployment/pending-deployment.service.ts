import { injectable } from '@pivot/lib/injectable';

import { pendingDeploymentSlice } from './pending-deployment.slice';

export const pendingDeploymentService = injectable({
  importFn: (slice) => Promise.resolve(slice.api),
  dependencies: [pendingDeploymentSlice],
});
