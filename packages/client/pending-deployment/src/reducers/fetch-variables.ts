import { State } from '../types';

export function fetchVariables(state: State): State {
  return {
    ...state,
    variablesStatus: 'loading',
  };
}
