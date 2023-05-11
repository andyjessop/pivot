import { Deployment } from '@pivot/client/deployments';
import { Draft } from '@pivot/util/model';

import { State } from '../types';

export function setDeployment(state: State, deployment: Draft<Deployment> | null) {
  return { ...state, deployment };
}
