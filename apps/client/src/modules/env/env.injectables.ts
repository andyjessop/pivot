import { service } from '@pivot/client/env';
import { injectable } from '@pivot/lib/injectable';

export const envService = injectable({
  importFn: () => Promise.resolve(service()),
});
