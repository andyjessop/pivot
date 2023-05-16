import { createSelector } from 'reselect';

import {
  deploymentVariablesWithNames,
  displayVariables,
  State,
} from '@pivot/client/pending-deployment';

import { selectEnvironmentsResourceData } from '../environments';
import { selectVariablesResourceData } from '../variables';

export const selectPendingDeploymentState = (state: { pendingDeployment?: State }) =>
  state.pendingDeployment;

export const selectPendingDeployment = createSelector(
  selectPendingDeploymentState,
  (state) => state?.deployment,
);

export const selectPendingFeatures = createSelector(
  selectPendingDeploymentState,
  (state) => state?.features,
);

export const selectPendingVariables = createSelector(
  selectPendingDeploymentState,
  (state) => state?.variables,
);

export const selectNewVariables = createSelector(
  selectPendingDeploymentState,
  (state) => state?.newVariables,
);

export const selectIsFetchingFeatures = createSelector(
  selectPendingDeploymentState,
  (state) => state?.featuresStatus === 'loading',
);

export const selectIsFetchingVariables = createSelector(
  selectPendingDeploymentState,
  (state) => state?.variablesStatus === 'loading',
);

export const selectDeploymentEnvironment = createSelector(
  selectPendingDeployment,
  selectEnvironmentsResourceData,
  (deployment, environments) => {
    if (!deployment || !environments) {
      return undefined;
    }

    return environments.find((e) => e.uuid === deployment.environment_id);
  },
);

const selectDeploymentVariables = createSelector(
  selectPendingVariables,
  selectDeploymentEnvironment,
  (deploymentVariables, environment) => {
    if (!deploymentVariables || !environment) {
      return [];
    }

    return deploymentVariables.filter(
      (v) => !environment.variables.some((env) => env.variable_id === v.variable_id),
    );
  },
);

export const selectDeploymentVariablesWithNames = createSelector(
  selectDeploymentVariables,
  selectVariablesResourceData,
  (deploymentVariables, variables) => {
    if (!deploymentVariables || !variables) {
      return [];
    }

    return deploymentVariablesWithNames(deploymentVariables, variables);
  },
);

export const selectDisplayVariables = createSelector(
  selectPendingDeployment,
  selectPendingVariables,
  selectVariablesResourceData,
  selectDeploymentEnvironment,
  (deployment, deploymentVariables, variables, environment) => {
    if (!deployment || !deploymentVariables || !variables || !environment) {
      return [];
    }

    return displayVariables(deployment, deploymentVariables, variables, environment);
  },
);
