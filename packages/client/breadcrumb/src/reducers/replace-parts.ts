import { RouterConfig } from '@pivot/lib/router';

import { Part, State } from '../types';

/**
 * Replace all state parts.
 */
export function replaceParts<T extends RouterConfig>(state: State<T>, parts: Part<T>[]) {
  return {
    ...state,
    parts,
  };
}
