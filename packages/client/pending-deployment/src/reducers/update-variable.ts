import { State } from '../types';

export function updateVariable(state: State, uuid: string, value: string) {
  if (!state.data) {
    return state;
  }

  const ndx = state.data.variables.findIndex((variable) => variable.uuid === uuid);

  if (ndx === -1) {
    return state;
  }

  return {
    ...state,
    data: {
      ...state.data,
      variables: [
        ...state.data.variables.slice(0, ndx),
        {
          ...state.data.variables[ndx],
          value,
        },
        ...state.data.variables.slice(ndx + 1),
      ],
    },
  };
}
