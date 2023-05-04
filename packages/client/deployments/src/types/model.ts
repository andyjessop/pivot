export interface Deployment {
  created_at: string;
  environment_id: string;
  features: DeploymentFeature[];
  project_id: string;
  release_id: string;
  url: string;
  uuid: string;
  variables: DeploymentVariable[];
}

export interface DeploymentFeature {
  created_at: string;
  deployment_id: string;
  enabled: boolean;
  feature_id: string;
  uuid: string;
  value: number;
}

export type DeploymentFeatureWithName = DeploymentFeature & {
  name: string;
};

export interface DeploymentVariable {
  created_at: string;
  deployment_id: string;
  uuid: string;
  value: string;
  variable_id: string;
}

export type DeploymentVariableWithName = DeploymentVariable & {
  name: string;
};

export const isDeployment = (deployment: any): deployment is Deployment => {
  return (
    typeof deployment === 'object' &&
    deployment !== null &&
    typeof deployment.created_at === 'string' &&
    typeof deployment.environment_id === 'string' &&
    Array.isArray(deployment.features) &&
    typeof deployment.project_id === 'string' &&
    typeof deployment.release_id === 'string' &&
    typeof deployment.url === 'string' &&
    typeof deployment.uuid === 'string' &&
    Array.isArray(deployment.variables)
  );
};
