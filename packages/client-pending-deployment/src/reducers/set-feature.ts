import { State } from '../types';

export function setFeature(state: State, featureId: string, value: number) {
  const featureNdx = state.features.findIndex(
    (f) => f.feature_id === featureId,
  );

  if (featureNdx === -1) {
    return {
      ...state,
      features: [...state.features, { feature_id: featureId, value }],
    };
  }

  return {
    ...state,
    features: [
      ...state.features.slice(0, featureNdx),
      { feature_id: featureId, value },
      ...state.features.slice(featureNdx + 1),
    ],
  };
}
