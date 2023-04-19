import { authSlice } from './modules/auth';
import {
  deploymentsResourceSlice,
  selectIsDeploymentsRoute,
} from './modules/deployments';
import {
  environmentsResourceSlice,
  selectIsEnvironmentsRoute,
} from './modules/environments';
import {
  featuresResourceSlice,
  selectIsFeaturesRoute,
} from './modules/features';
import { projectResourceSlice, projectUiSlice } from './modules/project';
import { selectIsProjectRoute } from './modules/project/project.selectors';
import {
  releasesResourceSlice,
  selectIsReleasesRoute,
} from './modules/releases';
import { routerSlice } from './modules/router';
import {
  selectIsVariablesRoute,
  variablesResourceSlice,
} from './modules/variables';

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
  deploymentsResource: {
    active: selectIsDeploymentsRoute,
    injectable: deploymentsResourceSlice,
  },
  environmentsResource: {
    active: selectIsEnvironmentsRoute,
    injectable: environmentsResourceSlice,
  },
  featuresResource: {
    active: selectIsFeaturesRoute,
    injectable: featuresResourceSlice,
  },
  projectUi: {
    active: selectIsProjectRoute,
    injectable: projectUiSlice,
  },
  projectResource: {
    active: selectIsProjectRoute,
    injectable: projectResourceSlice,
  },
  releasesResource: {
    active: selectIsReleasesRoute,
    injectable: releasesResourceSlice,
  },
  router: {
    active: () => true,
    injectable: routerSlice,
  },
  variablesResource: {
    active: selectIsVariablesRoute,
    injectable: variablesResourceSlice,
  },
};
