import { DeploymentVariable } from '@pivot/client/deployment-variables';
import { makeDraft } from '@pivot/util/model';

import { State } from '../types';

export function fetchVariablesSuccess(state: State, variables: DeploymentVariable[]): State {
  return {
    ...state,
    variables: variables.map(makeDraft),
    variablesStatus: 'idle',
  };
}
