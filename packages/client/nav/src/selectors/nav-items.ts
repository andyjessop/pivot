import { Route, RouterConfig } from '@pivot/lib/router';

import type { NavItem } from '../types';

export function navItems<T extends RouterConfig>(route?: Route<T> | null): NavItem<T>[] {
  return [
    {
      active: route?.name ? ['project', 'projects'].includes(route?.name) : false,
      route: 'projects',
      text: 'Projects',
    },
  ];
}
