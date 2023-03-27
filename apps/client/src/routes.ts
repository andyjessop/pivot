import React from 'react';

export const routes = {
  projects: React.lazy(() => import('./pages/Projects')),
};
