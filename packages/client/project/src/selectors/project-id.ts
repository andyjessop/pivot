import { Route, RouterConfig } from '@pivot/lib/router';

export function projectId<T extends RouterConfig>(
  isProjectRoute: boolean,
  params: Route<T>['params'],
) {
  return isProjectRoute ? (params as { id: string }).id : undefined;
}
