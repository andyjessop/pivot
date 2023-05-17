import { DeploymentVariable } from '@pivot/client/deployment-variables';

import { State } from '../types';

export function setNewVariables(state: State, deploymentVariables: DeploymentVariable[]): State {
  return {
    ...state,
    newVariables: [
      ...deploymentVariables.map((deploymentVariable) => ({
        id: deploymentVariable.uuid,
        name: deploymentVariable.name,
        value: deploymentVariable.value,
      })),
    ],
  };
}
