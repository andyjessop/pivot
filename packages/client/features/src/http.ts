import { Http } from '@pivot/client/http';

import { Feature } from './types';

export function http(baseHttp: Http) {
  return {
    get: async (projectId: string): Promise<Feature> => {
      return baseHttp.get(`/rest/v1/feature?project_id=eq.${projectId}&select=*`);
    },
  };
}
