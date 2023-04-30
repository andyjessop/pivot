import { createSelector } from 'reselect';

import { State, variablesList } from '@pivot/client/pending-deployment';

import { selectDeploymentsResourceData } from '../deployments';
import { selectEnvironmentsResourceData } from '../environments';
import { selectVariablesResourceData } from '../variables';

export const selectPendingDeploymentState = (state: {
  pendingDeployment?: State;
}) => state.pendingDeployment;

export const selectPendingDeploymentData = createSelector(
  selectPendingDeploymentState,
  (state) => state?.data,
);

export const selectVariablesList = createSelector(
  selectPendingDeploymentData,
  selectEnvironmentsResourceData,
  selectVariablesResourceData,
  (pendingDeployment, environments, variables) => {
    if (!pendingDeployment || !environments || !variables) {
      return;
    }

    return variablesList(pendingDeployment, environments, variables);
  },
);

export const selectDeployment = createSelector(
  selectPendingDeploymentData,
  selectDeploymentsResourceData,
  (pendingDeployment, deployments) => {
    if (!pendingDeployment || !deployments) {
      return;
    }

    return deployments.find(
      (deployment) => deployment.uuid === pendingDeployment.deployment_id,
    );
  },
);
