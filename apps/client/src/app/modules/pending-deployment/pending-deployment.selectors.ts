import { createSelector } from 'reselect';

import { State, variablesList } from '@pivot/client/pending-deployment';

import { selectEnvironmentsResourceData } from '../environments';
import { selectVariablesResourceData } from '../variables';

export const selectPendingDeploymentState = (state: { pendingDeployment?: State }) =>
  state.pendingDeployment;

export const selectPendingDeployment = createSelector(
  selectPendingDeploymentState,
  (state) => state?.deployment,
);

export const selectVariablesList = createSelector(
  selectPendingDeployment,
  selectEnvironmentsResourceData,
  selectVariablesResourceData,
  (deployment, environments, variables) => {
    if (!deployment || !environments || !variables) {
      return;
    }

    return variablesList(deployment, environments, variables);
  },
);
