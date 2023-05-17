import { injectable } from '@pivot/lib/injectable';

import { toasterSlice } from './toaster.slice';

export const toasterService = injectable({
  dependencies: [toasterSlice],
  importFn: (slice) => import('@pivot/client/toaster').then((m) => m.service(slice.api)),
});
