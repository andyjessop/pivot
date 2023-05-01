import { Service as Env, Variable } from '@pivot/client/env';

import { User, UserResponse } from './types';

export function http(env: Env) {
  return {
    /**
     * Login.
     */
    login: (email: string, password: string): Promise<UserResponse> =>
      fetch(`${env.get(Variable.SUPABASE_API_URL)}/auth/v1/token?grant_type=password`, {
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
          apiKey: env.get(Variable.SUPABASE_API_KEY),
        },
        method: 'POST',
      }).then((res) => res.json()),

    logout: (token: string): Promise<any> =>
      fetch(`${env.get(Variable.SUPABASE_API_URL)}/auth/v1/logout`, {
        headers: {
          'Content-Type': 'application/json',
          apiKey: env.get(Variable.SUPABASE_API_KEY),
          authorization: `Bearer ${token}`,
        },
        method: 'POST',
      }).then((res) => res.json()),

    refreshToken: (token: string): Promise<UserResponse> =>
      fetch(`${env.get(Variable.SUPABASE_API_URL)}/auth/v1/token?grant_type=refresh_token`, {
        body: JSON.stringify({ refresh_token: token }),
        headers: {
          'Content-Type': 'application/json',
          apiKey: env.get(Variable.SUPABASE_API_KEY),
        },
        method: 'POST',
      }).then((res) => res.json()),

    /**
     * Fetch current logged in user.
     */
    user: (token: string): Promise<User> =>
      fetch(`${env.get(Variable.SUPABASE_API_URL)}/auth/v1/user`, {
        headers: {
          'Content-Type': 'application/json',
          apiKey: env.get(Variable.SUPABASE_API_KEY),
          authorization: `Bearer ${token}`,
        },
        method: 'GET',
      }).then((res) => res.json()),
  };
}
