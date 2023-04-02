import { RouterState } from '../types';

export function routeHash(route?: RouterState['route']) {
  return route?.hash;
}
