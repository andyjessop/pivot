import { createSelector } from 'reselect';

import { State } from '@pivot/client/auth';

export const selectAuth = (state: { auth: State }) => state.auth;

export const selectIsAuthenitcated = createSelector(
  selectAuth,
  (auth) => auth && auth.user !== null,
);

export const selectIsAwaitingAuthentication = createSelector(
  selectAuth,
  (auth) => !auth || auth.isChecking || auth.isLoggingIn,
);

export const selectIsLoggingOut = createSelector(selectAuth, (auth) => auth && auth.isLoggingOut);
