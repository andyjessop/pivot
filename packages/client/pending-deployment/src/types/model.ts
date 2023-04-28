import { Project } from '@pivot/client/shared-interfaces';

export interface Model {
  release: Project.Release;
  environmentId: string;
  environments: Project.Environment[];
  url?: string;
  features: {
    fromEnvironment: boolean;
    name: string;
    created_at: string;
    feature_id: string;
    uuid: string;
    value: number;
    environment_id: string;
  }[];
  variables: { variable_id: string; name: string; value: string }[];
}

export type VariablesList = {
  variableType: string;
  name: string;
  created_at: string;
  uuid: string;
  variable_id: string;
  value: string;
}[];
