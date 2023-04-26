import { DeploymentFeature } from '@pivot/client/deployments';

import { Actions, PendingDeployment, Service } from './types';

export function service(actions: Actions): Service {
  return {
    clear,
    create,
    update,
    updateFeature,
    updateVariable,
  };

  function clear() {
    actions.set(null);
  }

  function create(deployment: PendingDeployment) {
    actions.set(deployment);
  }

  function update(deployment: Partial<PendingDeployment>) {
    actions.update(deployment);
  }

  function updateFeature(uuid: string, feature: Partial<DeploymentFeature>) {
    actions.updateFeature(uuid, feature);
  }

  function updateVariable(uuid: string, value: string) {
    actions.updateVariable(uuid, value);
  }
}
