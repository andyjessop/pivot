import React from 'react';

const project = React.lazy(() => import('../pages/project/Project'));

export const routeComponents = {
  '404': React.lazy(() => import('../pages/NotFound')),
  project: project,
  projectDeployments: project,
  projectEnvironments: project,
  projectFeatures: project,
  projectReleases: project,
  projectVariables: project,
};
