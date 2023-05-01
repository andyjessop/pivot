import { service } from '@pivot/client/auth';
import { injectable } from '@pivot/lib/injectable';

import { cacheService } from '../cache/cache.service';

import { authSlice } from './auth.slice';
import { httpService } from './http.service';

export const authService = injectable({
  dependencies: [authSlice, cacheService, httpService],
  importFn: (auth, cache, http) => {
    return Promise.resolve(service(auth.api, cache, http));
  },
});
