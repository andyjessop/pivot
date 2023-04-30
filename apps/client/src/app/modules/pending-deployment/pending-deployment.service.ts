import { injectable } from '@pivot/lib/injectable';

import { deploymentsResourceService } from '../deployments';
import { environmentsResourceService } from '../environments';

import { pendingDeploymentSlice } from './pending-deployment.slice';

export const pendingDeploymentService = injectable({
  importFn: (slice, deployments, environments) =>
    import('@pivot/client/pending-deployment').then((m) =>
      m.service(slice.api, deployments.getData, environments.getData),
    ),
  dependencies: [
    pendingDeploymentSlice,
    deploymentsResourceService,
    environmentsResourceService,
  ],
});
