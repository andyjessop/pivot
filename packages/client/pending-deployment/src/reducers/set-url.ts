import { State } from '../types';

export function setUrl(state: State, url: string) {
  return { ...state, url };
}
