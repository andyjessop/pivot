export interface Environment {
  clone_of: string | null;
  color: string;
  created_at: string;
  features: EnvironmentFeature[];
  name: string;
  project_id: string;
  url: string | null;
  uuid: string;
  variables: EnvironmentVariable[];
}

interface EnvironmentFeature {
  created_at: string;
  environment_id: string;
  feature_id: string;
  uuid: string;
  value: number;
}

export interface EnvironmentVariable {
  created_at: string;
  environment_id: string;
  uuid: string;
  value: string;
  variable_id: string;
}
