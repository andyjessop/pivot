import { Route } from '@pivot/client/router';

import type { NavItem } from '../types';

export function navItems(route: Route | null): NavItem[] {
  return [
    {
      route: 'projects',
      text: 'Projects',
      active: route?.name
        ? ['project', 'projects'].includes(route?.name)
        : false,
    },
  ];
}
