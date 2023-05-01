import { Deployment } from '@pivot/client/deployments';
import { Environment } from '@pivot/client/environments';

import { getPendingDeployment } from './service';

const deployment1: Deployment = {
  created_at: '2023-04-29T10:00:00Z',
  uuid: 'd1',
  release_id: 'r1',
  environment_id: 'e1',
  url: 'https://deployment1.example.com',
  project_id: 'p1',
  features: [],
  variables: [],
};

const deployment2: Deployment = {
  created_at: '2023-04-29T11:00:00Z',
  uuid: 'd2',
  release_id: 'r2',
  environment_id: 'e2',
  url: '',
  project_id: 'p1',
  features: [],
  variables: [],
};

const environment1: Environment = {
  uuid: 'e1',
  created_at: '2023-04-29T08:00:00Z',
  name: 'env1',
  project_id: 'p1',
  url: 'https://env1.example.com',
  clone_of: null,
  features: [],
  variables: [],
};

const environment2: Environment = {
  uuid: 'e2',
  created_at: '2023-04-29T09:00:00Z',
  name: 'env2',
  project_id: 'p1',
  url: null,
  clone_of: null,
  features: [],
  variables: [],
};

const deployments = [deployment1, deployment2];
const environments = [environment1, environment2];

describe('getPendingDeployment', () => {
  test('throws error when deployments or environments are not loaded', () => {
    expect(() => getPendingDeployment('d1', null, environments)).toThrow(
      'Deployments or environments not loaded',
    );
    expect(() => getPendingDeployment('d1', deployments, null)).toThrow(
      'Deployments or environments not loaded',
    );
  });

  test('throws error when deployment not found', () => {
    expect(() => getPendingDeployment('non-existent-uuid', deployments, environments)).toThrow(
      'Deployment non-existent-uuid not found',
    );
  });

  test('throws error when deployment and environment do not have URLs', () => {
    expect(() => getPendingDeployment('d2', deployments, environments)).toThrow(
      'Deployment d2 does not have a URL and its environment does not have a URL',
    );
  });

  test('returns pending deployment with environment URL', () => {
    const result = getPendingDeployment('d1', deployments, environments);

    expect(result).toEqual({
      deployment_id: 'd1',
      environment_id: 'e1',
      features: [],
      release_id: 'r1',
      variables: [],
    });
  });

  test('returns pending deployment without URL so that it is overwritten by the env', () => {
    const environment2WithUrl: Environment = {
      ...environment2,
      url: 'https://env2.example.com',
    };

    const result = getPendingDeployment('d2', deployments, [environment1, environment2WithUrl]);

    expect(result).toEqual({
      deployment_id: 'd2',
      environment_id: 'e2',
      features: [],
      release_id: 'r2',
      variables: [],
    });
  });
});
