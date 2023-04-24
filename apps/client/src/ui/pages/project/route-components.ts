import React from 'react';

export const routeComponents = {
  projectDeployments: React.lazy(
    () => import('./handlers/deployments/Deployments'),
  ),
  projectEnvironments: React.lazy(() => import('./handlers/Environments')),
  projectFeatures: React.lazy(() => import('./handlers/Features')),
  projectReleases: React.lazy(() => import('./handlers/Releases')),
  projectVariables: React.lazy(() => import('./handlers/Variables')),
};
