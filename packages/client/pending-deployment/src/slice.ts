import { DeploymentFeature, DraftDeploymentFeature } from '@pivot/client/deployment-features';
import { DeploymentVariable } from '@pivot/client/deployment-variables';
import { Deployment, isDraftDeployment } from '@pivot/client/deployments';
import { DraftVariableOverride, VariableOverride } from '@pivot/client/variable-overrides';
import { ExtractApi } from '@pivot/lib/slice';
import { Draft, makeDraft } from '@pivot/util/model';

import { NewVariable } from './types';

export interface State {
  deployment: Draft<Deployment> | null;
  deploymentVariablesStatus: 'idle' | 'loading' | 'success' | 'error';
  features: DraftDeploymentFeature[];
  featuresStatus: 'idle' | 'loading' | 'success' | 'error';
  newVariables: NewVariable[];
  variableOverrides: DraftVariableOverride[];
  variableOverridesStatus: 'idle' | 'loading' | 'success' | 'error';
}

export const initialState: State = {
  deployment: null,
  deploymentVariablesStatus: 'idle',
  features: [],
  featuresStatus: 'idle',
  newVariables: [],
  variableOverrides: [],
  variableOverridesStatus: 'idle',
};

export const reducers = {
  addNewVariable,
  clearDrafts,
  clearOverride,
  fetchFeatures,
  fetchFeaturesSuccess,
  fetchVariableOverrides,
  fetchVariableOverridesSuccess,
  overrideVariable,
  removeNewVariable,
  setDeployment,
  setFeature,
  setNewVariables,
  updateDeployment,
  updateNewVariableName,
  updateNewVariableValue,
};

export type Api = ExtractApi<typeof reducers>;

function addNewVariable(state: State): State {
  return {
    ...state,
    newVariables: [
      {
        id: new Date().getTime().toString(),
        name: '',
        value: '',
      },
      ...state.newVariables,
    ],
  };
}

function clearDrafts(state: State): State {
  return { ...state, deployment: null, features: [], newVariables: [], variableOverrides: [] };
}

function clearOverride(state: State, variable_id: string): State {
  if (!state.deployment) {
    throw new Error('Cannot clear variable override without a deployment');
  }

  const existingVariableIndex = state.variableOverrides.findIndex(
    (variable) => variable.variable_id === variable_id,
  );

  if (existingVariableIndex !== -1) {
    const updatedVariables = [...state.variableOverrides];
    updatedVariables.splice(existingVariableIndex, 1);

    return {
      ...state,
      variableOverrides: updatedVariables,
    };
  }

  return state;
}

function fetchFeaturesSuccess(state: State, features: DeploymentFeature[]): State {
  return {
    ...state,
    features: features.map(makeDraft),
    featuresStatus: 'idle',
  };
}

function fetchFeatures(state: State): State {
  return {
    ...state,
    featuresStatus: 'loading',
  };
}

function fetchVariableOverrides(state: State): State {
  return {
    ...state,
    variableOverridesStatus: 'loading',
  };
}

function fetchVariableOverridesSuccess(state: State, variables: VariableOverride[]): State {
  return {
    ...state,
    variableOverrides: variables.map(makeDraft),
    variableOverridesStatus: 'idle',
  };
}

function overrideVariable(state: State, variable_id: string, value: string): State {
  if (!state.deployment) {
    throw new Error('Cannot override variable without a deployment');
  }

  const existingVariableIndex = state.variableOverrides.findIndex(
    (variable) => variable.variable_id === variable_id,
  );

  if (existingVariableIndex !== -1) {
    const updatedVariable: DraftVariableOverride = {
      ...state.variableOverrides[existingVariableIndex],
      value,
    };

    const updatedVariableOverrides = [...state.variableOverrides];
    updatedVariableOverrides[existingVariableIndex] = updatedVariable;

    return {
      ...state,
      variableOverrides: updatedVariableOverrides,
    };
  }

  const newVariable: DraftVariableOverride = {
    value,
    variable_id,
  };

  return {
    ...state,
    variableOverrides: [...state.variableOverrides, newVariable],
  };
}

function removeNewVariable(state: State, id: string): State {
  return {
    ...state,
    newVariables: state.newVariables.filter((variable) => variable.id !== id),
  };
}

function setDeployment(state: State, deployment: Draft<Deployment> | null) {
  return { ...state, deployment };
}

function setFeature(
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

function setNewVariables(state: State, deploymentVariables: DeploymentVariable[]): State {
  return {
    ...state,
    newVariables: [
      ...deploymentVariables.map((deploymentVariable) => ({
        id: deploymentVariable.uuid,
        name: deploymentVariable.name,
        value: deploymentVariable.value,
      })),
    ],
  };
}

function updateDeployment(state: State, deployment: Partial<Draft<Deployment>>): State {
  const newDeployment = { ...state.deployment, ...deployment };

  if (!isDraftDeployment(newDeployment)) {
    return state;
  }

  return { ...state, deployment: newDeployment };
}

function updateNewVariableName(state: State, id: string, name: string): State {
  const newVariables = state.newVariables.map((variable) => {
    if (variable.id === id) {
      return {
        ...variable,
        name,
      };
    }
    return variable;
  });

  return {
    ...state,
    newVariables,
  };
}

function updateNewVariableValue(state: State, id: string, value: string): State {
  const newVariables = state.newVariables.map((variable) => {
    if (variable.id === id) {
      return {
        ...variable,
        value,
      };
    }
    return variable;
  });

  return {
    ...state,
    newVariables,
  };
}
