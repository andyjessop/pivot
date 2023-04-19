export interface Environment {
  uuid: string;
  created_at: string;
  name: string;
  project_id: string;
  url: string | null;
  clone_of: string | null;
  features: EnvironmentFeature[];
  variables: EnvironmentVariable[];
}

interface EnvironmentFeature {
  created_at: string;
  uuid: string;
  environment_id: string;
  feature_id: string;
  value: number;
}

interface EnvironmentVariable {
  created_at: string;
  uuid: string;
  environment_id: string;
  variable_id: string;
  value: string;
}
