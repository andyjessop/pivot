import { initialState, reducers } from '@pivot/client/router';
import { injectable } from '@pivot/lib/injectable';
import { slice } from '@pivot/lib/slice';

export const routerSlice = injectable({
  importFn: () => Promise.resolve(slice('router', initialState, reducers)),
});
