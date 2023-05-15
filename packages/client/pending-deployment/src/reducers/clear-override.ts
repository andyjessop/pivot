import { State } from '../types';

export function clearOverride(state: State, variable_id: string): State {
  if (!state.deployment) {
    throw new Error('Cannot clear variable override without a deployment');
  }

  const existingVariableIndex = state.variables.findIndex(
    (variable) => variable.variable_id === variable_id,
  );

  if (existingVariableIndex !== -1) {
    const updatedVariables = [...state.variables];
    updatedVariables.splice(existingVariableIndex, 1);

    return {
      ...state,
      variables: updatedVariables,
    };
  }

  return state;
}
