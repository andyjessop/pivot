import { DeploymentFeaturesHttp } from '@pivot/client/deployment-features';
import { DeploymentVariablesHttp } from '@pivot/client/deployment-variables';
import { Deployment, DeploymentsResourceService } from '@pivot/client/deployments';
import { makeDraft } from '@pivot/util/model';

import { Actions } from './types';

export function service(
  pendingDeploymentState: Actions,
  deploymentsResource: DeploymentsResourceService,
  deploymentFeaturesHttp: DeploymentFeaturesHttp,
  DeploymentVariablesHttp: DeploymentVariablesHttp,
) {
  return {
    cloneDeployment,
    deploy,
    ...pendingDeploymentState,
  };

  /**
   * Creates a draft deployment from a deployment.
   */
  async function cloneDeployment(deployment: Deployment) {
    const strippedDeployment = makeDraft(deployment);

    const features = await deploymentFeaturesHttp.get(deployment.uuid);
    const variables = await DeploymentVariablesHttp.get(deployment.uuid);

    const strippedFeatures = features.map((feature) => makeDraft(feature));
    const strippedVariables = variables.map((variable) => makeDraft(variable));

    pendingDeploymentState.setDeployment(strippedDeployment);

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
      DeploymentVariablesHttp.post(variable);
    }

    pendingDeploymentState.clearDrafts();
  }
}
