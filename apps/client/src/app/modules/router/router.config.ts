import { RouterConfig } from '@pivot/client/router';

export const config: RouterConfig = {
  notFound: {
    path: '/404',
  },
  home: { path: '/' },
  project: { parent: 'projects', path: '/projects/:id' },
  deployments: { parent: 'project', path: '/projects/:id/deployments' },
  environments: {
    parent: 'project',
    path: '/projects/:id/environments',
  },
  features: { parent: 'project', path: '/projects/:id/features' },
  releases: { parent: 'project', path: '/projects/:id/releases' },
  variables: { parent: 'project', path: '/projects/:id/variables' },
  projects: { parent: 'home', path: '/projects' },
};

export type RouteName = keyof typeof config;
