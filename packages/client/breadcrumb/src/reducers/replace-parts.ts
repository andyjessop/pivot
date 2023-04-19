import { Part, State } from '../types';

/**
 * Replace all state parts.
 */
export function replaceParts(state: State, parts: Part[]) {
  return {
    ...state,
    parts,
  };
}
