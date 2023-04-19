import { injectable } from '@pivot/lib/injectable';
import { resourceSlice } from '@pivot/lib/resource';

export const environmentsResourceSlice = injectable({
  importFn: () => Promise.resolve(resourceSlice('environmentsResource')),
});
