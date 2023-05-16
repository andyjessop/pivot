import { State } from '../types';

export function removeVariable(state: State, variable_id: string): State {
  return {
    ...state,
    variables: state.variables.filter((variable) => variable.variable_id !== variable_id),
  };
}
