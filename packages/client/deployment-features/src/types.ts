import { Draft } from '@pivot/util/model';

export interface DeploymentFeature {
  created_at: string;
  deployment_id: string;
  enabled: boolean;
  feature_id: string;
  uuid: string;
  value: number;
}

export type DeploymentFeatureWithName = DeploymentFeature & {
  name: string;
};

export const isDeploymentFeature = (obj: any): obj is DeploymentFeature => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.created_at === 'string' &&
    typeof obj.deployment_id === 'string' &&
    typeof obj.enabled === 'boolean' &&
    typeof obj.feature_id === 'string' &&
    typeof obj.uuid === 'string' &&
    typeof obj.value === 'number'
  );
};

export const isDraftDeploymentFeature = (obj: any): obj is Draft<DeploymentFeature> => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.deployment_id === 'string' &&
    typeof obj.enabled === 'boolean' &&
    typeof obj.feature_id === 'string' &&
    typeof obj.value === 'number'
  );
};
