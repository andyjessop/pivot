import React from 'react';

export const routeComponents = {
  '404': React.lazy(() => import('../pages/NotFound')),
  project: React.lazy(() => import('../pages/project/Project')),
};
