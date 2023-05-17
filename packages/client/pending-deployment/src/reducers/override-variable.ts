import { DraftVariableOverride } from '@pivot/client/variable-overrides';

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

  const existingVariableIndex = state.variableOverrides.findIndex(
    (variable) => variable.variable_id === variable_id,
  );

  if (existingVariableIndex !== -1) {
    const updatedVariable: DraftVariableOverride = {
      ...state.variableOverrides[existingVariableIndex],
      value,
    };

    const updatedVariableOverrides = [...state.variableOverrides];
    updatedVariableOverrides[existingVariableIndex] = updatedVariable;

    return {
      ...state,
      variableOverrides: updatedVariableOverrides,
    };
  }

  const newVariable: DraftVariableOverride = {
    value,
    variable_id,
  };

  return {
    ...state,
    variableOverrides: [...state.variableOverrides, newVariable],
  };
}
