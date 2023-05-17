import { injectable } from '@pivot/lib/injectable';

import { httpService } from '../http';

export const variableOverridesHttpService = injectable({
  dependencies: [httpService],
  importFn: (http) => import('@pivot/client/variable-overrides').then((mod) => mod.http(http)),
});
