import { authHandlers } from './handlers/auth';
import { deploymentHandlers } from './handlers/deployment';
import { deploymentFeatureHandlers } from './handlers/deployment-feature';
import { deploymentVariableHandlers } from './handlers/deployment-variable';
import { projectHandlers } from './handlers/project';
import { userHandlers } from './handlers/user';

export function createHandlers(apiUrl: string, { isBrowser = false } = {}) {
  return [
    ...authHandlers(apiUrl, { isBrowser }),
    ...projectHandlers(apiUrl, { isBrowser }),
    ...deploymentHandlers(apiUrl, { isBrowser }),
    ...deploymentFeatureHandlers(apiUrl, { isBrowser }),
    ...deploymentVariableHandlers(apiUrl, { isBrowser }),
    ...userHandlers(apiUrl, { isBrowser }),
  ];
}
