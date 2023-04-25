import React from 'react';

const project = React.lazy(() => import('../pages/project/Project'));

export const routeComponents = {
  '404': React.lazy(() => import('../pages/NotFound')),
  project: project,
  deployments: project,
  environments: project,
  features: project,
  releases: project,
  variables: project,
};
