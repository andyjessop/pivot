import { injectable } from '@pivot/lib/injectable';
import { slice } from '@pivot/lib/slice';

import { initialState, reducers } from '../domain';

export const routerSlice = injectable({
  importFn: () => Promise.resolve(slice('router', initialState, reducers)),
});
