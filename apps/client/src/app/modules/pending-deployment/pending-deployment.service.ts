import { injectable } from '@pivot/lib/injectable';

import { activityService } from '../activity';
import { deploymentFeaturesHttpService } from '../deployment-features';
import { deploymentVariablesHttpService } from '../deployment-variables';
import { deploymentsHttpService } from '../deployments';
import { environmentsResourceService } from '../environments';
import { variableOverridesHttpService } from '../variable-overrides';

import { pendingDeploymentSlice } from './pending-deployment.slice';

export const pendingDeploymentService = injectable({
  dependencies: [
    pendingDeploymentSlice,
    deploymentsHttpService,
    deploymentVariablesHttpService,
    deploymentFeaturesHttpService,
    variableOverridesHttpService,
    environmentsResourceService,
    activityService,
  ],
  importFn: (
    slice,
    deploymentsHttp,
    deploymentVariablesHttp,
    deploymentFeaturesHttp,
    variableOverridesHttp,
    environments,
    activity,
  ) =>
    import('@pivot/client/pending-deployment').then((m) =>
      m.service(
        slice.api,
        deploymentsHttp,
        deploymentVariablesHttp,
        deploymentFeaturesHttp,
        variableOverridesHttp,
        environments,
        activity,
      ),
    ),
});
