import { Deployment } from '@pivot/client/deployments';
import { Environment } from '@pivot/client/environments';
import { DraftVariableOverride } from '@pivot/client/variable-overrides';
import { Variable } from '@pivot/client/variables';
import { Draft } from '@pivot/util/model';

import { DisplayVariable } from '../types';

export function environmentVariables(
  deployment: Draft<Deployment>,
  variableOverrides: DraftVariableOverride[],
  variables: Variable[],
  environment: Environment,
): DisplayVariable[] {
  if (!deployment || !variableOverrides || !variables || !environment) {
    return [];
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

    const overriddenValue = variableOverrides.find(
      (variableOverrides) => variableOverrides.variable_id === variable.variable_id,
    )?.value;

    return {
      ...variable,
      environment: { color: environment.color, name: environment.name, uuid: environment.uuid },
      name: variableData.name,
      overridden: Boolean(overriddenValue),
      value: overriddenValue || variable.value,
    };
  });

  return [...envVariables];
}
