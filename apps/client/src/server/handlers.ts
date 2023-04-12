import { authHandlers } from './handlers/auth';

export function createHandlers(apiUrl: string, { isBrowser = false } = {}) {
  return [...authHandlers(apiUrl, { isBrowser })];
}
