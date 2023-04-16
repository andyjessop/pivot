import { injectable } from '@pivot/lib/injectable';
import { resourceSlice } from '@pivot/lib/resource';

export const projectResourceSlice = injectable({
  importFn: () => Promise.resolve(resourceSlice('projectResource')),
});
