import { createSelector } from 'reselect';

import { initialState, reducers, service, State } from '@pivot/client/toaster';
import { injectable } from '@pivot/lib/injectable';
import { slice } from '@pivot/lib/slice';

export const toasterSlice = injectable({
  importFn: () => Promise.resolve(slice('toaster', initialState, reducers)),
});

export const toasterService = injectable({
  dependencies: [toasterSlice],
  importFn: (slice) => Promise.resolve(service(slice.api)),
});

export const selectToaster = (state: { toaster?: State }) => state.toaster;

export const selectEntries = createSelector(selectToaster, (toaster) => toaster?.entries ?? []);
