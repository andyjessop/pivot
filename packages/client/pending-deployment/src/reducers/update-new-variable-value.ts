import { State } from '../types';

export function updateNewVariableValue(state: State, id: string, value: string): State {
  const newVariables = state.newVariables.map((variable) => {
    if (variable.id === id) {
      return {
        ...variable,
        value,
      };
    }
    return variable;
  });

  return {
    ...state,
    newVariables,
  };
}
