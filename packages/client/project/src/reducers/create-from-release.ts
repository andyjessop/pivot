import { State } from '../types';

/**
 * Creates a pending deployment from a release. This takes features and variables from the environment
 * by default.
 */
export function createFromRelease(state: State, releaseId: string) {
  return { ...state, clonedDeploymentId: null, deployedReleaseId: releaseId };
}
