import { Deployment, DeploymentsResource } from '@pivot/client/deployments';
import { pick } from '@pivot/util/object';

import { Actions, Model } from './types';

export function service(pendingDeploymentState: Actions, deploymentsResource: DeploymentsResource) {
  return {
    cloneDeployment,
    deploy,
    ...pendingDeploymentState,
  };

  /**
   * Creates a pendingDeployment from a deployment.
   */
  function cloneDeployment(deployment: Deployment) {
    const stripped = pick(deployment, [
      'environment_id',
      'features',
      'project_id',
      'release_id',
      'url',
      'variables',
    ]);

    pendingDeploymentState.set(stripped);
  }

  function deploy(deployment: Model) {
    deploymentsResource.create(deployment);
    pendingDeploymentState.set(null);
  }
}
