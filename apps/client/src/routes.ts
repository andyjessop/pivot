import React from 'react';

export const routes = {
  '404': React.lazy(() => import('./pages/NotFound')),
  project: React.lazy(() => import('./pages/project/Project')),
};
