import { State } from '../types';

export function addNewVariable(state: State): State {
  return {
    ...state,
    newVariables: [
      {
        id: new Date().getTime().toString(),
        name: '',
        value: '',
      },
      ...state.newVariables,
    ],
  };
}
