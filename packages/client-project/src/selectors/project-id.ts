import { Route } from '@pivot/client-router';

export function projectId(isProjectRoute: boolean, params: Route['params']) {
  return isProjectRoute ? params?.id : undefined;
}
