import { State } from '../types';

/**
 * Creates a pending deployment from a deployment. This takes features and variables from the existing
 * deployment.
 */
export function createFromDeployment(state: State, deploymentId: string) {
  return {
    ...state,
    clonedDeploymentId: deploymentId,
    deployedReleaseId: null,
  };
}
