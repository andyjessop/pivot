import { DeploymentVariable } from '@pivot/client/deployment-variables';
import { Deployment } from '@pivot/client/deployments';
import { Environment } from '@pivot/client/environments';
import { Variable } from '@pivot/client/variables';
import { Draft } from '@pivot/util/model';

import { displayVariables } from './display-variables';

describe('displayVariables', () => {
  const deployment = {
    environment_id: 'env-1',
  } as Draft<Deployment>;

  const deploymentVariables = [
    {
      uuid: 'var-1',
      variable_id: 'var-1',
    },
  ] as DeploymentVariable[];

  const variables = [
    {
      name: 'Variable 1',
      uuid: 'var-1',
    },
    {
      name: 'Variable 2',
      uuid: 'var-2',
    },
  ] as Variable[];

  const environment = {
    uuid: 'env-1',
    variables: [
      {
        variable_id: 'var-1',
      },
    ],
  } as Environment;

  it('returns an empty array if any of the arguments are falsy', () => {
    // @ts-expect-error Testing invalid arguments
    expect(displayVariables(null)).toEqual([]);
    // @ts-expect-error Testing invalid arguments
    expect(displayVariables(undefined)).toEqual([]);
    // @ts-expect-error Testing invalid arguments
    expect(displayVariables(deployment, null)).toEqual([]);
    // @ts-expect-error Testing invalid arguments
    expect(displayVariables(deployment, undefined)).toEqual([]);
    // @ts-expect-error Testing invalid arguments
    expect(displayVariables(deployment, deploymentVariables, null)).toEqual([]);
    // @ts-expect-error Testing invalid arguments
    expect(displayVariables(deployment, deploymentVariables, undefined)).toEqual([]);
    // @ts-expect-error Testing invalid arguments
    expect(displayVariables(deployment, deploymentVariables, variables, null)).toEqual([]);
    // @ts-expect-error Testing invalid arguments
    expect(displayVariables(deployment, deploymentVariables, variables, undefined)).toEqual([]);
  });

  it('throws an error if a variable with the given id is not found', () => {
    const invalidVariables = [
      {
        name: 'Variable 3',
        uuid: 'var-3',
      },
    ];

    expect(() =>
      // @ts-expect-error Testing invalid arguments
      displayVariables(deployment, deploymentVariables, invalidVariables, environment),
    ).toThrowError(/Variable with id var-1 not found/);
  });

  it('returns an array of display variables', () => {
    const expected = [
      {
        environment: {
          color: undefined,
          name: undefined,
          uuid: 'env-1',
        },
        name: 'Variable 1',
        overridden: false,
        value: undefined,
        variable_id: 'var-1',
      },
    ];
    expect(displayVariables(deployment, deploymentVariables, variables, environment)).toEqual(
      expected,
    );
  });
});
