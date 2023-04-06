import { createSelector } from 'reselect';

import {
  authService,
  selectIsAuthenitcated,
  selectIsWaiting,
} from '@pivot/client/auth';
import { Router, routerService, selectRouteName } from '@pivot/client/router';

import { isUnauthorized } from './selectors/is-authorized';
import { shouldRedirect } from './selectors/should-redirect';

export const selectIsUnauthorized = createSelector(
  selectIsAuthenitcated,
  selectIsWaiting,
  selectRouteName,
  isUnauthorized,
);

export const selectShouldRedirectToNotFound = createSelector(
  selectIsUnauthorized,
  selectRouteName,
  shouldRedirect,
);

/**
 * Auth-Router subscription. This handles the redirecting of the user to the not-found page
 * if they are not authorized to view the current route.
 */
export const authRouter = {
  selector: selectShouldRedirectToNotFound,
  handler: (router: Router) => (shouldRedirect: boolean) => {
    if (shouldRedirect) {
      router.navigate({ name: 'notFound' });
    }
  },
  dependencies: [routerService, authService],
};
