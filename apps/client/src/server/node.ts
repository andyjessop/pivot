import { setupServer } from 'msw/node';

import { service, Variable } from '@pivot/client/env';

import { createHandlers } from './handlers';

const env = service();

export function createServer(apiUrl: string) {
  return setupServer(...createHandlers(apiUrl));
}

export const server = createServer(env.get(Variable.SUPABASE_API_URL));
