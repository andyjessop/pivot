import { injectable } from '@pivot/lib/injectable';
import { resourceSlice } from '@pivot/lib/resource';

export const featuresResourceSlice = injectable({
  importFn: () => Promise.resolve(resourceSlice('featuresResource')),
});
