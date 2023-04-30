import { Environment } from '@pivot/client/environments';
import { injectable } from '@pivot/lib/injectable';
import { resourceSlice } from '@pivot/lib/resource';

export const environmentsResourceSlice = injectable({
  importFn: () =>
    Promise.resolve(resourceSlice<Environment[], any>('environmentsResource')),
});
