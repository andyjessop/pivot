import { DeploymentVariable } from '@pivot/client/deployments';
import { Environment, EnvironmentVariable } from '@pivot/client/environments';
import { Variable } from '@pivot/client/variables';

import { PendingDeployment } from '../types';

import { variablesList } from './variables-list';

const pendingDeployment = {
  environment_id: 'e1',
  variables: [{ variable_id: 'v1' }] as DeploymentVariable[],
} as PendingDeployment;

const environments = [
  {
    uuid: 'e1',
    variables: [{ variable_id: 'v2' } as EnvironmentVariable],
  } as Environment,
];

const variables = [
  { name: 'deployment-variable', uuid: 'v1' },
  { name: 'environment-variable', uuid: 'v2' },
] as Variable[];

describe('variablesList', () => {
  test('returns an empty array when pendingDeployment, environments, or variables are not loaded', () => {
    expect(variablesList(null, environments, variables)).toEqual([]);
    expect(variablesList(pendingDeployment, null, variables)).toEqual([]);
    expect(variablesList(pendingDeployment, environments, null)).toEqual([]);
  });

  test('throws error when environment not found', () => {
    expect(() =>
      variablesList(
        { ...pendingDeployment, environment_id: 'non-existent-uuid' },
        environments,
        variables,
      ),
    ).toThrow(
      'Environment with id non-existent-uuid not found in list of environments with ids e1',
    );
  });

  test('throws error when variable not found in list of variables', () => {
    const environmentWithMissingVariable = [
      {
        ...environments[0],
        variables: [{ variable_id: 'non-existent-variable' } as EnvironmentVariable],
      },
    ];
    expect(() =>
      variablesList(pendingDeployment, environmentWithMissingVariable, variables),
    ).toThrow(
      'Variable with id non-existent-variable not found in list of variables with ids v1, v2',
    );
  });

  test('returns the correct variables list', () => {
    expect(variablesList(pendingDeployment, environments, variables)).toEqual([
      {
        name: 'deployment-variable',
        variableType: 'deployment',
        variable_id: 'v1',
      },
      {
        name: 'environment-variable',
        variableType: 'environment',
        variable_id: 'v2',
      },
    ]);
  });
});
