import { Actions, Service } from './types';

export function service(actions: Actions): Service {
  return {
    clearPendingDeployment,
    createFromDeployment,
  };

  function clearPendingDeployment() {
    actions.setDeploymentId(null);
  }

  function createFromDeployment(deploymentId: string) {
    actions.setDeploymentId(deploymentId);
  }
}
