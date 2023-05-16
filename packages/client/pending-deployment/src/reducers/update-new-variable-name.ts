import { State } from '../types';

export function updateNewVariableName(state: State, id: string, name: string): State {
  const newVariables = state.newVariables.map((variable) => {
    if (variable.id === id) {
      return {
        ...variable,
        name,
      };
    }
    return variable;
  });

  return {
    ...state,
    newVariables,
  };
}
