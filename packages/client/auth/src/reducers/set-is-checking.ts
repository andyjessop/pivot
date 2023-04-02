import { State } from '../types';

export function setIsChecking(state: State, isChecking: boolean) {
  return { ...state, isChecking };
}
