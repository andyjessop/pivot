import { PendingDeployment, State } from '../types';

export function set(state: State, pendingDeployment: PendingDeployment | null) {
  return { ...state, data: pendingDeployment };
}
