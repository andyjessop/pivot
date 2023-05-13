import { DeploymentFeature } from '@pivot/client/deployment-features';
import { makeDraft } from '@pivot/util/model';

import { State } from '../types';

export function fetchFeaturesSuccess(state: State, features: DeploymentFeature[]): State {
  return {
    ...state,
    features: features.map(makeDraft),
    featuresStatus: 'idle',
  };
}
