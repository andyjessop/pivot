import { injectable } from '@pivot/pivot-injectable';

export const cacheService = injectable(() =>
  import('@pivot/client-cache').then((m) => m.cache()),
);
