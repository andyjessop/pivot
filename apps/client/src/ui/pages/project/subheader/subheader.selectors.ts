import { createSelector } from 'reselect';

import { icon } from '@pivot/design/css';

import { selectProjectId } from '~app/modules/project/project.selectors';
import { selectRouteName } from '~app/modules/router';

export type SubheaderItem = {
  icon: string;
  isActive: boolean;
  text: string;
  routeName: string;
  routeParams: Record<string, string>;
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
        isActive: routeName === 'projectEnvironments',
        routeName: 'projectEnvironments',
        routeParams: { id: projectId },
        text: 'Environments',
      },
      {
        icon: icon.releases,
        isActive: routeName === 'projectReleases',
        routeName: 'projectReleases',
        routeParams: { id: projectId },
        text: 'Releases',
      },
      {
        icon: icon.deployments,
        isActive: routeName === 'projectDeployments',
        routeName: 'projectDeployments',
        routeParams: { id: projectId },
        text: 'Deployments',
      },
      {
        icon: icon.features,
        isActive: routeName === 'projectFeatures',
        routeName: 'projectFeatures',
        routeParams: { id: projectId },
        text: 'Features',
      },
      {
        icon: icon.variables,
        isActive: routeName === 'projectVariables',
        routeName: 'projectVariables',
        routeParams: { id: projectId },
        text: 'Variables',
      },
    ];
  },
);
