import { Environment } from '@pivot/client/environments';
import { Variable } from '@pivot/client/variables';

import { Model, VariablesList } from '../types';

export function variablesList(
  pendingDeployment: Model | null,
  environments: Environment[] | null,
  variables: Variable[] | null,
): VariablesList {
  if (!pendingDeployment || !environments || !variables) {
    return [];
  }

  const environment = environments.find((env) => env.uuid === pendingDeployment.environment_id);

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
      name: variableData.name,
      variableType: 'environment',
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
      name: variableData.name,
      variableType: 'deployment',
    };
  });

  return [...deploymentVariables, ...envVariables];
}
