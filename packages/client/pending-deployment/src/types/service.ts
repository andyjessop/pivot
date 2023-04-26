import { DeploymentFeature } from '@pivot/client/deployments';

import { PendingDeployment } from './state';

export interface Service {
  clear(): void;
  create(deployment: PendingDeployment): void;
  update(deployment: Partial<PendingDeployment>): void;
  updateFeature(uuid: string, feature: Partial<DeploymentFeature>): void;
  updateVariable(uuid: string, value: string): void;
}
