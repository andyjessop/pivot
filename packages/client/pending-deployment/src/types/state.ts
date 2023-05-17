import { DraftDeploymentFeature } from '@pivot/client/deployment-features';
import { Deployment } from '@pivot/client/deployments';
import { DraftVariableOverride } from '@pivot/client/variable-overrides';
import { Draft } from '@pivot/util/model';

import { NewVariable } from './model';

export interface State {
  deployment: Draft<Deployment> | null;
  deploymentVariablesStatus: 'idle' | 'loading' | 'success' | 'error';
  features: DraftDeploymentFeature[];
  featuresStatus: 'idle' | 'loading' | 'success' | 'error';
  newVariables: NewVariable[];
  variableOverrides: DraftVariableOverride[];
  variableOverridesStatus: 'idle' | 'loading' | 'success' | 'error';
}
