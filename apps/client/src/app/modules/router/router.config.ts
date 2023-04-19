import { RouterConfig } from '@pivot/client/router';

export const config: RouterConfig = {
  notFound: {
    path: '/404',
  },
  project: { parent: 'projects', path: '/projects/:id' },
  projectDeployments: { parent: 'project', path: '/projects/:id/deployments' },
  projectEnvironments: {
    parent: 'project',
    path: '/projects/:id/environments',
  },
  projectFeatures: { parent: 'project', path: '/projects/:id/features' },
  projectReleases: { parent: 'project', path: '/projects/:id/releases' },
  projectVariables: { parent: 'project', path: '/projects/:id/variables' },
  projects: { path: '/projects' },
};

export type RouteName = keyof typeof config;
