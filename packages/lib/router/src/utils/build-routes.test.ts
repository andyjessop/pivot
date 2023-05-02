import { buildRoutes } from './build-routes';
import { Routes } from './types';

export const routes = {
  deployments: {
    path: '/projects/:id/deployments',
  },
  environments: {
    path: '/projects/:id/environments',
  },
  features: {
    path: '/projects/:id/features',
  },
  home: {
    path: '/',
  },
  notFound: {
    path: '/404',
  },
  project: {
    path: '/projects/:id',
  },
  projects: {
    path: '/projects',
  },
  releases: {
    path: '/projects/:id/releases',
  },
  variables: {
    path: '/projects/:id/variables',
  },
} as unknown as Routes;

describe('buildRoutes', () => {
  it('should convert routes to config', () => {
    const config = buildRoutes(routes);
    const expectedConfig = {
      deployments: { parent: 'project', path: '/projects/:id/deployments' },
      environments: { parent: 'project', path: '/projects/:id/environments' },
      features: { parent: 'project', path: '/projects/:id/features' },
      home: { path: '/' },
      notFound: { parent: 'home', path: '/404' },
      project: { parent: 'projects', path: '/projects/:id' },
      projects: { parent: 'home', path: '/projects' },
      releases: { parent: 'project', path: '/projects/:id/releases' },
      variables: { parent: 'project', path: '/projects/:id/variables' },
    };

    expect(config).toEqual(expectedConfig);
  });

  it('should handle empty routes', () => {
    const config = buildRoutes({});
    const expectedConfig = {};

    expect(config).toEqual(expectedConfig);
  });
});
