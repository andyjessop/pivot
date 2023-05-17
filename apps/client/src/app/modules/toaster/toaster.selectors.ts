import { createSelector } from 'reselect';

import { State } from '@pivot/client/toaster';

export const selectToaster = (state: unknown) => (state as any).toaster as State;

export const selectNotifications = createSelector(
  selectToaster,
  (toaster) => toaster?.notifications,
);
