import { RouterConfig, RouterState } from '../types';

export function routeName<T extends RouterConfig>(route?: RouterState<T>['route']) {
  return route?.name;
}
