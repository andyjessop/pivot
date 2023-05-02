import { RouterConfig, RouterState } from '../types';

export function routeSearch<T extends RouterConfig>(route?: RouterState<T>['route']) {
  return route?.search;
}
