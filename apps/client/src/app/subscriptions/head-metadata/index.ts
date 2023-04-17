import { Head } from 'packages/client/head/src/types';

import { Route } from '@pivot/client/router';

import { headService } from '../../modules/head';
import { selectRoute } from '../../modules/router';

import { config } from './config';

/**
 * Adds head metadata to the application when the route changes.
 */
export const headMetadata = {
  selector: selectRoute,
  handler: (head: Head) => (route: Route | null) => {
    if (!route) {
      return;
    }

    const routeConfig = config[route.name];

    if (!routeConfig) {
      return;
    }

    head.setTitle(routeConfig.title(route));
  },
  dependencies: [headService],
};
