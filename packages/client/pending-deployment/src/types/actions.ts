import { DeploymentFeature } from '@pivot/client/deployments';

import { PendingDeployment } from './state';

export interface Actions {
  set(deployment: PendingDeployment | null): void;
  update(deployment: Partial<PendingDeployment>): void;
  updateFeature(uuid: string, feature: Partial<DeploymentFeature>): void;
  updateVariable(uuid: string, value: string): void;
}
