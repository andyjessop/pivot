import { NavItem } from '@pivot/client/nav';
import type { Route, RouterConfig } from '@pivot/lib/router';

export function navItems<T extends RouterConfig>(route?: Route<T> | null): NavItem<T>[] {
  const routeName = route?.name ?? '';

  return [
    {
      active: ['project', 'projects'].includes(routeName),
      route: 'projects',
      text: 'Projects',
    },
  ];
}
