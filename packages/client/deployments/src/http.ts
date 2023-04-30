import { Http } from '@pivot/client/http';

import { Deployment } from './types';

export function http(baseHttp: Http) {
  return {
    get: async (projectId: string): Promise<Deployment[]> => {
      return baseHttp.get(
        `/rest/v1/deployment?project_id=eq.${projectId}&select=*,features:deployment_feature(*),variables:deployment_variable(*)`,
      );
    },
  };
}
