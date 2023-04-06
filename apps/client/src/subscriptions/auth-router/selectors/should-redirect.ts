export function shouldRedirect(isUnauthorized: boolean, routeName?: string) {
  return isUnauthorized && routeName !== 'notFound';
}
