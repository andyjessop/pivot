import { injectable } from '@pivot/injectable';

export const cacheService = injectable({
  importFn: () => import('@pivot/client-cache').then((m) => m.cache()),
});
