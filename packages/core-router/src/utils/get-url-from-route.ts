import type { Route } from '../types';

export function getUrlFromRoute<T extends Record<string, string>>(
  config: T,
  name: keyof T,
  params: Route<T>['params'],
  search: Route<T>['search'],
  hash: Route<T>['hash']
): string {
  let pathname = config[name];

  while (params && pathname.match(/(:)\w+/)) {
    const param = pathname.match(/(:)\w+/)[0];
    const value = params[param.replace(':', '')];

    pathname = pathname.replace(param, value) as T[keyof T];
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
