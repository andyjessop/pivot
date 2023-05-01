import { Route } from '@pivot/client/router';

import type { NavItem } from '../types';

export function navItems(route?: Route | null): NavItem[] {
  return [
    {
      active: route?.name ? ['project', 'projects'].includes(route?.name) : false,
      route: 'projects',
      text: 'Projects',
    },
  ];
}
