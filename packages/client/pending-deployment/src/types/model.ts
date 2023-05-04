import { Deployment } from '@pivot/client/deployments';

export type Model = Omit<Deployment, 'created_at' | 'uuid'>;

export type VariablesList = {
  created_at: string;
  name: string;
  uuid: string;
  value: string;
  variableType: string;
  variable_id: string;
}[];

export function isPendingDeployment(deployment: any): deployment is Model {
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
