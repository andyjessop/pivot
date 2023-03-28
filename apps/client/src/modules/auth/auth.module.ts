import { http, initialState, reducers, service } from '@pivot/client/auth';
import { injectable } from '@pivot/lib/injectable';
import { slice } from '@pivot/lib/slice';

import { cacheService } from '../cache/cache.module';
import { envService } from '../env/env.module';

export const authSlice = injectable({
  importFn: () => Promise.resolve(slice('auth', initialState, reducers)),
});

const httpService = injectable({
  importFn: (env) => Promise.resolve(http(env)),
  dependencies: [envService],
});

export const authService = injectable({
  importFn: (auth, cache, http) => {
    debugger; // eslint-disable-line

    return Promise.resolve(service(auth.api, cache, http));
  },

  dependencies: [authSlice, cacheService, httpService],
});
