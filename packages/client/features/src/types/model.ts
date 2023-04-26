export interface Feature {
  created_at: string;
  name: string;
  uuid: string;
  project_id: string;
}

export type FeatureWithValue = Feature & {
  enabled: boolean;
  value: string;
};
