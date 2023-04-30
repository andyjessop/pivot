import { Http } from '@pivot/client/http';

import { Environment } from './types';

export function http(baseHttp: Http) {
  return {
    get: async (projectId: string): Promise<Environment[]> => {
      return baseHttp.get(
        `/rest/v1/environment?project_id=eq.${projectId}&select=*,features:environment_feature(*),variables:environment_variable(*)`,
      );
    },
  };
}
