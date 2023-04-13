import { http } from '@pivot/client/auth';
import { injectable } from '@pivot/lib/injectable';

import { envService } from '../env/env.service';

export const httpService = injectable({
  importFn: (env) => Promise.resolve(http(env)),
  dependencies: [envService],
});
