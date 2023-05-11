import { injectable } from '@pivot/lib/injectable';

import { deploymentFeaturesHttpService } from '../deployment-features';
import { deploymentVariablesHttpService } from '../deployment-variables';
import { deploymentsResourceService } from '../deployments';

import { pendingDeploymentSlice } from './pending-deployment.slice';

export const pendingDeploymentService = injectable({
  dependencies: [
    pendingDeploymentSlice,
    deploymentsResourceService,
    deploymentFeaturesHttpService,
    deploymentVariablesHttpService,
  ],
  importFn: (slice, deploymentsResource, deploymentFeaturesHttp, deploymentVariablesHttp) =>
    import('@pivot/client/pending-deployment').then((m) =>
      m.service(slice.api, deploymentsResource, deploymentFeaturesHttp, deploymentVariablesHttp),
    ),
});
