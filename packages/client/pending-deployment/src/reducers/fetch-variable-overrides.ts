import { State } from '../types';

export function fetchVariableOverrides(state: State): State {
  return {
    ...state,
    variableOverridesStatus: 'loading',
  };
}
