import type { Route } from '@pivot/client/router';

import type { NavItem } from './types';

export function navItems(route: Route | null): NavItem[] {
  const routeName = route?.name ?? '';

  return [
    {
      route: 'projects',
      text: 'Projects',
      active: ['project', 'projects'].includes(routeName),
    },
  ];
}
