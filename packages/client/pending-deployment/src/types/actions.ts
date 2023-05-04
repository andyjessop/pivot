import { DeploymentFeature } from '@pivot/client/deployments';

import { Model } from './model';

export interface Actions {
  set(deployment: Model | null): void;
  update(deployment: Partial<Model>): void;
  updateFeature(uuid: string, feature: Partial<DeploymentFeature>): void;
  updateVariable(uuid: string, value: string): void;
}
