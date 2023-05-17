import { Draft } from '@pivot/util/model';

export interface VariableOverride {
  created_at: string;
  deployment_id: string;
  uuid: string;
  value: string;
  variable_id: string;
}

export type VariableOverrideWithName = VariableOverride & {
  name: string;
};

export type DraftVariableOverride = Omit<Draft<VariableOverride>, 'deployment_id'>;
export type DraftVariableOverrideWithName = Omit<Draft<VariableOverrideWithName>, 'deployment_id'>;

export const isVariableOverride = (obj: any): obj is VariableOverride => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.created_at === 'string' &&
    typeof obj.deployment_id === 'string' &&
    typeof obj.uuid === 'string' &&
    typeof obj.value === 'string' &&
    typeof obj.variable_id === 'string'
  );
};

export const isDraftVariableOverride = (obj: any): obj is Draft<VariableOverride> => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.deployment_id === 'string' &&
    typeof obj.value === 'string' &&
    typeof obj.variable_id === 'string'
  );
};
