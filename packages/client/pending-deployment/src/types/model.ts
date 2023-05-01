import { Project } from '@pivot/client/shared-interfaces';

export interface Model {
  environmentId: string;
  environments: Project.Environment[];
  features: {
    created_at: string;
    environment_id: string;
    feature_id: string;
    fromEnvironment: boolean;
    name: string;
    uuid: string;
    value: number;
  }[];
  release: Project.Release;
  url?: string;
  variables: { name: string; value: string; variable_id: string }[];
}

export type VariablesList = {
  created_at: string;
  name: string;
  uuid: string;
  value: string;
  variableType: string;
  variable_id: string;
}[];
