import { authSlice } from './modules/auth';
import { projectResourceSlice, projectUiSlice } from './modules/project';
import { selectIsProjectRoute } from './modules/project/project.selectors';
import { routerSlice } from './modules/router';

/**
 * This is the configuration for the slices of the application. The `injectable` property
 * is an instance of an `Injectable` that returns a Slice instance. The `active` property
 * is a function that returns a boolean indicating whether the slice should be active.
 */
export const slices = {
  auth: {
    active: () => true,
    injectable: authSlice,
  },
  projectUi: {
    active: selectIsProjectRoute,
    injectable: projectUiSlice,
  },
  projectResource: {
    active: selectIsProjectRoute,
    injectable: projectResourceSlice,
  },
  router: {
    active: () => true,
    injectable: routerSlice,
  },
};
