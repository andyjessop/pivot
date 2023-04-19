import { fetchDeployments } from '~app/modules/deployments/fetch-deployments.subscription';
import { fetchEnvironments } from '~app/modules/environments/fetch-environments.subscription';
import { fetchFeatures } from '~app/modules/features/fetch-features.subscription';
import { fetchProject } from '~app/modules/project/fetch-project.subscription';
import { fetchReleases } from '~app/modules/releases/fetch-releases.subscription';
import { fetchVariables } from '~app/modules/variables/fetch-variables.subscription';

import { setBreadcrumb } from '../modules/breadcrumb/set-breadcrumb.subscription';

import { headMetadata } from './head-metadata';
import { projectRedirect } from './project-redirect';
import { setProjectBreadcrumb } from './set-project-breadcrumb';
import { unauthorizedRedirect } from './unauthorized-redirect';

/**
 * This is the configuration for the subscriptions of the application. Each
 * subscription has a selector, and a handler. The selector is used to select
 * the value from the state that the subscription is interested in. The handler
 * is called whenever the value changes.
 *
 * The handler can also accept dependencies. These are other services that the
 * handler can use. The dependencies are injected into the handler when it is
 * called.
 *
 * @example
 *
 * const mySubscription = {
 *   selector: (state) => state.myValue,
 *   handler: (service) => (myValue) => {
 *     service.doSomething(myValue);
 *   },
 *   dependencies: [MyService],
 * };
 */
export const subscriptions = {
  fetchDeployments,
  fetchEnvironments,
  fetchFeatures,
  fetchReleases,
  fetchProject,
  fetchVariables,
  headMetadata,
  projectRedirect,
  setBreadcrumb,
  setProjectBreadcrumb,
  unauthorizedRedirect,
};
