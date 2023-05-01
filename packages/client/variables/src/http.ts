import { Http } from '@pivot/client/http';

import { Variable } from './types';

export function http(baseHttp: Http) {
  return {
    get: async (projectId: string): Promise<Variable> => {
      return baseHttp.get(`/rest/v1/variable?project_id=eq.${projectId}&select=*`);
    },
  };
}
