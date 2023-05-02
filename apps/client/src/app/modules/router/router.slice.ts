import { injectable } from '@pivot/lib/injectable';
import { initialState, reducers } from '@pivot/lib/router';
import { slice } from '@pivot/lib/slice';

export const routerSlice = injectable({
  importFn: () => Promise.resolve(slice('router', initialState, reducers)),
});
