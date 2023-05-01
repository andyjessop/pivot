import React from 'react';

import { buildRoutes } from '@pivot/client/router';

export const routes = buildRoutes({
  deployments: {
    component: React.lazy(() => import('./ui/deployments/Deployments')),
    path: '/projects/:id/deployments',
  },
  environments: {
    component: React.lazy(() => import('./ui/environments/Environments')),
    path: '/projects/:id/environments',
  },
  features: {
    component: React.lazy(() => import('./ui/features/Features')),
    path: '/projects/:id/features',
  },
  notFound: {
    component: React.lazy(() => import('./ui/not-found/NotFound')),
    path: '/404',
  },
  project: {
    component: React.lazy(() => import('./ui/project/Project')),
    parent: 'root',
    path: '/projects/:id',
  },
  projects: {
    component: React.lazy(() => import('./ui/project/Project')),
    path: '/projects',
  },
  releases: {
    component: React.lazy(() => import('./ui/releases/Releases')),
    path: '/projects/:id/releases',
  },
  root: {
    component: React.lazy(() => import('./ui/root/Root')),
    path: '/',
  },
  variables: {
    component: React.lazy(() => import('./ui/variables/Variables')),
    path: '/projects/:id/variables',
  },
});
