import { injectable } from '@pivot/lib/injectable';

import { service } from '../domain';

export const headService = injectable({
  importFn: () => Promise.resolve(service()),
  dependencies: [],
});
