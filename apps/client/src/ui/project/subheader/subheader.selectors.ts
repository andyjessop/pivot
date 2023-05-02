import { createSelector } from 'reselect';

import { RouterConfig } from '@pivot/lib/router';
import { icon } from '@pivot/design/css';

import { selectProjectId } from '~app/modules/project/project.selectors';
import { selectRouteName } from '~app/modules/router';
import { Routes } from '~app/modules/router/router.types';

export type SubheaderItem<T extends RouterConfig> = {
  icon: string;
  isActive: boolean;
  routeName: keyof T;
  routeParams: Record<string, string>;
  text: string;
};

export type SubheaderItems = SubheaderItem<Routes>[];

export const selectSubheaderItems = createSelector(
  selectRouteName,
  selectProjectId,
  (routeName, projectId): SubheaderItems => {
    if (!projectId) {
      return [];
    }

    return [
      {
        icon: icon.environments,
        isActive: routeName === 'environments',
        routeName: 'environments',
        routeParams: { id: projectId },
        text: 'Environments',
      },
      {
        icon: icon.releases,
        isActive: routeName === 'releases',
        routeName: 'releases',
        routeParams: { id: projectId },
        text: 'Releases',
      },
      {
        icon: icon.deployments,
        isActive: routeName === 'deployments',
        routeName: 'deployments',
        routeParams: { id: projectId },
        text: 'Deployments',
      },
      {
        icon: icon.features,
        isActive: routeName === 'features',
        routeName: 'features',
        routeParams: { id: projectId },
        text: 'Features',
      },
      {
        icon: icon.variables,
        isActive: routeName === 'variables',
        routeName: 'variables',
        routeParams: { id: projectId },
        text: 'Variables',
      },
    ];
  },
);
