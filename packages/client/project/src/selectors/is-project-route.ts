export function isProjectRoute(routeName?: string) {
  return Boolean(routeName?.startsWith('project'));
}
