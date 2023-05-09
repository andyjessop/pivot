import { Deployment } from '@pivot/client/deployments';
import { Draft } from '@pivot/util/model';

export type VariablesList = {
  created_at: string;
  name: string;
  uuid: string;
  value: string;
  variableType: string;
  variable_id: string;
}[];

export function isPendingDeployment(deployment: any): deployment is Draft<Deployment> {
  return (
    typeof deployment === 'object' &&
    deployment !== null &&
    typeof deployment.environment_id === 'string' &&
    Array.isArray(deployment.features) &&
    typeof deployment.project_id === 'string' &&
    typeof deployment.release_id === 'string' &&
    Array.isArray(deployment.variables)
  );
}
