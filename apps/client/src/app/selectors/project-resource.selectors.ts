import { createSelector } from 'reselect';

import { selectIsDeploymentsRoute } from '~app/modules/deployments';
import { selectIsEnvironmentsRoute } from '~app/modules/environments';
import { selectIsFeaturesRoute } from '~app/modules/features';
import { selectIsReleasesRoute } from '~app/modules/releases';
import { selectIsVariablesRoute } from '~app/modules/variables';

export const selectShouldLoadEnvironementsResource = createSelector(
  selectIsEnvironmentsRoute,
  selectIsDeploymentsRoute,
  (isEnvironmentsRoute, isDeploymentsRoute) =>
    isEnvironmentsRoute || isDeploymentsRoute,
);

export const selectShouldLoadFeaturesResource = createSelector(
  selectIsFeaturesRoute,
  selectIsDeploymentsRoute,
  (isFeaturesroute, isDeploymentsRoute) =>
    isFeaturesroute || isDeploymentsRoute,
);

export const selectShouldLoadReleasesResource = createSelector(
  selectIsReleasesRoute,
  selectIsDeploymentsRoute,
  (isReleasesRoute, isDeploymentsRoute) =>
    isReleasesRoute || isDeploymentsRoute,
);

export const selectShouldLoadVariablesResource = createSelector(
  selectIsVariablesRoute,
  selectIsDeploymentsRoute,
  (isVariablesRoute, isDeploymentsRoute) =>
    isVariablesRoute || isDeploymentsRoute,
);
