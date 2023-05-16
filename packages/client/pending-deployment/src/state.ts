import { State } from './types';

export const initialState: State = {
  deployment: null,
  features: [],
  featuresStatus: 'idle',
  newVariables: [],
  variables: [],
  variablesStatus: 'idle',
};
