import { State } from '../types';

export function removeNewVariable(state: State, id: string): State {
  return {
    ...state,
    newVariables: state.newVariables.filter((variable) => variable.id !== id),
  };
}
