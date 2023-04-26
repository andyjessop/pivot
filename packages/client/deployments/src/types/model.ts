export interface Deployment {
  created_at: string;
  uuid: string;
  release_id: string;
  environment_id: string;
  url: string;
  project_id: string;
  features: DeploymentFeature[];
  variables: DeploymentVariable[];
}

export interface DeploymentFeature {
  created_at: string;
  enabled: boolean;
  uuid: string;
  deployment_id: string;
  feature_id: string;
  value: number;
}

export type DeploymentFeatureWithName = DeploymentFeature & {
  name: string;
};

export interface DeploymentVariable {
  created_at: string;
  uuid: string;
  deployment_id: string;
  variable_id: string;
  value: string;
}

export type DeploymentVariableWithName = DeploymentVariable & {
  name: string;
};
