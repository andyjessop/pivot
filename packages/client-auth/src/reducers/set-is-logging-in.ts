import { State } from '../types';

export function setIsLoggingIn(state: State, isLoggingIn: boolean) {
  return { ...state, isLoggingIn };
}
