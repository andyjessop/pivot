import { injectable } from '@pivot/lib/injectable';

import { service } from '../domain';

export const envService = injectable({
  importFn: () => Promise.resolve(service()),
});
