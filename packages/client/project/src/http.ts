import { Http } from '@pivot/client/http';

import { Model } from './types';

export function http(baseHttp: Http) {
  return {
    get: async (id: string): Promise<Model> => {
      return baseHttp.get(`/rest/v1/project?uuid=eq.${id}`);
    },
  };
}
