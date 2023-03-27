import { State } from '../types';

export function setVariable(state: State, variableId: string, value: string) {
  const variableNdx = state.variables.findIndex(
    (v) => v.variable_id === variableId,
  );

  if (variableNdx === -1) {
    return {
      ...state,
      variables: [...state.variables, { variable_id: variableId, value }],
    };
  }

  return {
    ...state,
    variables: [
      ...state.variables.slice(0, variableNdx),
      { variable_id: variableId, value },
      ...state.variables.slice(variableNdx + 1),
    ],
  };
}
