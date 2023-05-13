import { DeploymentFeature } from '@pivot/client/deployment-features';
import { DeploymentVariable } from '@pivot/client/deployment-variables';
import { Deployment } from '@pivot/client/deployments';
import { Draft } from '@pivot/util/model';

export interface State {
  deployment: Draft<Deployment> | null;
  features: Draft<DeploymentFeature>[];
  featuresStatus: 'idle' | 'loading' | 'success' | 'error';
  variables: Draft<DeploymentVariable>[];
  variablesStatus: 'idle' | 'loading' | 'success' | 'error';
}
