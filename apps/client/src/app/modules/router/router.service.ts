import { service } from '@pivot/client/router';
import { injectable } from '@pivot/lib/injectable';

import { routerSlice } from './router.slice';

const config = {
  notFound: '/404',
  project: '/projects/:id',
  projectDeployments: '/projects/:id/deployments',
  projectEnvironments: '/projects/:id/environments',
  projectFeatures: '/projects/:id/features',
  projectReleases: '/projects/:id/releases',
  projectVariables: '/projects/:id/variables',
  projects: '/projects',
};

export type RouteName = keyof typeof config;

export const routerService = injectable({
  importFn: (sliceObj) => Promise.resolve(service(config, sliceObj.api)),
  dependencies: [routerSlice],
  onDestroy: (service) => service.destroy(),
});
