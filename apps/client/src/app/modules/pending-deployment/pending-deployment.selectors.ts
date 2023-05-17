import { createSelector } from 'reselect';

import { environmentVariables, State } from '@pivot/client/pending-deployment';

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

export const selectVariableOverrides = createSelector(
  selectPendingDeploymentState,
  (state) => state?.variableOverrides,
);

export const selectNewVariables = createSelector(
  selectPendingDeploymentState,
  (state) => state?.newVariables,
);

export const selectIsFetchingFeatures = createSelector(
  selectPendingDeploymentState,
  (state) => state?.featuresStatus === 'loading',
);

export const selectIsFetchingVariableOverrides = createSelector(
  selectPendingDeploymentState,
  (state) => state?.variableOverridesStatus === 'loading',
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

export const selectEnvironmentVariables = createSelector(
  selectPendingDeployment,
  selectVariableOverrides,
  selectVariablesResourceData,
  selectDeploymentEnvironment,
  (deployment, variableOverrides, variables, environment) => {
    if (!deployment || !variableOverrides || !variables || !environment) {
      return [];
    }

    return environmentVariables(deployment, variableOverrides, variables, environment);
  },
);
