import type { FullRoute, Route, RouterConfig } from './types';
import { getRouteFromUrl } from './utils/get-route-from-url';
import { getUrlFromRoute } from './utils/get-url-from-route';

export function service<T extends RouterConfig>(
  initial: T,
  api: { navigateSuccess: (route: FullRoute) => void },
) {
  const config = { notFound: '/404', ...initial };

  addEventListener('popstate', onPopstate);

  navigate(getRouteFromUrl(config, window.location.href));

  return {
    destroy,
    link,
    navigate,
  };

  function destroy() {
    removeEventListener('popstate', onPopstate);
  }

  function link(route: Route<T>) {
    return function withEvent(event: any) {
      event.preventDefault();

      navigate(route);
    };
  }

  function navigate(route: Route<T> | null): void {
    if (!route) {
      return navigate({ name: 'notFound' });
    }

    const { hash, name, search, params } = route;

    const url = getUrlFromRoute(config, name, params, search, hash);

    window.history.pushState({}, '', url);

    api.navigateSuccess({
      hash: hash ?? '',
      name,
      params: params ?? {},
      search: search ?? {},
    });
  }

  function onPopstate() {
    const route = getRouteFromUrl(config, window.location.href);

    if (!route) {
      api.navigateSuccess({
        name: 'notFound',
        params: {},
        search: {},
        hash: '',
      });

      return;
    }

    api.navigateSuccess(route);
  }
}
