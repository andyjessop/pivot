import { authSlice } from './modules/auth';
import { breadcrumbSlice } from './modules/breadcrumb';
import { deploymentsResourceSlice } from './modules/deployments';
import { environmentsResourceSlice } from './modules/environments';
import { featuresResourceSlice } from './modules/features';
import { pendingDeploymentSlice } from './modules/pending-deployment';
import { projectResourceSlice, projectUiSlice } from './modules/project';
import { selectIsProjectRoute } from './modules/project/project.selectors';
import { releasesResourceSlice } from './modules/releases';
import { routerSlice } from './modules/router';
import { variablesResourceSlice } from './modules/variables';

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
  breadcrumb: {
    active: () => true,
    injectable: breadcrumbSlice,
  },
  deploymentsResource: {
    active: selectIsProjectRoute,
    injectable: deploymentsResourceSlice,
  },
  environmentsResource: {
    active: selectIsProjectRoute,
    injectable: environmentsResourceSlice,
  },
  featuresResource: {
    active: selectIsProjectRoute,
    injectable: featuresResourceSlice,
  },
  pendingDeployment: {
    active: selectIsProjectRoute,
    injectable: pendingDeploymentSlice,
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
    active: selectIsProjectRoute,
    injectable: releasesResourceSlice,
  },
  router: {
    active: () => true,
    injectable: routerSlice,
  },
  variablesResource: {
    active: selectIsProjectRoute,
    injectable: variablesResourceSlice,
  },
};
