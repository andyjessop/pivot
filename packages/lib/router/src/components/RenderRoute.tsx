import { ReactElement } from 'react';

import { Routes } from '../utils/types';

/**
 * Render the component tree for a given route. This passes the `Outlet` prop to each component
 * so that it can render its child routes.
 */
export function RenderRoute(routeKey: string, routes: Routes): ReactElement | null {
  const routeChain = findRouteChain(routeKey, routes);

  if (routeChain.length === 0) {
    return null;
  }

  return routeChain.reduceRight((outlet, currentKey) => {
    const Component = routes[currentKey].component;

    return <Component Outlet={outlet} />;
  }, null as ReactElement | null);
}

function findRouteChain(routeKey: string, routes: Routes): string[] {
  const chain: string[] = [];
  let currentKey: string | undefined = routeKey;

  while (currentKey) {
    chain.unshift(currentKey);
    currentKey = routes[currentKey].parent;
  }

  return chain;
}
