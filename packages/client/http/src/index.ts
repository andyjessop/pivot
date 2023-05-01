import { CRUX_ACCESS_TOKEN_CACHE_KEY } from '@pivot/client/auth';
import { Cache } from '@pivot/client/cache';
import { Service as Env, Variable } from '@pivot/client/env';

export type Http = ReturnType<typeof http>;

export function http(env: Env, cache: Cache) {
  return {
    get,
  };

  async function get<T>(path: string, baseUrl?: string): Promise<T> {
    const token = cache.get(CRUX_ACCESS_TOKEN_CACHE_KEY);

    const url = `${baseUrl ?? env.get(Variable.SUPABASE_API_URL)}${path}`;

    return fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        apiKey: env.get(Variable.SUPABASE_API_KEY),
        authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }).then((res) => res.json());
  }
}
