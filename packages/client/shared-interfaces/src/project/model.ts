export interface Model {
  created_at: string;
  deployments: Deployment[];
  environments: Environment[];
  features: Feature[];
  name: string;
  releases: Release[];
  team_id: string;
  uuid: string;
  variables: Variable[];
}

export interface Deployment {
  created_at: string;
  environment: Pick<Environment, 'name'>;
  environment_id: string;
  features: DeploymentFeature[];
  latest?: boolean;
  project_id: string;
  release_id: string;
  url: string;
  uuid: string;
  variables: DeploymentVariable[];
}

export interface Environment {
  created_at: string;
  features: EnvironmentFeature[];
  name: string;
  project_id: string;
  url: string | null;
  uuid: string;
  variables: EnvironmentVariable[];
}

export interface Release {
  commit_message: string;
  commit_url: string;
  created_at: string;
  hash: string;
  html_filename: string;
  meta: Record<string, any>;
  project_id: string;
  service_worker_filename: string;
  service_worker_url: string;
  uuid: string;
}

export interface Feature {
  created_at: string;
  name: string;
  project_id: string;
  uuid: string;
  values: {
    environment: string;
    value: number;
  }[];
}

export interface Variable {
  created_at: string;
  name: string;
  project_id: string;
  uuid: string;
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
  uuid: string;
  value: string;
  variable_id: string;
};

export type DeploymentVariable = JoinVariable & { deployment_id: string };
export type EnvironmentVariable = JoinVariable & { environment_id: string };
