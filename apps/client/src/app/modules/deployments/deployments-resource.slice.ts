import { injectable } from '@pivot/lib/injectable';
import { resourceSlice } from '@pivot/lib/resource';

export const deploymentsResourceSlice = injectable({
  importFn: () => Promise.resolve(resourceSlice('deploymentsResource')),
});
