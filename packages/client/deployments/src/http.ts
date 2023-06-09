import { Http } from '@pivot/client/http';
import { Draft } from '@pivot/util/model';

import { Deployment } from './types';

export type DeploymentsHttp = ReturnType<typeof http>;

export function http(baseHttp: Http) {
  return {
    get: async (projectId: string): Promise<Deployment[]> => {
      return baseHttp.get(
        `/rest/v1/deployment?project_id=eq.${projectId}&select=*,features:deployment_feature(*),variables:deployment_variable(*)`,
      );
    },

    post: async (deployment: Draft<Deployment>): Promise<Deployment> => {
      const result = await baseHttp.post<Deployment[]>(`/rest/v1/deployment`, deployment);

      return result[0];
    },
  };
}
