import { DraftDeploymentVariable } from '@pivot/client/deployment-variables';

import { State } from '../types';

/**
 * The overrideVariable function takes in a state object, a variable id, and a new value,
 * and returns a new state object with the updated variable value or a new variable added
 * to the variables array.
 */
export function overrideVariable(state: State, variable_id: string, value: string): State {
  if (!state.deployment) {
    throw new Error('Cannot override variable without a deployment');
  }

  const existingVariableIndex = state.variables.findIndex(
    (variable) => variable.variable_id === variable_id,
  );

  if (existingVariableIndex !== -1) {
    const updatedVariable: DraftDeploymentVariable = {
      ...state.variables[existingVariableIndex],
      value,
    };

    const updatedVariables = [...state.variables];
    updatedVariables[existingVariableIndex] = updatedVariable;

    return {
      ...state,
      variables: updatedVariables,
    };
  }

  const newVariable: DraftDeploymentVariable = {
    value,
    variable_id,
  };

  return {
    ...state,
    variables: [...state.variables, newVariable],
  };
}
