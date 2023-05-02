import type {
  Link as RouterLink,
  Route as RouterRoute,
  RouterState as RouterRouterState,
} from '@pivot/lib/router';

import { routes } from '~routes';

export type Routes = typeof routes;

export type Link = RouterLink<Routes>;

export type RouteName = keyof Routes;

export type Route = RouterRoute<Routes>;

export type RouterState = RouterRouterState<Routes>;
