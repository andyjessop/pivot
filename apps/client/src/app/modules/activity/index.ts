import { createSelector } from 'reselect';

import { initialState, reducers, service, State } from '@pivot/client/activity';
import { injectable } from '@pivot/lib/injectable';
import { slice } from '@pivot/lib/slice';

export const activitySlice = injectable({
  importFn: () => Promise.resolve(slice('activity', initialState, reducers)),
});

export const activityService = injectable({
  dependencies: [activitySlice],
  importFn: (slice) => Promise.resolve(service(slice.api)),
});

export const selectActivity = (state: { activity?: State }) => state.activity;

export const selectEntries = createSelector(selectActivity, (activity) => activity?.entries ?? []);
