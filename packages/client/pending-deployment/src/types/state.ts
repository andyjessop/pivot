export interface State {
  data: PendingDeployment | null;
}

export interface PendingDeployment {
  deployment_id: string;
  environment_id: string;
  features: { feature_id: string; value: number }[];
  release_id: string;
  url?: string;
  variables: { variable_id: string; value: string }[];
}
