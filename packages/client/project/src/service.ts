import { Service as PendingDeploymentService } from '@pivot/client/pending-deployment';

import { Actions, Service } from './types';

export function service(
  actions: Actions,
  pendingDeployment: PendingDeploymentService,
): Service {
  return {
    ...actions,
    cloneDeployment,
  };

  function cloneDeployment(deploymentId: string) {
    pendingDeployment.createFromDeployment(deploymentId);
  }
}
