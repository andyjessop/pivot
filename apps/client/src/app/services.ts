import { authService } from './modules/auth';
import { breadcrumbService } from './modules/breadcrumb';
import { cacheService } from './modules/cache';
import { deploymentsResourceService } from './modules/deployments';
import { envService } from './modules/env';
import { environmentsResourceService } from './modules/environments';
import { featuresResourceService } from './modules/features';
import { headService } from './modules/head';
import { pendingDeploymentService } from './modules/pending-deployment';
import { projectResourceService } from './modules/project';
import { releasesResourceService } from './modules/releases';
import { routerService } from './modules/router';
import { toasterService } from './modules/toaster';
import { variablesResourceService } from './modules/variables';

/**
 * This is the configuration for the services of the application. Services defined
 * here are instances of an `Injectable`, which is a type that allows it to be injected
 * into other services by the Pivot framework.
 *
 * Injectables can be anything, even Slice APIs, which means that you can defined services
 * that can modify (and read from) the state of the application.
 */
export const services = {
  auth: authService,
  breadcrumb: breadcrumbService,
  cache: cacheService,
  deploymentsResource: deploymentsResourceService,
  env: envService,
  environmentsResource: environmentsResourceService,
  featuresResource: featuresResourceService,
  head: headService,
  pendingDeployment: pendingDeploymentService,
  projectResource: projectResourceService,
  releasesResource: releasesResourceService,
  router: routerService,
  toaster: toasterService,
  variablesResource: variablesResourceService,
};
