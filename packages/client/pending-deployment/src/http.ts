import { CRUX_ACCESS_TOKEN_CACHE_KEY } from '@pivot/client/auth';
import { Cache } from '@pivot/client/cache';
import { Service as Env, Variable } from '@pivot/client/env';
import { Project } from '@pivot/client/shared-interfaces';

export type ProjectHttpApi = ReturnType<typeof createProjectHttpApi>;

export function createProjectHttpApi(env: Env, cache: Cache) {
  return {
    getOne: async (id: string): Promise<Project.Model> => {
      const token = cache.get(CRUX_ACCESS_TOKEN_CACHE_KEY);

      return fetch(`${env.get(Variable.SUPABASE_FUNCTIONS_URL)}/deployments?projectId=${id}`, {
        headers: {
          apiKey: env.get(Variable.SUPABASE_API_KEY),
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        method: 'GET',
      }).then((res) => res.json());
    },
  };
}
