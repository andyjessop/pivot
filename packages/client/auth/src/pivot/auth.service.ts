import { cacheService } from '@pivot/client/cache';
import { injectable } from '@pivot/lib/injectable';

import { service } from '../domain';

import { authSlice } from './auth.slice';
import { httpService } from './http.service';

export const authService = injectable({
  importFn: (auth, cache, http) => {
    return Promise.resolve(service(auth.api, cache, http));
  },
  dependencies: [authSlice, cacheService, httpService],
});
