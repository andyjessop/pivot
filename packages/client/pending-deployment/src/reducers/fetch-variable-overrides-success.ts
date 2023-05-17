import { VariableOverride } from '@pivot/client/variable-overrides';
import { makeDraft } from '@pivot/util/model';

import { State } from '../types';

export function fetchVariableOverridesSuccess(state: State, variables: VariableOverride[]): State {
  return {
    ...state,
    variableOverrides: variables.map(makeDraft),
    variableOverridesStatus: 'idle',
  };
}
