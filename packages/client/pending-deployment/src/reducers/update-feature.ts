import { DeploymentFeature } from '@pivot/client/deployments';

import { State } from '../types';

export function updateFeature(
  state: State,
  uuid: string,
  deploymentFeature: Partial<DeploymentFeature>,
) {
  if (!state.data) {
    return state;
  }

  const ndx = state.data.features.findIndex((feature) => feature.uuid === uuid);

  if (ndx === -1) {
    return state;
  }

  return {
    ...state,
    data: {
      ...state.data,
      features: [
        ...state.data.features.slice(0, ndx),
        {
          ...state.data.features[ndx],
          ...deploymentFeature,
        },
        ...state.data.features.slice(ndx + 1),
      ],
    },
  };
}
