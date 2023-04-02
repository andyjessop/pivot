import { injectable } from '@pivot/lib/injectable';

import { service } from '../domain/service';

export const cacheService = injectable({
  importFn: () => Promise.resolve(service()),
});
