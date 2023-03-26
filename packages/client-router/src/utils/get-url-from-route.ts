import type { Route } from '../types';

export function getUrlFromRoute<T extends Record<string, string>>(
  config: T,
  name: keyof T & string,
  params: Route<T>['params'],
  search: Route<T>['search'],
  hash: Route<T>['hash'],
): string {
  let pathname = config[name];

  if (!pathname) {
    throw new Error(`Route "${name}" not found in config`);
  }

  if (pathname.match(/(:)\w+/) && !params) {
    throw new Error(`Route "${name}" requires params but none were provided`);
  }

  while (params && pathname.match(/(:)\w+/)) {
    const param = pathname.match(/(:)\w+/)![0];
    const value = params[param.replace(':', '')];

    pathname = pathname.replace(param, value) as T[keyof T & string];
  }

  const searchStr = search
    ? Object.entries(search)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')
    : '';

  return `${window.location.origin}${pathname}${
    searchStr.length ? `?${searchStr}` : ''
  }${hash ? `#${hash}` : ''}`;
}
