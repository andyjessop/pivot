import {
  DeploymentVariables,
  NewVariables,
  PendingDeploymentModal,
  Variables,
} from '@pivot/client/pending-deployment';

import { useSelector, useService } from '~app';
import { selectEnvironmentsResourceData } from '~app/modules/environments';
import {
  selectDeploymentVariablesWithNames,
  selectDisplayVariables,
  selectIsFetchingVariables,
  selectNewVariables,
  selectPendingDeployment,
} from '~app/modules/pending-deployment';
import { selectReleasesResourceData } from '~app/modules/releases';

export function PendingDeployment() {
  const service = useService('pendingDeployment');

  const environments = useSelector(selectEnvironmentsResourceData);
  const deployment = useSelector(selectPendingDeployment);
  const deploymentVariables = useSelector(selectDeploymentVariablesWithNames);
  const newVariables = useSelector(selectNewVariables);
  const releases = useSelector(selectReleasesResourceData);
  const variables = useSelector(selectDisplayVariables);
  const isFetchingVariables = useSelector(selectIsFetchingVariables);

  if (
    !environments ||
    !deployment ||
    !deploymentVariables ||
    !newVariables ||
    !releases ||
    !service ||
    !variables
  ) {
    return null;
  }

  const {
    addNewVariable,
    clearDrafts,
    clearOverride,
    overrideVariable,
    removeVariable,
    removeNewVariable,
    setEnvironment,
    setUrl,
    updateNewVariableName,
    updateNewVariableValue,
    updateVariable,
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

  const DeploymentVariablesComponent = (
    <DeploymentVariables
      deploymentVariables={deploymentVariables}
      removeVariable={removeVariable}
      updateVariable={updateVariable}
    />
  );

  const VariablesComponent = (
    <Variables
      clearOverride={clearOverride}
      overrideVariable={overrideVariable}
      variables={variables}
    />
  );

  return (
    <PendingDeploymentModal
      DeploymentVariables={DeploymentVariablesComponent}
      NewVariables={NewVariablesComponent}
      Variables={VariablesComponent}
      addNewVariable={addNewVariable}
      clear={clearDrafts}
      deploy={deploy}
      deployment={deployment}
      environments={environments}
      isFetchingVariables={isFetchingVariables}
      releases={releases}
      setEnvironment={setEnvironment}
      setUrl={setUrl}
      // Features={FeaturesComponent}
    />
  );
}
