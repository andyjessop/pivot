import { injectable } from '@pivot/lib/injectable';

import { cacheService } from '../cache';
import { envService } from '../env';

export const httpService = injectable({
  importFn: (env, cache) => import('@pivot/client/http').then((mod) => mod.http(env, cache)),
  dependencies: [envService, cacheService],
});
