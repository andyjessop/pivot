import { Http } from '@pivot/client/http';
import { Draft } from '@pivot/util/model';

import { DeploymentFeature } from './types';

export type DeploymentFeaturesHttp = ReturnType<typeof http>;

export function http(baseHttp: Http) {
  return {
    get: async (deploymentId: string): Promise<DeploymentFeature[]> => {
      return baseHttp.get(`/rest/v1/deployment_feature?deployment_id=eq.${deploymentId}&select=*`);
    },

    post: async (deploymentFeature: Draft<DeploymentFeature>): Promise<DeploymentFeature> => {
      const result = await baseHttp.post<DeploymentFeature[]>(
        `/rest/v1/deployment_feature`,
        deploymentFeature,
      );

      return result[0];
    },
  };
}
