export interface Model {
  created_at: string;
  name: string;
  uuid: string;
  team_id: string;
  deployments: Deployment[];
  environments: Environment[];
  features: Feature[];
  releases: Release[];
  variables: Variable[];
}

export interface Deployment {
  created_at: string;
  uuid: string;
  release_id: string;
  environment_id: string;
  url: string;
  project_id: string;
  features: DeploymentFeature[];
  variables: DeploymentVariable[];
  environment: Pick<Environment, 'name'>;
  latest?: boolean;
}

export interface Environment {
  created_at: string;
  name: string;
  uuid: string;
  project_id: string;
  url: string | null;
  features: EnvironmentFeature[];
  variables: EnvironmentVariable[];
}

export interface Release {
  created_at: string;
  uuid: string;
  project_id: string;
  hash: string;
  html_filename: string;
  meta: Record<string, any>;
  service_worker_filename: string;
  service_worker_url: string;
  commit_message: string;
  commit_url: string;
}

export interface Feature {
  created_at: string;
  name: string;
  uuid: string;
  project_id: string;
  values: {
    environment: string;
    value: number;
  }[];
}

export interface Variable {
  created_at: string;
  name: string;
  uuid: string;
  project_id: string;
  values: {
    environment: string;
    value: string;
  }[];
}

type JoinFeature = {
  created_at: string;
  feature_id: string;
  uuid: string;
  value: number;
};

export type DeploymentFeature = JoinFeature & { deployment_id: string };
export type EnvironmentFeature = JoinFeature & { environment_id: string };

type JoinVariable = {
  created_at: string;
  variable_id: string;
  uuid: string;
  value: string;
};

export type DeploymentVariable = JoinVariable & { deployment_id: string };
export type EnvironmentVariable = JoinVariable & { environment_id: string };
