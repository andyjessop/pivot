/// <reference types="vite/client" />

import { Service, Variable } from './types';

export { Variable };
export type { Service };

export function service(): Service {
  const variables: Record<Variable, string> = {
    [Variable.API_URL]: import.meta.env.VITE_API_URL,
    [Variable.SUPABASE_API_KEY]: import.meta.env.VITE_SUPABASE_API_KEY,
    [Variable.SUPABASE_API_URL]: import.meta.env.VITE_SUPABASE_API_URL,
    [Variable.SUPABASE_FUNCTIONS_URL]: import.meta.env
      .VITE_SUPABASE_FUNCTIONS_URL,
  };

  return {
    get,
  };

  function get(key: Variable) {
    return variables[key];
  }
}
