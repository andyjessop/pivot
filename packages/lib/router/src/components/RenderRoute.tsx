import { ReactElement } from 'react';

import { Routes } from '../utils/types';

/**
 * Render the component tree for a given route.
 */
export function RenderRoute(routeKey: string, routes: Routes): ReactElement | null {
  const routeChain = findRouteChain(routeKey, routes);

  if (routeChain.length === 0) {
    return null;
  }

  return routeChain.reduceRight((children, currentKey) => {
    const Component = routes[currentKey].component;

    return <Component>{children}</Component>;
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
