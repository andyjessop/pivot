import { Head } from 'packages/client/head/src/types';
import { createSelector } from 'reselect';

import { headService } from '../../modules/head';
import { selectRoute } from '../../modules/router';

import { config } from './config';

const selectHeadTitle = createSelector(
  (state: any) => state,
  selectRoute,
  (state, route) => {
    if (!route) {
      return;
    }

    const routeConfig = config[route.name];

    if (!routeConfig) {
      return;
    }

    return routeConfig.title(state);
  },
);

/**
 * Adds head metadata to the application when the route changes.
 */
export const headMetadata = {
  selector: selectHeadTitle,
  handler: (head: Head) => (title?: string) => {
    if (title) {
      head.setTitle(title);
    }
  },
  dependencies: [headService],
};
