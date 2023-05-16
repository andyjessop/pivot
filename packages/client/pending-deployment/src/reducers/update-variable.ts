import { State } from '../types';

export function updateVariable(state: State, variable_id: string, value: string): State {
  const variables = [...(state.variables ?? [])];

  const ndx = variables.findIndex((variable) => variable.variable_id === variable_id);

  if (ndx === -1) {
    return state;
  }

  return {
    ...state,
    variables: [
      ...variables.slice(0, ndx),
      {
        ...variables[ndx],
        value,
      },
      ...variables.slice(ndx + 1),
    ],
  };
}
