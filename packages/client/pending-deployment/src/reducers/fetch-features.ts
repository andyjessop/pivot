import { State } from '../types';

export function fetchFeatures(state: State): State {
  return {
    ...state,
    featuresStatus: 'loading',
  };
}
