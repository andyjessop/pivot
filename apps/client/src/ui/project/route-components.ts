import React from 'react';

export const routeComponents = {
  deployments: React.lazy(() => import('./sub-pages/Deployments')),
  environments: React.lazy(() => import('./sub-pages/Environments')),
  features: React.lazy(() => import('./sub-pages/Features')),
  releases: React.lazy(() => import('./sub-pages/Releases')),
  variables: React.lazy(() => import('./sub-pages/Variables')),
};
