import { createSelector } from 'reselect';

import { State } from '@pivot/client/activity';
import { injectable } from '@pivot/lib/injectable';
import { slice } from '@pivot/lib/slice';

export const activitySlice = injectable({
  importFn: () =>
    import('@pivot/client/activity').then((m) => slice('activity', m.initialState, m.reducers)),
});

export const activityService = injectable({
  dependencies: [activitySlice],
  importFn: (slice) => import('@pivot/client/activity').then((m) => m.service(slice.api)),
});

export const selectActivity = (state: { activity?: State }) => state.activity;

export const selectEntries = createSelector(selectActivity, (activity) => activity?.entries ?? []);
