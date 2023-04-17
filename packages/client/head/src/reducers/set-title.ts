import { State } from '../types';

export function setTitle(state: State, title: string) {
  return { ...state, title };
}
