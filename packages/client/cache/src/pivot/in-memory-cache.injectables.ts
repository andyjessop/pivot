import { injectable } from '@pivot/lib/injectable';

import { getLocalStorageMock } from '../domain/local-storage-mock';
import { service } from '../domain/service';

export const inMemoryCacheService = injectable({
  importFn: () => Promise.resolve(service(getLocalStorageMock())),
});
