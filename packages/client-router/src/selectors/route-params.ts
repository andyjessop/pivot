import { RouterState } from '../types';

export function routeParams(route?: RouterState['route']) {
  return route?.params;
}
