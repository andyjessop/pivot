import { injectable } from '@pivot/lib/injectable';

import { cacheService } from '../cache';
import { envService } from '../env';

export const httpService = injectable({
  dependencies: [envService, cacheService],
  importFn: (env, cache) => import('@pivot/client/http').then((mod) => mod.http(env, cache)),
});
