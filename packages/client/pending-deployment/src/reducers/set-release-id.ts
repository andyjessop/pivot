import { State } from '../types';

export function setReleaseId(state: State, releaseId: string | null) {
  return { ...state, releaseId };
}
