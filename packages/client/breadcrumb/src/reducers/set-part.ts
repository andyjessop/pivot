import { RouterConfig } from '@pivot/lib/router';

import { Part, State } from '../types';
/**
 * Sets a part in the state.
 */
export function setPart<T extends RouterConfig>(state: State<T>, key: string, text: string) {
  const parts = [...state.parts];

  addOrReplace(parts, key, text);

  return {
    ...state,
    parts,
  };
}

function addOrReplace<T extends RouterConfig>(parts: Part<T>[], key: string, text: string) {
  const index = parts.findIndex((item) => item.text === key);

  if (index !== -1) {
    parts[index] = {
      ...parts[index],
      text,
    };
  }
}
