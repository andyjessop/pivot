import { DraftDeploymentFeature } from '@pivot/client/deployment-features';
import { DraftDeploymentVariable } from '@pivot/client/deployment-variables';
import { Deployment } from '@pivot/client/deployments';
import { Draft } from '@pivot/util/model';

import { NewVariable } from './model';

export interface State {
  deployment: Draft<Deployment> | null;
  features: DraftDeploymentFeature[];
  featuresStatus: 'idle' | 'loading' | 'success' | 'error';
  newVariables: NewVariable[];
  variables: DraftDeploymentVariable[];
  variablesStatus: 'idle' | 'loading' | 'success' | 'error';
}
