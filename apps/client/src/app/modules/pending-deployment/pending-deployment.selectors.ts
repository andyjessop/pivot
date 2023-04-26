import { createSelector } from 'reselect';

import {
  DeploymentFeatureWithName,
  DeploymentVariableWithName,
} from '@pivot/client/deployments';
import { State } from '@pivot/client/pending-deployment';

import { selectFeaturesResourceData } from '../features';
import { selectVariablesResourceData } from '../variables';

export const selectPendingDeploymentState = (state: {
  pendingDeployment?: State;
}) => state.pendingDeployment;

export const selectPendingDeploymentData = createSelector(
  selectPendingDeploymentState,
  (state) => state?.data,
);

export const selectPendingDeploymentFeatures = createSelector(
  selectPendingDeploymentData,
  selectFeaturesResourceData,
  (pendingDeployment, features) => {
    if (!pendingDeployment || !features) {
      return;
    }

    return pendingDeployment?.features
      .map((feature) => {
        const featureData = features?.find(
          (featureData) => featureData.uuid === feature.feature_id,
        );

        if (!featureData) {
          return null;
        }

        return {
          ...feature,
          name: featureData?.name,
        };
      })
      .filter((feature) => feature !== null) as DeploymentFeatureWithName[];
  },
);

export const selectPendingDeploymentVariables = createSelector(
  selectPendingDeploymentData,
  selectVariablesResourceData,
  (pendingDeployment, variables) => {
    if (!pendingDeployment || !variables) {
      return;
    }

    return pendingDeployment?.variables
      .map((variable) => {
        const variableData = variables?.find(
          (variableData) => variableData.uuid === variable.variable_id,
        );

        if (!variableData) {
          return null;
        }

        return {
          ...variable,
          name: variableData?.name,
        };
      })
      .filter((variable) => variable !== null) as DeploymentVariableWithName[];
  },
);
