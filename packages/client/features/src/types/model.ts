export interface Feature {
  created_at: string;
  name: string;
  project_id: string;
  uuid: string;
}

export type FeatureWithValue = Feature & {
  enabled: boolean;
  value: string;
};
