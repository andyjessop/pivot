import { DeploymentFeaturesHttp } from '@pivot/client/deployment-features';
import { DeploymentVariablesHttp } from '@pivot/client/deployment-variables';
import { Deployment, DeploymentsResourceService } from '@pivot/client/deployments';
import { EnvironmentsResource } from '@pivot/client/environments';
import { makeDraft } from '@pivot/util/model';

import { Actions } from './types';

export function service(
  pendingDeploymentState: Actions,
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
  };

  /**
   * Creates a draft deployment from a deployment.
   */
  async function cloneDeployment(deployment: Deployment) {
    const strippedDeployment = makeDraft(deployment);

    pendingDeploymentState.setDeployment(strippedDeployment);

    const [features, variables] = await Promise.all([
      deploymentFeaturesHttp.get(deployment.uuid),
      deploymentVariablesHttp.get(deployment.uuid),
    ]);

    const strippedFeatures = features.map((feature) => makeDraft(feature));
    const strippedVariables = variables.map((variable) => makeDraft(variable));

    for (const feature of strippedFeatures) {
      pendingDeploymentState.setFeature(feature.feature_id, feature);
    }

    for (const variable of strippedVariables) {
      pendingDeploymentState.setVariable(variable.variable_id, variable);
    }
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
