import { Route, RouterConfig, RouterState } from '../types';

export function navigateSuccess<T extends RouterConfig>(state: RouterState<T>, route: Route<T>) {
  return {
    ...state,
    route,
  };
}
