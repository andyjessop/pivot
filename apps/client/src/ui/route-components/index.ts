import React from 'react';

const project = React.lazy(() => import('../project/Project'));

export const routeComponents = {
  '404': React.lazy(() => import('../NotFound')),
  project: project,
  deployments: project,
  environments: project,
  features: project,
  releases: project,
  variables: project,
};
