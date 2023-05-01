import { createSelector } from 'reselect';

import { icon } from '@pivot/design/css';

import { selectProjectId } from '~app/modules/project/project.selectors';
import { selectRouteName } from '~app/modules/router';

export type SubheaderItem = {
  icon: string;
  isActive: boolean;
  routeName: string;
  routeParams: Record<string, string>;
  text: string;
};

export type SubheaderItems = SubheaderItem[];

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
