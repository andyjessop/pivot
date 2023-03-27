export interface State {
  deploymentId: string | null;
  environmentId: string | null;
  features: { feature_id: string; value: number }[];
  releaseId: string | null;
  url?: string;
  variables: { variable_id: string; value: string }[];
}
