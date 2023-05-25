import { Activity } from '@pivot/client/activity';
import { DeploymentFeaturesHttp } from '@pivot/client/deployment-features';
import { DeploymentVariablesHttp } from '@pivot/client/deployment-variables';
import { Deployment, DeploymentsHttp } from '@pivot/client/deployments';
import { EnvironmentsResource } from '@pivot/client/environments';
import { VariableOverridesHttp } from '@pivot/client/variable-overrides';
import { makeDraft } from '@pivot/util/model';

import { Api } from './slice';

export function service(
  pendingDeploymentState: Api,
  deploymentsHttp: DeploymentsHttp,
  deploymentVariablesHttp: DeploymentVariablesHttp,
  deploymentFeaturesHttp: DeploymentFeaturesHttp,
  variableOverridesHttp: VariableOverridesHttp,
  environmentsResource: EnvironmentsResource,
  activity: Activity,
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
    pendingDeploymentState.fetchVariableOverrides();

    const [features, deploymentVariables, variableOverrides] = await Promise.all([
      deploymentFeaturesHttp.get(deployment.uuid),
      deploymentVariablesHttp.get(deployment.uuid),
      variableOverridesHttp.get(deployment.uuid),
    ]);

    pendingDeploymentState.fetchFeaturesSuccess(features);
    pendingDeploymentState.fetchVariableOverridesSuccess(variableOverrides);
    pendingDeploymentState.setNewVariables(deploymentVariables);
  }

  async function deploy() {
    const { deployment, features = [], variableOverrides = [] } = pendingDeploymentState.getState();

    if (!deployment) {
      throw new Error('Cannot deploy without a deployment.');
    }

    pendingDeploymentState.clearDrafts();

    activity.addEntry({ content: deployment.url, title: 'Deploying...', type: 'info' });

    const created = await deploymentsHttp.post(deployment);

    if (features.length) {
      // toaster.toast({
      //   content: deployment.url,
      //   title: 'Adding features...',
      //   type: 'info',
      // });

      for (const feature of features) {
        deploymentFeaturesHttp.post({ deployment_id: created.uuid, ...feature });
      }
    }

    if (variableOverrides.length) {
      // toaster.toast({
      //   content: deployment.url,
      //   title: 'Adding variable overrides...',
      //   type: 'info',
      // });

      for (const variable of variableOverrides) {
        variableOverridesHttp.post({ deployment_id: created.uuid, ...variable });
      }
    }

    // toaster.toast({ content: deployment.url, title: 'Deployed!', type: 'info' });
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
