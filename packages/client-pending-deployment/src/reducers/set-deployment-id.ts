import { State } from '../types';

export function setDeploymentId(state: State, deploymentId: string | null) {
  return { ...state, deploymentId };
}
