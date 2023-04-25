export function isProjectRoute(routeName?: string) {
  return [
    'project',
    'deployments',
    'environments',
    'features',
    'releases',
    'variables',
  ].includes(routeName || '');
}
