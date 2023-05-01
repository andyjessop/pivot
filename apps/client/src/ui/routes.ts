import React from 'react';

export const routes = {
  '/404': React.lazy(() => import('./NotFound')),
  '/project/:id': React.lazy(() => import('./project/Project')),
  '/project/:id/deployments': React.lazy(() => import('./project/sub-pages/Deployments')),
  '/project/:id/environments': React.lazy(() => import('./project/sub-pages/Environments')),
  '/project/:id/features': React.lazy(() => import('./project/sub-pages/Features')),
  '/project/:id/releases': React.lazy(() => import('./project/sub-pages/Releases')),
  '/project/:id/variables': React.lazy(() => import('./project/sub-pages/Variables')),
};
