import { RouterConfig } from '@pivot/lib/router';
import { capitalize } from '@pivot/util/string';

import { Part } from '../types';

/**
 * Ensures that we don't display any parts that have not yet been substituted.
 */
export function parts<T extends RouterConfig>(parts: Part<T>[]) {
  if (parts.some((part) => part.text?.includes(':'))) {
    return [];
  }

  return parts
    .filter((part) => part.text !== undefined)
    .map((part) => ({
      ...part,
      text: capitalize(part.text),
    }));
}
