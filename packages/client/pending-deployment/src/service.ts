import { Deployment } from '@pivot/client/deployments';
import { Environment } from '@pivot/client/environments';
import { pick } from '@pivot/util/object';

import { Actions } from './types';

export function service(
  pendingDeploymentApi: Actions,
  getDeployments: () => Deployment[] | null,
  getEnvironments: () => Environment[] | null,
) {
  return {
    cloneDeployment,
    ...pendingDeploymentApi,
  };

  /**
   * Creates a pendingDeployment from a deployment.
   */
  function cloneDeployment(uuid: string) {
    const deployments = getDeployments();
    const environments = getEnvironments();

    const pendingDeployment = getPendingDeployment(
      uuid,
      deployments,
      environments,
    );

    pendingDeploymentApi.set(pendingDeployment);
  }
}

export function getPendingDeployment(
  uuid: string,
  deployments: Deployment[] | null,
  environments: Environment[] | null,
) {
  if (!deployments || !environments) {
    throw new Error('Deployments or environments not loaded');
  }

  const deployment = deployments.find((d) => d.uuid === uuid);

  if (!deployment) {
    throw new Error(`Deployment ${uuid} not found`);
  }

  const environment = environments.find(
    (e) => e.uuid === deployment?.environment_id,
  );

  const props = [
    'environment_id',
    'features',
    'release_id',
    'variables',
  ] as (keyof Deployment)[];

  // If the environment doesn't have a URL by default (e.g. example.com, staging.example.com)
  // then we need to set the URL by cloning the deployment's URL.
  if (!environment?.url) {
    // If the deployment URL doesn't exist, then it's an error.
    if (!deployment.url) {
      throw new Error(
        `Deployment ${uuid} does not have a URL and its environment does not have a URL`,
      );
    }

    props.push('url');
  }

  return {
    deployment_id: deployment.uuid,
    ...pick(deployment, props),
  };
}
