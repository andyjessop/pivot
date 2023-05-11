import { createSelector } from 'reselect';

import { displayVariables, State } from '@pivot/client/pending-deployment';

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

export const selectDisplayVariables = createSelector(
  selectPendingDeployment,
  selectPendingVariables,
  selectVariablesResourceData,
  selectEnvironmentsResourceData,
  (deployment, deploymentVariables, variables, environments) => {
    if (!deployment || !deploymentVariables || !variables || !environments) {
      return [];
    }

    return displayVariables(deployment, deploymentVariables, variables, environments);
  },
);
