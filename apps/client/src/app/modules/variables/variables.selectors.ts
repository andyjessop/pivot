import { createSelector } from 'reselect';

import { projectId } from '@pivot/client/project';
import { isVariablesRoute } from '@pivot/client/variables';
import { humanReadableDate } from '@pivot/util/time';

import { selectRouteName, selectRouteParams } from '../router';

import { VariablesResourceState } from './variables-resource.service';

export const selectIsVariablesRoute = createSelector(
  selectRouteName,
  isVariablesRoute,
);

export const selectVariablesProjectId = createSelector(
  selectIsVariablesRoute,
  selectRouteParams,
  projectId,
);

export const selectVariablesResource = (state: unknown) =>
  (state as any).variablesResource as VariablesResourceState;

export const selectVariablesResourceData = createSelector(
  selectVariablesResource,
  (variablesResource) => variablesResource?.data,
);

export const selectVariablesData = createSelector(
  selectVariablesResourceData,
  (variables) =>
    variables?.map((variable) => ({
      ...variable,
      created_at: humanReadableDate(variable.created_at),
    })),
);
