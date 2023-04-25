import { createSelector } from 'reselect';

import { State } from '@pivot/client/pending-deployment';

export const selectPendingDeploymentState = (state: {
  pendingDeployment?: State;
}) => state.pendingDeployment;

export const selectPendingDeploymentData = createSelector(
  selectPendingDeploymentState,
  (state) => state?.data,
);
