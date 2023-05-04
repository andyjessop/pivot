import { Model, State } from '../types';

export function set(state: State, pendingDeployment: Model | null) {
  return { ...state, data: pendingDeployment };
}
