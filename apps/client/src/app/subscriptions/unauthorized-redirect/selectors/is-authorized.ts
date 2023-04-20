const authenticatedRoutes = [
  'projects',
  'project',
  'projectDeployments',
  'projectEnvironments',
  'projectFeatures',
  'projectReleases',
  'projectVariables',
];

/**
 * Returns true if the user is unauthorized to view the route. In uncertain states, e.g. when
 * the user is waiting to be authenticated or logging out, this will return false.
 */
export function isUnauthorized(
  isAuthenitcated: boolean,
  isAwaitingAuthentication: boolean,
  isLoggingOut: boolean,
  routeName?: string,
) {
  if (!routeName || isAwaitingAuthentication || isLoggingOut) {
    return false;
  }

  const isAuthenticatedRoute = authenticatedRoutes.includes(routeName);

  if (!isAuthenticatedRoute) {
    return false;
  }

  if (isAuthenticatedRoute && isAuthenitcated) {
    return false;
  }

  return true;
}
