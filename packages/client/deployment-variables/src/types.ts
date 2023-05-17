import { Draft } from '@pivot/util/model';

export interface DeploymentVariable {
  created_at: string;
  deployment_id: string;
  name: string;
  uuid: string;
  value: string;
}

export type DeploymentVariableWithName = DeploymentVariable & {
  name: string;
};

export type DraftDeploymentVariable = Omit<Draft<DeploymentVariable>, 'deployment_id'>;
export type DraftDeploymentVariableWithName = Omit<
  Draft<DeploymentVariableWithName>,
  'deployment_id'
>;

export const isDeploymentVariable = (obj: any): obj is DeploymentVariable => {
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

export const isDraftDeploymentVariable = (obj: any): obj is Draft<DeploymentVariable> => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.deployment_id === 'string' &&
    typeof obj.value === 'number' &&
    typeof obj.variable_id === 'string'
  );
};
