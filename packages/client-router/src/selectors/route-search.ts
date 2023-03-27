import { RouterState } from '../types';

export function routeSearch(route?: RouterState['route']) {
  return route?.search;
}
