import type { Route, RouterConfig } from './types';
import { getRouteFromUrl } from './utils/get-route-from-url';
import { getUrlFromRoute } from './utils/get-url-from-route';

export function router<T extends RouterConfig>(
  config: T,
  api: { navigateSuccess: (route: Route) => void },
) {
  addEventListener('popstate', onPopstate);

  const route = getRouteFromUrl(config, window.location.href);

  if (route) {
    navigate(route);
  }

  return {
    destroy,
    link,
    navigate,
  };

  function destroy() {
    removeEventListener('popstate', onPopstate);
  }

  function link(route: Route<T>) {
    return function withEvent(event: Event) {
      event.preventDefault();

      navigate(route);
    };
  }

  function navigate({ hash, name, search, params }: Route<T>) {
    const url = getUrlFromRoute(config, name, params, search, hash);

    window.history.pushState({}, '', url);

    api.navigateSuccess({
      hash,
      name,
      params,
      search,
    });
  }

  function onPopstate() {
    const route = getRouteFromUrl(config, window.location.href);

    if (!route) {
      return;
    }

    api.navigateSuccess(route);
  }
}
