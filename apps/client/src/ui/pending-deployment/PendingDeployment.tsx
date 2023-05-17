import {
  EnvironmentVariables,
  NewVariables,
  PendingDeploymentModal,
} from '@pivot/client/pending-deployment';

import { useSelector, useService } from '~app';
import { selectEnvironmentsResourceData } from '~app/modules/environments';
import {
  selectEnvironmentVariables,
  selectIsFetchingVariableOverrides,
  selectNewVariables,
  selectPendingDeployment,
} from '~app/modules/pending-deployment';
import { selectReleasesResourceData } from '~app/modules/releases';

export function PendingDeployment() {
  const service = useService('pendingDeployment');

  const environments = useSelector(selectEnvironmentsResourceData);
  const deployment = useSelector(selectPendingDeployment);
  const newVariables = useSelector(selectNewVariables);
  const releases = useSelector(selectReleasesResourceData);
  const environmentVariables = useSelector(selectEnvironmentVariables);
  const isFetchingVariableOverrides = useSelector(selectIsFetchingVariableOverrides);

  if (
    !environments ||
    !deployment ||
    !newVariables ||
    !releases ||
    !service ||
    !environmentVariables
  ) {
    return null;
  }

  const {
    addNewVariable,
    clearDrafts,
    clearOverride,
    overrideVariable,
    removeNewVariable,
    setEnvironment,
    setUrl,
    updateNewVariableName,
    updateNewVariableValue,
  } = service;

  // const FeaturesComponent = (
  //   <Features features={features} updateFeature={updateFeature} />
  // );

  const deploy = () => {
    if (!deployment) {
      throw new Error('No pending deployment');
    }

    service.deploy();
  };

  const NewVariablesComponent = (
    <NewVariables
      newVariables={newVariables}
      removeNewVariable={removeNewVariable}
      updateNewVariableName={updateNewVariableName}
      updateNewVariableValue={updateNewVariableValue}
    />
  );

  const VariablesComponent = (
    <EnvironmentVariables
      clearOverride={clearOverride}
      overrideVariable={overrideVariable}
      variables={environmentVariables}
    />
  );

  return (
    <PendingDeploymentModal
      NewVariables={NewVariablesComponent}
      Variables={VariablesComponent}
      addNewVariable={addNewVariable}
      clear={clearDrafts}
      deploy={deploy}
      deployment={deployment}
      environments={environments}
      isFetchingVariables={isFetchingVariableOverrides}
      releases={releases}
      setEnvironment={setEnvironment}
      setUrl={setUrl}
      // Features={FeaturesComponent}
    />
  );
}
