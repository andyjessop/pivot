import { createSelector } from 'reselect';

import {
  DeploymentFeatureWithName,
  DeploymentVariableWithName,
} from '@pivot/client/deployments';
import { State, VariablesList } from '@pivot/client/pending-deployment';

import { selectDeploymentsResourceData } from '../deployments';
import { selectEnvironmentsResourceData } from '../environments';
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

export const selectVariablesList = createSelector(
  selectPendingDeploymentData,
  selectEnvironmentsResourceData,
  selectVariablesResourceData,
  (pendingDeployment, environments, variables): VariablesList => {
    if (!pendingDeployment || !environments || !variables) {
      return [];
    }

    const environment = environments.find(
      (env) => env.uuid === pendingDeployment.environment_id,
    );

    if (!environment) {
      throw new Error(
        `Environment with id ${
          pendingDeployment.environment_id
        } not found in list of environments with ids ${environments
          .map((env) => env.uuid)
          .join(', ')}`,
      );
    }

    const envVariables = environment.variables.map((variable) => {
      const variableData = variables.find(
        (variableData) => variableData.uuid === variable.variable_id,
      );

      if (!variableData) {
        throw new Error(
          `Variable with id ${
            variable.variable_id
          } not found in list of variables with ids ${variables
            .map((variable) => variable.uuid)
            .join(', ')}`,
        );
      }

      return {
        ...variable,
        variableType: 'environment',
        name: variableData.name,
      };
    });

    const deploymentVariables = pendingDeployment.variables.map((variable) => {
      const variableData = variables.find(
        (variableData) => variableData.uuid === variable.variable_id,
      );

      if (!variableData) {
        throw new Error(
          `Variable with id ${
            variable.variable_id
          } not found in list of variables with ids ${variables
            .map((variable) => variable.uuid)
            .join(', ')}`,
        );
      }

      return {
        ...variable,
        variableType: 'deployment',
        name: variableData.name,
      };
    });

    return [...deploymentVariables, ...envVariables];
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
