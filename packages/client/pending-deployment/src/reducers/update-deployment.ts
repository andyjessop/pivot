import { Deployment, isDraftDeployment } from '@pivot/client/deployments';
import { Draft } from '@pivot/util/model';

import { State } from '../types';

export function updateDeployment(state: State, deployment: Partial<Draft<Deployment>>): State {
  const newDeployment = { ...state.deployment, ...deployment };

  if (!isDraftDeployment(newDeployment)) {
    return state;
  }

  return { ...state, deployment: newDeployment };
}
