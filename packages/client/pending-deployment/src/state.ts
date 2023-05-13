import { State } from './types';

export const initialState: State = {
  deployment: null,
  features: [],
  featuresStatus: 'idle',
  variables: [],
  variablesStatus: 'idle',
};
