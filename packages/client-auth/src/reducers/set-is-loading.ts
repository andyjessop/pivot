import { State } from '../types';

export function setIsLoading(state: State, isLoading: boolean) {
  return { ...state, isLoading };
}
