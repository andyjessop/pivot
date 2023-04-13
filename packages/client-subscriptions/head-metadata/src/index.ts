import { Head } from 'packages/client/head/src/domain/types';

import { headService } from '@pivot/client/head';
import { Route, selectRoute } from '@pivot/client/router';

import { config } from './config';

/**
 * Adds head metadata to the application when the route changes.
 */
export const headMetadata = {
  selector: selectRoute,
  handler: (head: Head) => (route: Route) => {
    debugger; // eslint-disable-line

    const routeConfig = config[route.name];

    if (!routeConfig) {
      return;
    }

    head.setTitle(routeConfig.title(route));
  },
  dependencies: [headService],
};
