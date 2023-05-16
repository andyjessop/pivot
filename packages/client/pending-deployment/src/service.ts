import { DeploymentFeaturesHttp } from '@pivot/client/deployment-features';
import { DeploymentVariablesHttp } from '@pivot/client/deployment-variables';
import { Deployment, DeploymentsResourceService } from '@pivot/client/deployments';
import { EnvironmentsResource } from '@pivot/client/environments';
import { makeDraft } from '@pivot/util/model';

import { Api } from './types';

export function service(
  pendingDeploymentState: Api,
  deploymentsResource: DeploymentsResourceService,
  deploymentFeaturesHttp: DeploymentFeaturesHttp,
  deploymentVariablesHttp: DeploymentVariablesHttp,
  environmentsResource: EnvironmentsResource,
) {
  return {
    cloneDeployment,
    deploy,
    setEnvironment,
    setUrl,
    ...pendingDeploymentState,
    overrideVariable,
  };

  /**
   * Creates a draft deployment from a deployment.
   */
  async function cloneDeployment(deployment: Deployment) {
    const strippedDeployment = makeDraft(deployment);

    pendingDeploymentState.setDeployment(strippedDeployment);
    pendingDeploymentState.fetchFeatures();
    pendingDeploymentState.fetchVariables();

    const [features, variables] = await Promise.all([
      deploymentFeaturesHttp.get(deployment.uuid),
      deploymentVariablesHttp.get(deployment.uuid),
    ]);

    pendingDeploymentState.fetchFeaturesSuccess(features);
    pendingDeploymentState.fetchVariablesSuccess(variables);
  }

  function deploy() {
    const { deployment, features = [], variables = [] } = pendingDeploymentState.getState();

    if (deployment) {
      deploymentsResource.create(deployment);
    }

    for (const feature of features) {
      deploymentFeaturesHttp.post(feature);
    }

    for (const variable of variables) {
      deploymentVariablesHttp.post(variable);
    }

    pendingDeploymentState.clearDrafts();
  }

  function overrideVariable(variable_id: string, value: string) {
    // if the new value is the same as the original value, we can just remove the variable
    const deployment = pendingDeploymentState.getState().deployment;

    if (!deployment) {
      throw new Error('Cannot override variable without a deployment.');
    }

    const currentEnv = environmentsResource
      .getData()
      ?.find((e) => e.uuid === deployment?.environment_id);

    const currentEnvVariable = currentEnv?.variables.find((v) => v.variable_id === variable_id);

    if (currentEnvVariable?.value === value) {
      return pendingDeploymentState.clearOverride(variable_id);
    }

    return pendingDeploymentState.overrideVariable(variable_id, value);
  }

  function setEnvironment(uuid: string) {
    pendingDeploymentState.updateDeployment({ environment_id: uuid });

    // When updating the environment, we need to make sure that the URL is valid for
    // that environment. An environment can specify a URL, and in that case we need
    // to ensure that it is not set on the deployment.
    const environment = environmentsResource.getData()?.find((e) => e.uuid === uuid);

    if (environment?.url) {
      pendingDeploymentState.updateDeployment({ url: undefined });
    }
  }

  function setUrl(url: string) {
    pendingDeploymentState.updateDeployment({ url });
  }
}
