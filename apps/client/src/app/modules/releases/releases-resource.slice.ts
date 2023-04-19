import { injectable } from '@pivot/lib/injectable';
import { resourceSlice } from '@pivot/lib/resource';

export const releasesResourceSlice = injectable({
  importFn: () => Promise.resolve(resourceSlice('releasesResource')),
});
