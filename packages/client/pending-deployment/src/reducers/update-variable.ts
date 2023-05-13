import { DeploymentVariable } from '@pivot/client/deployment-variables';
import { Draft } from '@pivot/util/model';

import { State } from '../types';

export function updateVariable(
  state: State,
  variable_id: string,
  deploymentVariable: Partial<Draft<DeploymentVariable>>,
): State {
  const variables = [...(state.variables ?? [])];

  const ndx = variables.findIndex((variable) => variable.variable_id === variable_id);

  if (ndx === -1) {
    return state;
  }

  return {
    ...state,
    variables: [
      ...variables.slice(0, ndx),
      {
        ...variables[ndx],
        ...deploymentVariable,
      },
      ...variables.slice(ndx + 1),
    ],
  };
}
