import { State } from '../types';

/**
 * Set the current navigation item.
 */
export function setCurrentNavItem(state: State, item: string) {
  return { ...state, currentNavItem: item };
}
