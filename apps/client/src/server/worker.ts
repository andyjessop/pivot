import { setupWorker } from 'msw';

import { service, Variable } from '@pivot/client/env';

import { createHandlers } from './handlers';

const env = service();

export function createServer(apiUrl: string) {
  return setupWorker(...createHandlers(apiUrl));
}

export const server = createServer(env.get(Variable.SUPABASE_API_URL));
