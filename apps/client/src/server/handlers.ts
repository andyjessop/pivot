import { authHandlers } from './handlers/auth';
import { projectHandlers } from './handlers/project';
import { userHandlers } from './handlers/user';

export function createHandlers(apiUrl: string, { isBrowser = false } = {}) {
  return [
    ...authHandlers(apiUrl, { isBrowser }),
    ...projectHandlers(apiUrl, { isBrowser }),
    ...userHandlers(apiUrl, { isBrowser }),
  ];
}
