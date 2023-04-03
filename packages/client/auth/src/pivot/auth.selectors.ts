import { createSelector } from 'reselect';

import { State } from '../domain/types';

export const selectAuth = (state: { auth: State }) => state.auth;

export const selectIsAuthenitcated = createSelector(
  selectAuth,
  (auth) => auth && auth.user !== null,
);

export const selectIsWaiting = createSelector(
  selectAuth,
  (auth) => auth && (auth.isChecking || auth.isLoggingIn || auth.isLoggingOut),
);
