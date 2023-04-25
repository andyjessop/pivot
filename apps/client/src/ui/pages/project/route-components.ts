import React from 'react';

export const routeComponents = {
  deployments: React.lazy(() => import('./handlers/Deployments')),
  environments: React.lazy(() => import('./handlers/Environments')),
  features: React.lazy(() => import('./handlers/Features')),
  releases: React.lazy(() => import('./handlers/Releases')),
  variables: React.lazy(() => import('./handlers/Variables')),
};
