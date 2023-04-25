import { PendingDeployment, State } from '../types';

export function update(state: State, deployment: Partial<PendingDeployment>) {
  if (state.data === null) {
    throw new Error('Cannot update pending deployment when one already exists');
  }

  return {
    ...state,
    data: {
      ...state.data,
      ...deployment,
    },
  };
}
