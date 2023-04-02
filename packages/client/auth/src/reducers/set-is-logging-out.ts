import { State } from '../types';

export function setIsLoggingOut(state: State, isLoggingOut: boolean) {
  return { ...state, isLoggingOut };
}
