import { createSelector } from 'reselect';

import { isFeaturesRoute } from '@pivot/client/features';
import { projectId } from '@pivot/client/project';
import { humanReadableDate } from '@pivot/util/time';

import { selectRouteName, selectRouteParams } from '../router';

import { FeaturesResourceState } from './features-resource.service';

export const selectIsFeaturesRoute = createSelector(
  selectRouteName,
  isFeaturesRoute,
);

export const selectFeaturesProjectId = createSelector(
  selectIsFeaturesRoute,
  selectRouteParams,
  projectId,
);

export const selectFeaturesResource = (state: unknown) =>
  (state as any).featuresResource as FeaturesResourceState;

export const selectFeaturesResourceData = createSelector(
  selectFeaturesResource,
  (featuresResource) => featuresResource?.data,
);

export const selectFeaturesData = createSelector(
  selectFeaturesResourceData,
  (features) =>
    features?.map((feature) => ({
      ...feature,
      created_at: humanReadableDate(feature.created_at),
    })),
);
