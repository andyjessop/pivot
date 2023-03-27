import { State } from '../types';

export function setEnvironmentId(state: State, environmentId: string | null) {
  return { ...state, environmentId };
}
