import { Http } from '@pivot/client/http';
import { Draft } from '@pivot/util/model';

import { DeploymentVariable } from './types';

export type DeploymentVariablesHttp = ReturnType<typeof http>;

export function http(baseHttp: Http) {
  return {
    get: async (deploymentId: string): Promise<DeploymentVariable[]> => {
      return baseHttp.get(`/rest/v1/deployment_variable?deployment_id=eq.${deploymentId}&select=*`);
    },

    post: async (deployment: Draft<DeploymentVariable>): Promise<DeploymentVariable> => {
      const result = await baseHttp.post<DeploymentVariable[]>(
        `/rest/v1/deployment_variable`,
        deployment,
      );

      return result[0];
    },
  };
}
