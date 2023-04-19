import { Http } from '@pivot/client/http';

import { Release } from './types';

export function http(baseHttp: Http) {
  return {
    get: async (projectId: string): Promise<Release> => {
      return baseHttp.get(
        `/rest/v1/release?project_id=eq.${projectId}&select=*`,
      );
    },
  };
}
