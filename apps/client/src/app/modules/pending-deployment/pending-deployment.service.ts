import { injectable } from '@pivot/lib/injectable';

import { deploymentsResourceService } from '../deployments';

import { pendingDeploymentSlice } from './pending-deployment.slice';

export const pendingDeploymentService = injectable({
  dependencies: [pendingDeploymentSlice, deploymentsResourceService],
  importFn: (slice, deploymentsResource) =>
    import('@pivot/client/pending-deployment').then((m) =>
      m.service(slice.api, deploymentsResource),
    ),
});
