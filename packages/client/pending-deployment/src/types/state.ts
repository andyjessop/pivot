import { DraftDeploymentFeature } from '@pivot/client/deployment-features';
import { DraftDeploymentVariable } from '@pivot/client/deployment-variables';
import { Deployment } from '@pivot/client/deployments';
import { Draft } from '@pivot/util/model';

export interface State {
  deployment: Draft<Deployment> | null;
  features: DraftDeploymentFeature[];
  featuresStatus: 'idle' | 'loading' | 'success' | 'error';
  variables: DraftDeploymentVariable[];
  variablesStatus: 'idle' | 'loading' | 'success' | 'error';
}
