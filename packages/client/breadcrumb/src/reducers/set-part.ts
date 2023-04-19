import { Part, State } from '../types';
/**
 * Sets a part in the state.
 */
export function setPart(state: State, key: string, text: string) {
  const parts = [...state.parts];

  addOrReplace(parts, key, text);

  return {
    ...state,
    parts,
  };
}

function addOrReplace(parts: Part[], key: string, text: string) {
  const index = parts.findIndex((item) => item.text === key);

  if (index !== -1) {
    parts[index] = {
      ...parts[index],
      text,
    };
  }
}
