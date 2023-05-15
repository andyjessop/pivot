import {
  DraftDeploymentVariable,
  DraftDeploymentVariableWithName,
} from '@pivot/client/deployment-variables';
import { Variable } from '@pivot/client/variables';

export function deploymentVariablesWithNames(
  deploymentVariables: DraftDeploymentVariable[],
  variables: Variable[],
): DraftDeploymentVariableWithName[] {
  if (!deploymentVariables || !variables) {
    return [];
  }

  return deploymentVariables.map((variable) => {
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
    };
  });
}
