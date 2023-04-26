import {
  DeploymentFeature,
  DeploymentVariable,
} from '@pivot/client/deployments';

export interface State {
  data: PendingDeployment | null;
}

export interface PendingDeployment {
  deployment_id: string;
  environment_id: string;
  features: DeploymentFeature[];
  release_id: string;
  url?: string;
  variables: DeploymentVariable[];
}
