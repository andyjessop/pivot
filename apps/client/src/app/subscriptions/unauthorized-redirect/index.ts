import { createSelector } from 'reselect';

import { Router } from '@pivot/lib/router';

import {
  selectIsAuthenitcated,
  selectIsAwaitingAuthentication,
  selectIsLoggingOut,
} from '../../modules/auth';
import { routerService, selectRouteName } from '../../modules/router';

import { isUnauthorized } from './selectors/is-authorized';
import { shouldRedirect } from './selectors/should-redirect';

export const selectIsUnauthorized = createSelector(
  selectIsAuthenitcated,
  selectIsAwaitingAuthentication,
  selectIsLoggingOut,
  selectRouteName,
  isUnauthorized,
);

export const selectShouldRedirectToNotFound = createSelector(
  selectIsUnauthorized,
  selectRouteName,
  shouldRedirect,
);

/**
 * unauthorizedRedirect subscription. This handles the redirecting of the user to the not-found page
 * if they are not authorized to view the current route.
 */
export const unauthorizedRedirect = {
  dependencies: [routerService],
  handler: (router: Router) => (shouldRedirect: boolean) => {
    if (shouldRedirect) {
      router.navigate({ name: 'notFound' });
    }
  },
  selector: selectShouldRedirectToNotFound,
};
