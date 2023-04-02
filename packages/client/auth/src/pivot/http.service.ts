import { envService } from '@pivot/client/env';
import { injectable } from '@pivot/lib/injectable';

import { http } from '../domain';

export const httpService = injectable({
  importFn: (env) => Promise.resolve(http(env)),
  dependencies: [envService],
});
