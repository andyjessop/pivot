import { injectable } from '@pivot/lib/injectable';
import { slice } from '@pivot/lib/slice';

import { initialState, reducers } from '../domain';

export const authSlice = injectable({
  importFn: () => Promise.resolve(slice('auth', initialState, reducers)),
});
