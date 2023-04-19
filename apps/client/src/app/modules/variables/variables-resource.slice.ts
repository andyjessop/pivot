import { injectable } from '@pivot/lib/injectable';
import { resourceSlice } from '@pivot/lib/resource';

export const variablesResourceSlice = injectable({
  importFn: () => Promise.resolve(resourceSlice('variablesResource')),
});
