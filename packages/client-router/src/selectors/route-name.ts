import { RouterState } from '../types';

export function routeName(route?: RouterState['route']) {
  return route?.name;
}
