import { DeploymentFeature } from '@pivot/client/deployment-features';
import { Draft } from '@pivot/util/model';

import { State } from '../types';

export function setFeature(
  state: State,
  feature_id: string,
  deploymentFeature: Partial<Draft<DeploymentFeature>>,
) {
  const features = [...(state.features ?? [])];

  const ndx = features.findIndex((feature) => feature.feature_id === feature_id);

  if (ndx === -1) {
    return state;
  }

  return {
    ...state,
    features: [
      ...features.slice(0, ndx),
      {
        ...features[ndx],
        ...deploymentFeature,
      },
      ...features.slice(ndx + 1),
    ],
  };
}
