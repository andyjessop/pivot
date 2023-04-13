import { authService } from './modules/auth';
import { cacheService } from './modules/cache';
import { envService } from './modules/env';
import { headService } from './modules/head';
import { routerService } from './modules/router';

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
  cache: cacheService,
  env: envService,
  head: headService,
  router: routerService,
};
