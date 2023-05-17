import { State } from '../types';

export function clearOverride(state: State, variable_id: string): State {
  if (!state.deployment) {
    throw new Error('Cannot clear variable override without a deployment');
  }

  const existingVariableIndex = state.variableOverrides.findIndex(
    (variable) => variable.variable_id === variable_id,
  );

  if (existingVariableIndex !== -1) {
    const updatedVariables = [...state.variableOverrides];
    updatedVariables.splice(existingVariableIndex, 1);

    return {
      ...state,
      variableOverrides: updatedVariables,
    };
  }

  return state;
}
