import { DeploymentFeature } from '@pivot/client/deployment-features';
import { DeploymentVariable } from '@pivot/client/deployment-variables';
import { Deployment } from '@pivot/client/deployments';
import { Draft } from '@pivot/util/model';

import { State } from './state';

export interface Actions {
  clearDrafts(): void;
  getState(): State;
  setDeployment(deployment: Draft<Deployment> | null): void;
  setFeature(feature_id: string, feature: Partial<Draft<DeploymentFeature>>): void;
  setVariable(variable_id: string, variable: Partial<Draft<DeploymentVariable>>): void;
  updateDeployment(deployment: Partial<Draft<Deployment>>): void;
}
