import { service } from '@pivot/client/cache';
import { injectable } from '@pivot/lib/injectable';

export const cacheService = injectable({
  importFn: () => Promise.resolve(service()),
});
