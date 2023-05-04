import { Model, State } from '../types';

export function update(state: State, deployment: Partial<Model>) {
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
