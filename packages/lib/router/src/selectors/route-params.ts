import { RouterConfig, RouterState } from '../types';

export function routeParams<T extends RouterConfig>(route?: RouterState<T>['route']) {
  return route?.params;
}
