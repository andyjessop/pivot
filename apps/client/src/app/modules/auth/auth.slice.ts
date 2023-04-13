import { initialState, reducers } from '@pivot/client/auth';
import { injectable } from '@pivot/lib/injectable';
import { slice } from '@pivot/lib/slice';

export const authSlice = injectable({
  importFn: () => Promise.resolve(slice('auth', initialState, reducers)),
});
