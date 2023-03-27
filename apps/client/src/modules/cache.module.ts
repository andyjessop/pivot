import { injectable } from '@pivot/lib/injectable';

export const cacheService = injectable({
  importFn: () => import('@pivot/client/cache').then((m) => m.cache()),
});
