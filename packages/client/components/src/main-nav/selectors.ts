import type { Route } from '@pivot/client/router';

import type { NavItem } from './types';

export function navItems(route?: Route | null): NavItem[] {
  const routeName = route?.name ?? '';

  return [
    {
      active: ['project', 'projects'].includes(routeName),
      route: 'projects',
      text: 'Projects',
    },
  ];
}
