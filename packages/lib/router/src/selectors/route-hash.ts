import { RouterConfig, RouterState } from '../types';

export function routeHash<T extends RouterConfig>(route?: RouterState<T>['route']) {
  return route?.hash;
}
