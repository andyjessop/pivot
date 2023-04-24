import { authSlice } from './modules/auth';
import { breadcrumbSlice } from './modules/breadcrumb';
import {
  deploymentsResourceSlice,
  selectIsDeploymentsRoute,
} from './modules/deployments';
import { environmentsResourceSlice } from './modules/environments';
import { featuresResourceSlice } from './modules/features';
import { projectResourceSlice, projectUiSlice } from './modules/project';
import { selectIsProjectRoute } from './modules/project/project.selectors';
import { releasesResourceSlice } from './modules/releases';
import { routerSlice } from './modules/router';
import { variablesResourceSlice } from './modules/variables';
import {
  selectShouldLoadEnvironementsResource,
  selectShouldLoadFeaturesResource,
  selectShouldLoadReleasesResource,
  selectShouldLoadVariablesResource,
} from './selectors/project-resource.selectors';

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
    active: selectIsDeploymentsRoute,
    injectable: deploymentsResourceSlice,
  },
  environmentsResource: {
    active: selectShouldLoadEnvironementsResource,
    injectable: environmentsResourceSlice,
  },
  featuresResource: {
    active: selectShouldLoadFeaturesResource,
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
    active: selectShouldLoadReleasesResource,
    injectable: releasesResourceSlice,
  },
  router: {
    active: () => true,
    injectable: routerSlice,
  },
  variablesResource: {
    active: selectShouldLoadVariablesResource,
    injectable: variablesResourceSlice,
  },
};
