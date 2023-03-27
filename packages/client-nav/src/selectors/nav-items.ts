import { Route } from '@pivot/client-router';

import type { NavItem } from '../types';

export function navItems(route: Route): NavItem[] {
  return [
    {
      route: 'projects',
      text: 'Projects',
      active: ['project', 'projects'].includes(route?.name),
    },
  ];
}
