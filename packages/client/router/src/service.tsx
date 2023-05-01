import type { FullRoute, Route, RouterConfig } from './types';
import { getRouteFromUrl } from './utils/get-route-from-url';
import { getUrlFromRoute } from './utils/get-url-from-route';

export function service<T extends RouterConfig>(
  initial: T,
  api: { navigateSuccess: (route: FullRoute) => void },
) {
  const config = { notFound: { path: '/404' }, ...initial };

  addEventListener('popstate', onPopstate);

  navigate(getRouteFromUrl(config, window.location.href));

  return {
    Link,
    destroy,
    link,
    navigate,
  };

  function destroy() {
    removeEventListener('popstate', onPopstate);
  }

  function link(route: Route<T>) {
    return function withEvent(event: any) {
      const modifierPressed = ['Alt', 'Control', 'Meta', 'Shift'].some((key) => {
        if (event.getModifierState(key)) {
          return true;
        }
      });

      // Avoid breaking native browser behavior
      if (modifierPressed) {
        return;
      }

      event.preventDefault();

      navigate(route);
    };
  }

  function Link({
    children,
    className = '',
    to,
  }: {
    children: React.ReactNode;
    className?: string;
    to: Route;
  }) {
    return (
      <a className={className} href="" onClick={link(to)}>
        {children}
      </a>
    );
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
        hash: '',
        name: 'notFound',
        params: {},
        search: {},
      });

      return;
    }

    api.navigateSuccess(route);
  }
}
