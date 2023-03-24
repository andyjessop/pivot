import { Route, RouterConfig, RouterState } from '../types';

export function navigateSuccess<T extends RouterConfig>(
  state: RouterState,
  route: Route<T>
) {
  return {
    ...state,
    route,
  };
}
