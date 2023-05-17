import { Http } from '@pivot/client/http';
import { Draft } from '@pivot/util/model';

import { VariableOverride } from './types';

export type VariableOverridesHttp = ReturnType<typeof http>;

export function http(baseHttp: Http) {
  return {
    get: async (deploymentId: string): Promise<VariableOverride[]> => {
      return baseHttp.get(`/rest/v1/variable_override?deployment_id=eq.${deploymentId}&select=*`);
    },

    post: async (variable: Draft<VariableOverride>): Promise<VariableOverride> => {
      const result = await baseHttp.post<VariableOverride[]>(
        `/rest/v1/variable_override`,
        variable,
      );

      return result[0];
    },
  };
}
