import { State } from '../types';

export function clearDrafts(state: State): State {
  return { ...state, deployment: null, features: [], variables: [] };
}
