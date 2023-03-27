import { Actions } from './actions';

export interface Service extends Actions {
  cloneDeployment(deploymentId: string): void;
}
