import { State } from './types';

export const initialState: State = {
  deployment: null,
  deploymentVariablesStatus: 'idle',
  features: [],
  featuresStatus: 'idle',
  newVariables: [],
  variableOverrides: [],
  variableOverridesStatus: 'idle',
};
