const authenticatedRoutes = ['projects', 'project'];

export function isUnauthorized(
  isAuthenitcated: boolean,
  isWaiting: boolean,
  routeName?: string,
) {
  if (!routeName || isWaiting) {
    return false;
  }

  const isAuthenticatedRoute = authenticatedRoutes.includes(routeName);

  if (isAuthenticatedRoute && isAuthenitcated) {
    return false;
  }

  return true;
}
