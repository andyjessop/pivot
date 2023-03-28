import { authSlice } from '../modules/auth/auth.module';
import { routerSlice } from '../modules/router/router.module';

/**
 * This is the configuration for the slices of the application. The `injectable` property
 * is an instance of an `Injectable` that returns a Slice instance. The `active` property
 * is a function that returns a boolean indicating whether the slice should be active.
 */
export const config = {
  auth: {
    active: () => true,
    injectable: authSlice,
  },
  router: {
    active: () => true,
    injectable: routerSlice,
  },
};
