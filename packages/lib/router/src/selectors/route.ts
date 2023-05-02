import { RouterConfig, RouterState } from '../types';

export function route<T extends RouterConfig>(router?: RouterState<T>) {
  return router?.route;
}
