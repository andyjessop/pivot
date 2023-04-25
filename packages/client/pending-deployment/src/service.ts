import { Actions, PendingDeployment, Service } from './types';

export function service(actions: Actions): Service {
  return {
    clear,
    create,
    update,
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
}
