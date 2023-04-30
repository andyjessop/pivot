import { Deployment } from '@pivot/client/deployments';
import { injectable } from '@pivot/lib/injectable';
import { resourceSlice } from '@pivot/lib/resource';

export const deploymentsResourceSlice = injectable({
  importFn: () =>
    Promise.resolve(resourceSlice<Deployment[], any>('deploymentsResource')),
});
